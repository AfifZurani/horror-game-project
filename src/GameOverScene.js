import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver-Scene");
  }

  init() {
    this.replayButton= undefined
    this.jumpscare = undefined
  }

  preload() {
    this.load.image('jumpscare', 'images/albertjumpscare.png')
    this.load.image('replay-button', 'images/replay.png')
  }

  create() {
    this.add.image(360, 250, 'jumpscare')
    this.replayButton = this.add.image(280, 250, 'replay-button')
    .setInteractive().setScale(0.5)

    this.replayButton.once('pointerup', () => {
      this.scene.start('Horror-Scene')
    }, this)
  }

  update() {

  }
}