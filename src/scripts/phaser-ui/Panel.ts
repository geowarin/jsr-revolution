module PhaserUI {

  export interface PanelDescription {
    topLeftSprite:string;
    topRightSprite:string;
    topSprite:string;
    topHeight:number;
    contentSprite:string;
    bottomLeftSprite:string;
    bottomRightSprite:string;
    bottomSprite:string
  }

  export class Panel extends Phaser.Image {

    constructor(game:Phaser.Game, rect:Phaser.Rectangle, description:PanelDescription) {
      super(game, rect.x, rect.y);

      var topLeft = this.game.add.image(0, 0, SPACE_SPRITE, description.topLeftSprite);
      topLeft.crop(new Phaser.Rectangle(0, 0, 15, description.topHeight), false);
      this.addChild(topLeft);

      var top = this.game.add.image(15, 0, SPACE_SPRITE, description.topSprite);
      top.crop(new Phaser.Rectangle(10, 0, 80, description.topHeight), false);
      top.width = rect.width;
      this.addChild(top);

      var rightX = rect.width + 15;
      var topRight = this.game.add.image(rightX, 0, SPACE_SPRITE, description.topRightSprite);
      topRight.crop(new Phaser.Rectangle(85, 0, 15, description.topHeight), false);
      this.addChild(topRight);

      var left = this.game.add.image(0, description.topHeight, SPACE_SPRITE, description.contentSprite);
      left.crop(new Phaser.Rectangle(0, 10, 15, 80), false);
      left.height = rect.height;
      this.addChild(left);

      var content = this.game.add.image(15, description.topHeight, SPACE_SPRITE, description.contentSprite);
      content.crop(new Phaser.Rectangle(10, 10, 80, 80), false);
      content.width = rect.width;
      content.height = rect.height;
      this.addChild(content);

      var right = this.game.add.image(rightX, description.topHeight, SPACE_SPRITE, description.contentSprite);
      right.crop(new Phaser.Rectangle(85, 10, 15, 80), false);
      right.height = rect.height;
      this.addChild(right);

      var bottomY = rect.height + description.topHeight;
      var bottomLeft = this.game.add.image(0, bottomY, SPACE_SPRITE, description.bottomLeftSprite);
      bottomLeft.crop(new Phaser.Rectangle(0, 85, 15, 15), false);
      this.addChild(bottomLeft);

      var bottom = this.game.add.image(15, bottomY, SPACE_SPRITE, description.bottomSprite);
      bottom.crop(new Phaser.Rectangle(10, 85, 80, 15), false);
      bottom.width = rect.width;
      this.addChild(bottom);

      var bottomRight = this.game.add.image(rightX, bottomY, SPACE_SPRITE, description.bottomRightSprite);
      bottomRight.crop(new Phaser.Rectangle(85, 85, 15, 15), false);
      this.addChild(bottomRight);
    }

    enableDrag() {
      this.inputEnabled = true;
      this.input.enableDrag(false, true);
    }
  }
}
