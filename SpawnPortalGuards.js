try {
    // Java 8 compatibility
    load("nashorn:mozilla_compat.js");
}
catch (e) {
    // Java 7, ignore
}

importPackage(Packages.com.jcwhatever.nucleus.utils);
importPackage(Packages.com.jcwhatever.nucleus.utils.entity);

depends.on("ArborianQuests", function() {

    include.api("ArborianQuests", "quests", "quests");

    var npcRegistry = npcProvider.createRegistry("spawnPortalGuards");
    /*
     * Libs
     */
    include.script("globalUtils.js");
    include.script("status_tracker.js");
    include.script("questlib.js");

    // Constants
    include.script("quests/global/constants.js");

    var guards = [
        {
            name : "Guard",
            location : quests.locations.get("Spawn_Portal_Guard1"),
            yaw : 0,
            radius: 22.0
        },
        {
            name : "Guard",
            location : quests.locations.get("Spawn_Portal_Guard2"),
            yaw : 0,
            radius: 22.0
        },
        {
            name : "Guard",
            location : quests.locations.get("Spawn_Portal_Guard3"),
            yaw : 90,
            radius: 22.0
        },
        {
            name : "Guard",
            location : quests.locations.get("Spawn_Portal_Guard4"),
            yaw : 90,
            radius: 22.0
        }
    ];

    var run = function () {
        var squad =  [].toList();

        for (var i=0; i < guards.length; i++) {
            var guard = guards[i];

            var location = LocationUtils.getBlockLocation(guard.location);
            location.setYaw(guard.yaw);

            var npc = npcRegistry.create(guard.name, "PLAYER");
            guard.npc = npc;

            npc.getTraits()
                .setKitName("guard");

            var flock = npc.getTraits().add("NpcTraitPack:Flocking")
                .setFlockFilter(squad)
                .setPolicy("WHITELIST");

            flock.getAlignment().setWeight(0.0);
            flock.getCohesion().setWeight(1.0);
            flock.getSeparation().setWeight(5.0);

            npc.getTraits().add("NpcTraitPack:PickupVictimDrops")
                .setXpPickedUp(true)
                .setItemsDropped(false);

            npc.getTraits().add("NpcTraitPack:Looking")
                .lookCasual()
                .getHandler()
                    .setRange(20)
                    .setReturnLook(guard.yaw, 0);

            npc.getGoals()
                .add(1, standGuardGoal(guard))
                .add(2, attackMonsterGoal(guard));

            npc.getNavigator().onNavComplete(getOnNavComplete(npc, guard));
            npc.spawn(location);
            msg.debug("spawned at " + location);

            squad.add(npc);
        }
    };

    function getOnNavComplete(npc, guard) {
        return function (n) {
            npc.look(guard.yaw, 0.0);
        }
    }

    function standGuardGoal(guard) {

        var LOCATION = new org.bukkit.Location(null, 0, 0, 0);

        return npcProvider.createGoal("GuardGoal")

            .onCanRun(function (state) {

                var loc = state.getLocation(LOCATION);

                return !state.getNavigator().isRunning() &&
                    !LocationUtils.isLocationMatch(loc, guard.location, 2.0);
            })

            /* run */
            .onRun(function (agent) {
                if (!agent.getState().getNavigator().isRunning()) {

                    var loc = agent.getState().getLocation(LOCATION);

                    if (LocationUtils.isLocationMatch(loc, guard.location, 2.0)) {
                        agent.finish();
                        return;
                    }

                    msg.debug("stand guard RUN");
                    agent.getState().getNavigator().setTarget(guard.location);
                }
            })
    }

    function attackMonsterGoal(guard) {

        var LOCATION = new org.bukkit.Location(null, 0, 0, 0);
        var attackEntity = null;
        var radiusSquared = guard.radius * guard.radius;

        return npcProvider.createGoal("AttackMonster")

            .onCanRun(function (state) {
                var location = state.getLocation(LOCATION);

                attackEntity = EntityUtils.getClosestLivingEntity(guard.location,
                    guard.radius, function (livingEntity) {

                        if (!livingEntity.isDead() && livingEntity.isValid() &&
                            (EntityTypes.isMonster(livingEntity.getType()) ||
                            EntityTypes.isHostile(livingEntity.getType()))) {
                            msg.debug("attack monster CAN-RUN");
                            return true;
                        }
                        return false;
                });

                return attackEntity != null && !attackEntity.isDead();
            })

            .onRun(function (agent) {

                if (attackEntity == null || attackEntity.isDead() ||
                    !attackEntity.getWorld().equals(guard.location.getWorld()) ||
                    attackEntity.getLocation().distanceSquared(guard.location) > radiusSquared) {

                    attackEntity = null;
                    msg.debug("atack monster FINISH");
                    agent.finish();
                    return;
                }

                var currentTarget = agent.getState().getNavigator().getTargetEntity();

                if (currentTarget != null && currentTarget.equals(attackEntity)) {
                    msg.debug("attack monster RUNNING");
                    return;
                }

                msg.debug("attack monster RUN");
                agent.getState().getNavigator()
                    .setHostile(true)
                    .setTarget(attackEntity);
            })
    }

    // run the script
    run();
});