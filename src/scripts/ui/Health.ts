module JsrRevolution.UI {

  export class Health {
    private game:Phaser.Game;
    private text:Phaser.Text;

    constructor(game:Phaser.Game, john:JsrRevolution.Entities.John) {
      this.game = game;
      this.text = game.add.text(160, 10, "Health :", {font: "20px Arial", fill: "#fff", align: "right"});
      this.text.fixedToCamera = true;
      this.updateHealth(john.health);
      john.onHurt.add(this.updateHealth, this)
    }

    updateHealth(remainingHeath:number) {
      this.text.setText('Health : ' + remainingHeath.toString());
    }
  }
}

