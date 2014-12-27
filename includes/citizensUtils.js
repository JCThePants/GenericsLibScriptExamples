importClass(org.bukkit.util.Vector);

var citizensUtils = (function () {

    var _self = {

        traits : {
            AGGRESSIVE : "com.jcwhatever.nucleus.citizens.traits.AggressiveTrait",
            ARCHER : "com.jcwhatever.nucleus.citizens.traits.ArcherTrait",
            HORSE_RIDER : "com.jcwhatever.nucleus.citizens.traits.HorseRiderTrait",
            LIVING_ENTITY : "com.jcwhatever.nucleus.citizens.traits.ScriptedLivingEntityTrait",
            NO_DROPS : "com.jcwhatever.nucleus.citizens.traits.NoDropsTrait",
            PROTECT_PASSENGER : "com.jcwhatever.nucleus.citizens.traits.ProtectedPassengerTrait",
            LOOKING : "com.jcwhatever.nucleus.citizens.traits.LookingTrait",
            UNBREAKING_ARMOR : "com.jcwhatever.nucleus.citizens.traits.UnbreakableArmorTrait",
            UNBREAKING_WEAPONS : "com.jcwhatever.nucleus.citizens.traits.UnbreakableWeaponsTrait",
            SCRIPTED_WAYPOINTS : "com.jcwhatever.nucleus.citizens.traits.SimpleWaypointsTrait"
        },

        viewMode : {
            WHITELIST : com.jcwhatever.nucleus.mixins.IViewable.ViewPolicy.WHITELIST,
            BLACKLIST : com.jcwhatever.nucleus.mixins.IViewable.ViewPolicy.BLACKLIST
        },

        createNPC : function (npcInfo) {

            var npc = citizens.createNPC(npcInfo.name, npcInfo.type);

            if (npcInfo.skin) {
                npc.setSkinName(npcInfo.skin);
            }

            if (npcInfo.kit) {
                var kit = citizens.getNPCKit(npcInfo.kit);
                kit.apply(npc);
            }

            return npc;
        },

        cancelNav : function (npc) {
            npc.getNavigator().cancelNavigation();
        },

        clearTarget : function (npc) {
            var goalCtrl = npc.getDefaultGoalController();

            if (goalCtrl.isExecutingGoal()) {
                goalCtrl.setPaused(true);
            }

            _self.cancelNav(npc);

            goalCtrl.setPaused(false);
        },

        setTargetLocation : function (npc, location) {

            var current = _self.getTargetLocation(npc);
            if (current != null && current.equals(location)) {
                return;
            }

            var navigator = npc.getNavigator();
            var goalCtrl = npc.getDefaultGoalController();

            if (goalCtrl.isExecutingGoal()) {
                goalCtrl.setPaused(true);
            }

            var npcVehicle = npc.getNPCVehicle();
            if (npcVehicle != null) {
                _self.setLivingTarget(npcVehicle, livingEntity, isAgressive);
            }
            else {
                navigator.setTarget(location);
            }

            goalCtrl.setPaused(false);
        },

        getTargetLocation : function (npc) {

            if (!npc.isSpawned()) {
                return null;
            }

            var navigator = npc.getNavigator();

            return navigator.getTargetAsLocation();
        },

        setLivingTarget : function (npc, livingEntity, isAgressive) {

            var target = _self.getLivingTarget(npc);

            if (target == livingEntity) {
                return;
            }

            var navigator = npc.getNavigator();
            var goalCtrl = npc.getDefaultGoalController();

            if (goalCtrl.isExecutingGoal()) {
                goalCtrl.setPaused(true);
            }

            var npcVehicle = npc.getNPCVehicle();
            if (npcVehicle != null) {
                _self.setLivingTarget(npcVehicle, livingEntity, isAgressive);
            }

            navigator.setTarget(livingEntity, isAgressive);

            if (npcVehicle != null) {
                _self.setLivingTarget(npcVehicle, livingEntity, isAgressive);
                npc.mountNPC(npcVehicle);
            }

            goalCtrl.setPaused(false);
        },

        getLivingTarget : function (npc) {
            if (!npc.isSpawned()) {
                return null;
            }

            var navigator = npc.getNavigator();
            var target = navigator.getEntityTarget();
            if (target == null) {
                return null;
            }

            return target.getTarget();
        }
    };

    return _self;

}());
