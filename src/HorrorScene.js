import Phaser from "phaser";

export default class HorrorScene extends Phaser.Scene {
  constructor() {
    super("Horror-Scene");
  }

  init(){
    this.wallsLayer = undefined;
    this.speed = 50
    this.player = undefined
    this.cursor = undefined
  }

  create() {
    // TASK 1: CREATE BACKGROUND IMAGE

    // Create map
    this.createMap()

    // Create player Method
    this.player = this.createPlayer()
    this.physics.add.collider(this.player, this.wallsLayer)

    // Create cursor keys
    this.cursor = this.input.keyboard.createCursorKeys()

    // Set Depth
    this.wallsLayer.setDepth(10)
    this.player.setDepth(0)

    // TASK 2: CREATE ENEMIES METHOD
  }

  update(time) {
    this.movePlayer(this.player, time)
  }

  // START CODE HERE

  // Method to create map
  createMap(){
    const map = this.make.tilemap({key: 'map'})
    const tileset = map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
    map.createLayer('Grounds', tileset)
    this.wallsLayer = map.createLayer('Walls', tileset)
    this.wallsLayer.setCollisionByProperty({collides:true})

    // FOR DEBUG
    // const debugGraphics = this.add.graphics().setAlpha(0.75)
    // wallsLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })
  }

  // Method to create player
  createPlayer(){
    const player = this.physics.add.sprite(60, 50, 'player').setScale(0.65)
    player.setCollideWorldBounds(true)

    this.anims.create({
      key:'left',
      frames :this.anims.generateFrameNumbers
              ('player', {start:56, end:61}),
      frameRate:20,
      repeat:-1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers
      ('player', {start:40, end:45}),
      frameRate:20,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers
      ('player', {start:32, end:37}),
      frameRate:20,
      repeat: -1
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {start:48, end:52}),
      frameRate:20,
      repeat:-1
    });

    // Make Character box smaller
    player.body.setSize(20, 30)

    // Make camera follow player
    this.cameras.main.startFollow(player)
    this.cameras.main.setZoom(2.25)

    return player
  }

  // Method to move player
  movePlayer(player, time){
    if(this.cursor.left.isDown){
      this.player.setVelocity(this.speed * -1, 0)
      this.player.anims.play('left', true)
    } else if(this.cursor.right.isDown){
      this.player.setVelocity(this.speed, 0)
      this.player.anims.play('right', true)
    } else if(this.cursor.up.isDown){
      this.player.setVelocity(0, this.speed * -1)
      this.player.anims.play('up', true)
    } else if(this.cursor.down.isDown){
      this.player.setVelocity(0, this.speed)
      this.player.anims.play('down', true)
    } else {
      this.player.setVelocityX(0)
      this.player.setVelocityY(0)
      this.player.anims.stop()
    }
  }

  // Method to create enemies
  createEnemies(){
    // TASK 2: CREATE ENEMIES
  }
}
