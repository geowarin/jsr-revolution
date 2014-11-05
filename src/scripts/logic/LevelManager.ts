module JsrRevolution.logic {

  export class LevelManager {
    private level:Level;
    private timer:Phaser.Timer;
    private main:State.Main;
    private enemies:Entities.Enemies;
    private spawnLocations:Phaser.Point[];
    private random:Phaser.RandomDataGenerator = new Phaser.RandomDataGenerator();
    private nextLevelPending:boolean;

    start() {
      this.level = new Level(1, 3 * Phaser.Timer.SECOND, 100, 2, 1, 10);
      this.enemies.createMultiple(2, "wolf");
      this.timer = this.main.game.time.create(false);
      this.timer.onComplete.add(this.endLevel, this);
      this.startLevel();
    }

    startLevel() {
      console.log('Starting level', this.level);
      this.enemies.createMultiple(1, "wolf");
      this.level.enemySpeed += 10;
      var numberOfWaves:number = this.level.level + 2;
      this.timer.repeat(this.level.respawnDelay, numberOfWaves, this.spawnEnemies, this);
      this.timer.start();
    }

    endLevel() {
      this.nextLevelPending = true;
      var previousLevel:Level = this.level;
      this.level = new Level(previousLevel.level + 1,
                             previousLevel.respawnDelay - 20,
                             previousLevel.enemySpeed + 10,
                             previousLevel.enemyHealth + 0.5,
                             previousLevel.enemyDamage + 0.2,
                             previousLevel.pointsPerEnemy + 5);
    }

    spawnEnemies() {
      var location:Phaser.Point = this.random.pick(this.spawnLocations);
      this.spawnWolf(location);
    }

    onEnemyKilled() {
      this.main.score.addPoints(10);
      if (this.nextLevelPending && this.enemies.total == 0) {
        this.startLevel();
      }
    }

    spawnWolf(location:Phaser.Point):void {
      var newWolf:JsrRevolution.Entities.Wolf = this.enemies.getFirstDead();
      if (newWolf) {
        newWolf.reset(location.x, location.y, this.level.enemyHealth);
        newWolf.target = this.main.john;
        newWolf.speed = this.level.enemySpeed;
        newWolf.events.onKilled.addOnce(this.onEnemyKilled, this);
      }
    }

    constructor(main:State.Main, enemies:Entities.Enemies) {
      this.main = main;
      this.enemies = enemies;
      var world:Phaser.World = main.game.world;
      this.spawnLocations = [
        new Phaser.Point(0, 0),
        new Phaser.Point(world.width, 0),
        new Phaser.Point(world.width, world.height),
        new Phaser.Point(0, world.height),
      ];
    }
  }

  class Level {
    level:number;
    respawnDelay:number;
    enemySpeed:number;
    enemyHealth:number;
    enemyDamage:number;
    pointsPerEnemy: number;

    constructor(level:number, respawnDelay:number, enemySpeed:number, enemyHealth:number, enemyDamage:number, pointsPerEnemy:number) {
      this.level = level;
      this.respawnDelay = respawnDelay;
      this.enemySpeed = enemySpeed;
      this.enemyHealth = enemyHealth;
      this.enemyDamage = enemyDamage;
      this.pointsPerEnemy = pointsPerEnemy;
    }
  }
}
