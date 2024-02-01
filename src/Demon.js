import Phaser from "phaser";

const Direction =  {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
}

export default class Demon extends Phaser.Physics.Arcade.Sprite {

  init(){
    this.direction = Direction.Right
    this.moveEvent = undefined
  }

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    this.anims.create({
      key: 'demon_run',
      frames: this.anims.generateFrameNames('demon_run', {start: 0, end: 3, prefix: 'big_demon_run_anim_f', suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    })

    // Play anims
    this.anims.play('demon_run', true)

    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)

    this.moveEvent = scene.time.addEvent({
      delay: Phaser.Math.Between(3000, 5000),
      callback: () => {
        this.direction = this.randomDirection(this.direction)
      },
      loop: true
    })
  }

  handleTileCollision(go, tile) {
    if (go !== this) {
      return
    }

    this.direction = this.randomDirection(this.direction)
  }

  randomDirection(direction) {
    let newDirection = Phaser.Math.Between(0, 3)
    while(newDirection === direction){
      newDirection = Phaser.Math.Between(0, 3)
    }

    return newDirection
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt)
    const speed = 35
    if (this.direction === undefined){
      this.direction = Direction.Right
    }

    switch (this.direction) {
      case Direction.Left:
        this.setVelocity(-speed, 0)
        break
      case Direction.Right:
        this.setVelocity(speed, 0)
        break
      case Direction.Up:
        this.setVelocity(0, -speed)
        break
      case Direction.Down:
        this.setVelocity(0, speed)
        break
    }
  }
}