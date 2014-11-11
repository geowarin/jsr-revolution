/// <reference path='Panel.ts'/>

module PhaserUI {

  export interface MetalPanelColor {
    sprite:string;
  }

  export var BLUE_PANEL:MetalPanelColor = {
    sprite: 'metalPanel_blue.png'
  };
  export var GREEN_PANEL:MetalPanelColor = {
    sprite: 'metalPanel_green.png'
  };
  export var RED_PANEL:MetalPanelColor = {
    sprite: 'metalPanel_red.png'
  };
  export var YELLOW_PANEL:MetalPanelColor = {
    sprite: 'metalPanel_yellow.png'
  };

  export class MetalPanel extends Panel {
    constructor(game:Phaser.Game, rect:Phaser.Rectangle, color:MetalPanelColor = BLUE_PANEL) {
      super(game, rect, {
        topLeftSprite: color.sprite,
        topRightSprite: color.sprite,
        topSprite: color.sprite,
        topHeight: 30,
        contentSprite: 'metalPanel.png',
        bottomLeftSprite: 'metalPanel.png',
        bottomRightSprite: 'metalPanel.png',
        bottomSprite: 'metalPanel.png'
      });
    }

    setTitle(text:string, color:number = 0xFFFFFF) {
      var textSprite = this.game.add.bitmapText(10, 8, 'future-thin', text, 24);
      textSprite.tint = color;
      this.addChild(textSprite);
    }
  }
}
