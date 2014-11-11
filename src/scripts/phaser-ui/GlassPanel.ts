/// <reference path='Panel.ts'/>

module PhaserUI {

  export class GlassPanel extends Panel {
    constructor(game:Phaser.Game, rect:Phaser.Rectangle) {
      super(game, rect, {
        topLeftSprite: 'glassPanel_cornerTL.png',
        topRightSprite: 'glassPanel_cornerTR.png',
        topSprite: 'glassPanel.png',
        topHeight: 15,
        contentSprite: 'glassPanel.png',
        bottomLeftSprite: 'glassPanel_cornerBL.png',
        bottomRightSprite: 'glassPanel_cornerBR.png',
        bottomSprite: 'glassPanel.png'
      });
    }
  }
}
