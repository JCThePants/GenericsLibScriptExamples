
(function () {

    var kingInfo = _global.character.KING;

    _global.npc.KING = citizens.createNPC(kingInfo.name, kingInfo.type);
    _global.npc.KING.setSkinName(kingInfo.skin);

    var location = quests.locations.get("King");
    _global.npc.KING.spawn(location);

}());



