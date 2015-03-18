
(function () {

    var kingInfo = _global.character.KING;

    var npc = _global.npc.KING = npcs.create(kingInfo.uname, kingInfo.name, kingInfo.type);
    npc.getTraits().setSkinName(kingInfo.skin);

    var location = quests.locations.get(_locations.king.KING);
    npc.spawn(location);
}());



