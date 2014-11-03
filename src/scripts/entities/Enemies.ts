module JsrRevolution.Entities {

  export class Enemies extends Phaser.Group {
    private main:JsrRevolution.State.Main;

    constructor(game:Phaser.Game, main:JsrRevolution.State.Main) {
      super(game);
      this.main = main;
      this.enableBody = true;
      this.physicsBodyType = Phaser.Physics.ARCADE;
      this.classType = JsrRevolution.Entities.Wolf;
      this.createMultiple(3, 'wolf');
    }

    spawnWolf():void {
      var newWolf:JsrRevolution.Entities.Wolf = this.getFirstDead();
      if (newWolf) {
        newWolf.reset(this.game.world.randomX, this.game.world.randomY, 2);
        newWolf.target = this.main.john;
        Wolf.currentSpeed += 2;
        newWolf.events.onKilled.addOnce(() => this.main.score.addPoints(10));
      }
    }
  }

}
