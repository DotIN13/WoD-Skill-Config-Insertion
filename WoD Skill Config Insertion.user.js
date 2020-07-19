// ==UserScript==
// @name         WoD Skill Config Insertion
// @namespace    https://www.wannaexpresso.com
// @version      0.1
// @description  Make it easier to insert actions in skill config.
// @author       DotIN13
// @include        https://*.wannaexpresso.com/wod/spiel/hero/skillconf*
// @include        http*://*.world-of-dungeons.*/wod/spiel/hero/skillconf*
// @grant        none
// ==/UserScript==


var insertButton = document.createElement("div");
insertButton.innerHTML = "插入";


WodUiActionList.prototype.insertAction = function(action, index) {
    this.list.insertItem(new WodUiActionListItem(action), index);
};

["preroundActionList", "roundActionList"].forEach(el => {
    var _this = THE_ORDERS.dungeon.level[el];
    _this.list.addButton(new WodUiImage('button-copy.png', 24, 24, "插入"), function() {
        var src = _this.getSelectedAction();

        if (typeof src != undefined) {
            var dst = new WodAction();

            dst.copyFrom(src);
            _this.insertAction(dst, _this.list.getSelectedIndex());
            _this.rebuildModel();
            _this.list.setSelectedIndex( _this.list.getSelectedIndex()+1 );
        }
    })
})