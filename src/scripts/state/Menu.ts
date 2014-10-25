module JsrRevolution.State {
  export class Menu extends Phaser.State {
    background:Phaser.Sprite;

    create() {
      this.background = this.add.sprite(80, 0, 'menu-background');
      this.add.text(300, 200, 'JSR', {font: "65px Arial", fill: "#ff0044", align: "center"});
      this.input.onDown.addOnce(() => {
        this.game.state.start('main');
      });
    }
  }
}
