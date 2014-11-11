/// <reference path='GlassPanel.ts'/>

module PhaserUI {

  export class Dialog extends GlassPanel {

    constructor(game:Phaser.Game, rect:Phaser.Rectangle, text:string) {
      super(game, rect);
      //this.enableDrag();

      var textSprite = this.game.add.bitmapText(10, 10, 'future-thin', text, 24);
      textSprite.tint = 0x000001;
      this.addChild(textSprite);

      var confirmButton = this.game.add.button(20, 50, SPACE_SPRITE, this.onConfirm, this, null, 'glassPanel_projection.png');
      this.addChild(confirmButton);
    }

    onConfirm() {
      console.log('click');
    }

  }
}
