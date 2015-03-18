try {
    // Java 8 compatibility
    load("nashorn:mozilla_compat.js");
}
catch (e) {
    // Java 7, ignore
}

importPackage(Packages.com.jcwhatever.nucleus.utils);
importPackage(Packages.com.jcwhatever.nucleus.utils.entity);
importPackage(Packages.java.util);

depends.on("ArborianQuests", function() {

    include.api("ArborianQuests", "quests", "quests");

    var npcRegistry = npcProvider.createRegistry("wanderers");
    /*
     * Libs
     */
    include.script("globalUtils.js");
    include.script("status_tracker.js");
    include.script("questlib.js");
    include.script("peopleNames.js");

    // Constants
    include.script("quests/global/constants.js");

    var wanderers = [
        {
            waypoints : quests.waypoints.get("Spawn_Wander1")
        },
        {
            waypoints : (function () {
                var w = quests.waypoints.get("Spawn_Wander1");
                w = new java.util.ArrayList(w);
                Collections.reverse(w);
                return w;
            }())
        },
        {
            waypoints : quests.waypoints.get("Spawn_Wander2")
        },
        {
            waypoints : (function () {
                var w = quests.waypoints.get("Spawn_Wander2");
                w = new java.util.ArrayList(w);
                Collections.reverse(w);
                return w;
            }())
        },
        {
            waypoints : quests.waypoints.get("Spawn_Wander3")
        },
        {
            waypoints : (function () {
                var w = quests.waypoints.get("Spawn_Wander3");
                w = new java.util.ArrayList(w);
                Collections.reverse(w);
                return w;
            }())
        },
        {
            waypoints : quests.waypoints.get("Spawn_Wander4")
        },
        {
            waypoints : (function () {
                var w = quests.waypoints.get("Spawn_Wander4");
                w = new java.util.ArrayList(w);
                Collections.reverse(w);
                return w;
            }())
        }
    ];

    var totalSpawned = 0;
    var MAX_SPAWNED = 25;

    var run = function () {

        var wanderer = arrayPick(wanderers);

        var waypoints = new java.util.ArrayList(wanderer.waypoints);

        var location = wanderer.waypoints.get(0);

        waypoints.remove(0);

        var name = arrayPick(maleNames);

        var npc = npcRegistry.create(name, "VILLAGER");
        wanderer.npc = npc;

        //npc.getTraits()
        //    .setKitName("guard");

        var flock = npc.getTraits().add("NpcTraitPack:Flocking").setInterval(3);


        flock.getAlignment().setWeight(0.0).setRadius(1.0);
        flock.getCohesion().setWeight(0.0).setRadius(1.0);
        flock.getSeparation().setWeight(3).setRadius(1.5);

        npc.spawn(location);
        totalSpawned++;

        npc.getGoals().resume();

        npc.getNavigator().getSettings().setSpeed(rand.getIntMinMax(50, 60) * 0.01); // 0.45

        npc.getTraits().add("NpcTraitPack:SimpleWaypoints")
            .addWaypoints(waypoints)
            .onFinish(function (npc) {
                npc.dispose();
                totalSpawned--;
            })
            .start();

        npc.getTraits().add("NpcTraitPack:SpigotActivated");

        npc.getTraits().get("NpcTraitPack:LivingEntity")
            .setProfession('.random');

        npc.onNpcDespawn(function (event) {
            if (event.getReason().name().equals("DEATH")) {
                npc.dispose();
                totalSpawned--;
            }
        });

        npc.getTraits().vulnerable();
    };

    // run the script
    scheduler.runTaskRepeat(7 * 20, 7 * 20, function() {

        if (totalSpawned >= MAX_SPAWNED || !rand.chance(50))
            return;

        run();
    });
});