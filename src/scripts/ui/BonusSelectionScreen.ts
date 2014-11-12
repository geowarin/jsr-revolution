/// <reference path='../phaser-ui/MetalPanel.ts'/>

module JsrRevolution.UI {

  export class BonusSelectionScreen extends Phaser.Image {
    private _main:State.Main;
    private _text:Phaser.BitmapText;

    constructor(main:State.Main) {
      super(main.game, 100, 100);
      this._main = main;
      this.fixedToCamera = true;

      this._text = this.game.add.bitmapText(60, 0, 'future-thin', 'Level 2 completed\nPlease choose a reward', 32);
      this._text.align = 'center';
      this.addChild(this._text);

      var energyPanel = new ClickablePanel(this.game, new Phaser.Rectangle(0, 80, 150, 200), PhaserUI.BLUE_PANEL, 'health-increase', 'Permanently\nincrease your\nmaximum health\nby 10');
      energyPanel.setTitle('energy');
      this.addChild(energyPanel);
      energyPanel.events.onInputDown.add(() => {
        this._main.john.characteristics.maximumHealth += 20;
        this._main.john.health += 20;
        this._main.john.dispatchHealthChange();
        this._main.john.paused = false;
        this.kill();
      });

      var attackPanel = new ClickablePanel(this.game, new Phaser.Rectangle(200, 80, 150, 200), PhaserUI.RED_PANEL, 'pistol', 'Boost you power');
      attackPanel.setTitle('attack');
      this.addChild(attackPanel);
      attackPanel.events.onInputDown.add(() => {
        this._main.john.characteristics.bulletDamage += 0.2;
        this._main.john.paused = false;
        this.kill();
      });

      var healthPanel = new ClickablePanel(this.game, new Phaser.Rectangle(400, 80, 150, 200), PhaserUI.GREEN_PANEL, 'health', 'Get me a medic !');
      healthPanel.setTitle('health');
      this.addChild(healthPanel);
      healthPanel.events.onInputDown.add(() => {
        this._main.john.heal();
        this._main.john.paused = false;
        this.kill();
      });
    }

    show(level:number) {
      this._text.setText('Level ' + level + ' completed\nPlease choose a reward')
    }
  }

  class ClickablePanel extends PhaserUI.MetalPanel {

    constructor(game:Phaser.Game, rect:Phaser.Rectangle, color:PhaserUI.MetalPanelColor, icon:string, description:string) {
      super(game, rect, color);
      this.inputEnabled = true;
      this.input.useHandCursor = true;

      var iconImg = this.game.add.image(60, 40, icon);
      this.addChild(iconImg);

      var textSprite = this.game.add.bitmapText(15, 120, 'future-thin', description, 16);
      textSprite.tint = 0x000001;
      textSprite.align = 'center';
      this.addChild(textSprite);

      this.events.onInputOver.add(() => this.tint = 0xFEFB8D);
      this.events.onInputOut.add(() => this.tint = 0xFFFFFF);
    }

    set tint(tint:number) {
      this.children.forEach((child) => {
        if (child.hasOwnProperty('tint')) {
          child['tint'] = tint;
        }
      });
    }
  }
}
