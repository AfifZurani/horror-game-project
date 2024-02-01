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

    this.load.image('backgrounds', 'images/darkcavebackgrounds.png')
    this.load.atlas('demon_idle', 'images/enemies/red demon idle.png', 'images/enemies/red demon idle.json')
    this.load.atlas('demon_run', 'images/enemies/red demon run.png', 'images/enemies/red demon run.json') 
  }

  create(){
    this.scene.start('Horror-Scene')
  }
}