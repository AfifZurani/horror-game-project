import Phaser from 'phaser'

import HorrorScene from './HorrorScene'
import GameOverScene from './GameOverScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 720,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [HorrorScene, GameOverScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)
