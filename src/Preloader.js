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

    // TASK 2: LOAD ENEMIES SPRITESHEET (IDLE AND RUN)
  }

  create(){
    this.scene.start('Horror-Scene')
  }
}