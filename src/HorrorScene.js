import Phaser from "phaser";
import { Mrpas } from "mrpas";
import Demon from "./Demon";

export default class HorrorScene extends Phaser.Scene {

  constructor() {
    super("Horror-Scene");
  }

  init(){
    this.wallsLayer = undefined;
    this.speed = 50
    this.player = undefined
    this.cursor = undefined
    this.map = undefined
    this.fov = undefined
    this.demon = undefined

    // FOV
    this.fov = undefined
    this.map = undefined

    // TASK 1: CREATE HEALTH BAR
    this.HealthBar = 3
    this.HealthBarLabel = undefined

  }

  create() {
    const gameWidht = this.scale.width * 0.5;
    const gameHeight = this.scale.height * 0.5;
    // this.add.image(gameWidht, gameHeight, "backgrounds");
    const BGD = this.add.image(gameWidht, gameHeight, "backgrounds")
    BGD.setScrollFactor(0)
    // TASK 1: Create Health Bar
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

    this.createDemon()



    // TASK 2: Create Demon Collision with Player

  } 

  update(time) {
    // TASK 3: Update Health Bar;


    this.movePlayer(this.player, time)
    this.createFOV()
  }

  // START CODE HERE

  // Method to create map
  createMap(){
    this.map = this.make.tilemap({key: 'map'})
    const tileset = this.map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
    this.groundLayer = this.map.createLayer('Grounds', tileset)
    this.wallsLayer = this.map.createLayer('Walls', tileset)
    this.wallsLayer.setCollisionByProperty({collides:true})

    // FOV
    this.fov = new Mrpas(this.map.width, this.map.height, (x,y) => {
      const tile = this.groundLayer.getTileAt(x, y)
      return tile && !tile.collides
    })
  }

  // Method to create FOV
  createFOV(){
    if (!this.fov || !this.map || !this.groundLayer || !this.player)
    {
      return
    }

    // get camera view bounds
    const camera = this.cameras.main
    const bounds = new Phaser.Geom.Rectangle(
      this.map.worldToTileX(camera.worldView.x) - 1,
      this.map.worldToTileY(camera.worldView.y) - 1,
      this.map.worldToTileX(camera.worldView.width) + 2,
      this.map.worldToTileX(camera.worldView.height) + 3
    )

    // set all tiles and demon within camera view to invisible
    for (let y = bounds.y; y < bounds.y + bounds.height; y++)
    {
      for (let x = bounds.x; x < bounds.x + bounds.width; x++)
      {
        if (y < 0 || y >= this.map.height || x < 0 || x >= this.map.width)
        {
          continue
        }

        const tile = this.groundLayer.getTileAt(x, y)
        if (!tile)
        {
          continue
        }
        tile.alpha = 1
        tile.tint = 0x404040
      }
    }
    

    // get player's position
    const px = this.map.worldToTileX(this.player.x)
    const py = this.map.worldToTileY(this.player.y)
    
    // compute fov from player's position
    this.fov.compute(
      px,
      py,
      2,
      (x, y) => {
        const tile = this.groundLayer.getTileAt(x, y)
        if (!tile)
        {
          return false
        }
        return tile.tint === 0xffffff
      },
      (x, y) => {
        const tile = this.groundLayer.getTileAt(x, y)
        if (!tile)
        {
          return
        }
        const d = Phaser.Math.Distance.Between(py, px, y, x)
        const alpha = Math.min(2 - d / 6, 1)

        tile.tint = 0xffffff
        tile.alpha =  alpha
      }
    )
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

  // Method to create demon
  createDemon(){
    // TASK 3: CREATE DEMON OBJECT
    const demons = this.physics.add.group({
      classType: Demon,
    })
    
    demons.get(100, 150, 'demon_run').setScale(0.65)
    demons.get(200, 300, 'demon_run').setScale(0.65)
    demons.get(120, 420, 'demon_run').setScale(0.65)
    demons.get(250, 320, 'demon_run').setScale(0.65)
    demons.children.iterate((demons)=>{
      // @ts-ignore
      demons.body.setSize(20,30)
    })
    this.physics.add.collider(demons, this.wallsLayer, (go, tile) => {
      if (go instanceof Demon)
      {
        go.handleTileCollision(go, tile)
      }
    })
    this.physics.add.overlap (
      this.player,
      demons,
      this.instantGameOver,
      null,
      this
    )
  }


  // Method to create health bar
  // TASK 1: CREATE HEALTH BAR

  // Method to create demon collision with player
  // TASK 2: CREATE DEMON COLLISION WITH PLAYER
  instantGameOver() {
    this.scene.start('game-over-scene')
  }

}
