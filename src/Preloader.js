import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor(){
    super("Preloader")
  }

  preload(){
    this.load.image('tiles', 'images/dungeon tileset/0x72_DungeonTilesetII_v1.6.png')
    this.load.tilemapTiledJSON('map', 'images/tiles/map-01.json')
    this.load.spritesheet('player', 'images/player/player.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    // TASK 1: LOAD BACKGROUND IMAGE
    this.load.image('backgrounds', 'images/darkcavebackgrounds.png')
    // TASK 2: LOAD ENEMIES SPRITESHEET (IDLE AND RUN)
    this.load.spritesheet('demon_idle', 'images/enemies/red demon idle.png', {
      frameWidth: 30,
      frameHeight: 31
    })
    this.load.spritesheet('demon_run', 'images/enemies/red demon run.png', {
      frameWidth: 30,
      frameHeight: 31
    })
    
  }

  create(){
    this.scene.start('Horror-Scene')
  }
}