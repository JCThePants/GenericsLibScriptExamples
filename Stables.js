try {
    // Java 8 compatibility
    load("nashorn:mozilla_compat.js");
}
catch (e) {
    // Java 7, ignore
}

depends.on("ArborianQuests, AnimalBank", function() {

    include.api("ArborianQuests", "quests", "quests");
    include.api("AnimalBank", "animalBank", "animalBank");

    var npcRegistry = npcProvider.createRegistry("animalBank");

    /*
     * Libs
     */
    include.script("globalUtils.js");
    include.script("status_tracker.js");
    include.script("questlib.js");
    include.script("dialog.js");
    include.script("animalNames.js");

    // Constants
    include.script("quests/global/constants.js");

    var locations = [
        {
            MANAGER: quests.locations.get("Stable_Spawn1_Manager"),
            ANIMALS: [
                quests.locations.get("Stable_Spawn1_Animal1"),
                quests.locations.get("Stable_Spawn1_Animal2"),
                quests.locations.get("Stable_Spawn1_Animal3"),
                quests.locations.get("Stable_Spawn1_Animal4")
            ]
        },
        {
            MANAGER: quests.locations.get("Stable_Spawn2_Manager"),
            ANIMALS: [
                quests.locations.get("Stable_Spawn2_Animal1"),
                quests.locations.get("Stable_Spawn2_Animal2"),
                quests.locations.get("Stable_Spawn2_Animal3"),
                quests.locations.get("Stable_Spawn2_Animal4")
            ]
        },
        {
            MANAGER: quests.locations.get("Stable_Spawn3_Manager"),
            ANIMALS: [
                quests.locations.get("Stable_Spawn3_Animal1"),
                quests.locations.get("Stable_Spawn3_Animal2"),
                quests.locations.get("Stable_Spawn3_Animal3"),
                quests.locations.get("Stable_Spawn3_Animal4")
            ]
        },
        {
            MANAGER: quests.locations.get("Stable_Spawn4_Manager"),
            ANIMALS: [
                quests.locations.get("Stable_Spawn4_Animal1"),
                quests.locations.get("Stable_Spawn4_Animal2"),
                quests.locations.get("Stable_Spawn4_Animal3")
            ]
        },
        {
            MANAGER: quests.locations.get("Stable_Spawn5_Manager"),
            ANIMALS: [
                quests.locations.get("Stable_Spawn5_Animal1"),
                quests.locations.get("Stable_Spawn5_Animal2"),
                quests.locations.get("Stable_Spawn5_Animal3"),
                quests.locations.get("Stable_Spawn5_Animal4"),
                quests.locations.get("Stable_Spawn5_Animal5"),
                quests.locations.get("Stable_Spawn5_Animal6")
            ]
        },
        {
            MANAGER: quests.locations.get("Stable_World1_Manager"),
            ANIMALS: [
                quests.locations.get("Stable_World1_Animal1"),
                quests.locations.get("Stable_World1_Animal2"),
                quests.locations.get("Stable_World1_Animal3"),
                quests.locations.get("Stable_World1_Animal4")
            ]
        }
    ];

    var bank = animalBank.getBank("stables");
    var run = function () {

        for (var i=0; i < locations.length; i++) {
            var stable = locations[i];

            createNPCInterface(stable.MANAGER);
            for (var j=0; j < stable.ANIMALS.length; j++) {
                var location = stable.ANIMALS[j];

                var name = arrayPick(animalNames);

                var npc = npcRegistry.create(name, "HORSE")
                    .spawn(location);

                npc.getTraits().add("NpcTraitPack:Looking")
                    .lookClose();

                npc.getTraits().get("NpcTraitPack:LivingEntity")
                    .setColor('.random')
                    .setStyle('.random')
                    .setVariant('.oneOf: Horse, Donkey, Mule')
            }
        }
    };

    /*
     * Create an NPC at the specified location that can be
     * clicked on to open the account menu.
     */
    function createNPCInterface(location) {
        var npc = npcRegistry
            .create("Stable Manager", "VILLAGER")
            .spawn(location)
            .onNpcRightClick(function (event) {
                var player = event.getPlayer();
                showMenu(player);
            });

        npc.getTraits().add("NpcTraitPack:Looking")
            .lookClose();

        npc.getTraits().get("NpcTraitPack:LivingEntity")
            .setProfession('.random');
    }

    /*
     * Show stable manager menu to a player
     */
    function showMenu(player) {

        var account = bank.getAccount(player);
        var menu = menus.createMenu(player, "Stable");
        var animals = getStorableAnimals(player);
        var index = -1;

        // add "deposit animal" menu item
        if (animals.length > 0) {

            index+=1;

            var depositItem = menus.menuItemBuilder("Lead")
                .description("Click to store your animal at the stable.")
                .onClick(function () {
                    showDepositView(menu, player, account);
                });

            if (animals.length == 1) {
                depositItem
                    .title("{YELLOW}Store " + animals[0].getName())
            }
            else {
                depositItem
                    .title("{YELLOW}Store Animal")
            }

            menu.putItem(index, depositItem);
        }

        // add "withdraw animal" menu item
        if (account.size() > 0) {

            index+=1;

            var withdrawItem = menus.menuItemBuilder("Saddle")
                .description("Click to retrieve your stabled animal.")
                .onClick(function () {
                    showWithdrawView(menu, player, account);
                });

            if (account.size() == 1) {

                var iterator = account.iterator();
                iterator.hasNext();
                var animal = iterator.next();

                withdrawItem
                    .title("{YELLOW}Retrieve " + animal.getName());
            }
            else {
                withdrawItem
                    .title("{YELLOW}Retrieve Animal")
            }

            menu.putItem(index, withdrawItem);
        }

        // check if no menu items were added
        if (index == -1) {

            // tell player about NPC if no menu items were added.
            talkSession(player, function (talk) {

                talk
                    .npc(3, "Stable Manager", "I can take care of your animals for you.")
                    .npc(4, "Stable Manager", "If you have an animal on a leash or mounted...")
                    .npc(3, "Stable Manager", "...you can store it with me.");
            });
        }
        else {
            // open menu
            menu.open();
        }
    }

    /*
     * Show the deposit menu view.
     *
     * If the player has only one storable animal, the animal is deposited and
     * the view is not shown.
     */
    function showDepositView(menu, player, account) {

        var animals = getStorableAnimals(player);

        if (animals.length == 1) {
            createDepositClick(menu, player, account, animals[0])();
            menu.getViewSession().dispose();
            return;
        }

        var view = menus.createMenu(player, "Storable animals");

        for (var i=0; i < animals.length; i++) {

            var animal = animals[i];

            var item = menus.menuItemBuilder("Egg")
                .title(animal.getName())
                .onClick(createDepositClick(menu, player, account, animal));

            view.putItem(i, item);
        }

        view.open();
    }

    /*
     * Show the withdraw animal view.
     *
     * If there is only 1 animal in the animal account, the animal is withdrawn
     * and the view is not shown.
     */
    function showWithdrawView(menu, player, account) {

        var iterator = account.iterator();
        var index = 0;
        var animal;

        if (account.size() == 1) {

            iterator.hasNext();
            animal = iterator.next();

            createWithdrawClick(menu, account, animal, player)();
            return;
        }

        var view = menus.createMenu(player, "Stored Animals");

        while (iterator.hasNext()) {
            animal = iterator.next();

            var item = menus.menuItemBuilder("Egg")
                .title(animal.getName())
                .onClick(createWithdrawClick(menu, account, animal, player));

            view.putItem(index, item);

            index++;
        }

        view.open();
    }

    /*
     * Create a function to handle a menu item click in the deposit view.
     */
    function createDepositClick(menu, player, account, animal) {
        return function () {
            account.deposit(animal);
            menu.getViewSession().dispose();

            talkSession(player, function (talk) {
                talk.npc(3, "Stable Manager", "Your animal will be well cared for.");
            });
        };
    }

    /**
     * Create a function to handle a menu item click in the withdraw view.
     */
    function createWithdrawClick(menu, account, animal, player) {
        return function () {
            account.withdraw(animal, player.getLocation());
            menu.getViewSession().dispose();
        }
    }

    /*
     * Get all animals associated with the player at the current moment.
     *
     * Animal association is determined by leash and/or the players current mount.
     */
    function getStorableAnimals(player) {
        var leashed = com.jcwhatever.nucleus.utils.LeashUtils.getLeashed(player);
        var results = [];
        var iterator = leashed.iterator();

        var vehicle = player.getVehicle();
        if (isAnimal(vehicle)) {
            results.push(vehicle);
        }

        while (iterator.hasNext()) {
            var entity = iterator.next();

            if (isAnimal(entity)) {
                results.push(entity);
            }
        }

        return results;
    }

    /*
     * Determine if an entity is an animal.
     */
    function isAnimal(entity) {
        return entity instanceof org.bukkit.entity.Animals;
    }

    // run the script
    run();
});