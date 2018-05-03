import Phaser from 'phaser'

class Fire extends Phaser.Sprite {

	constructor (game, x, y){
		super(game, x, y, 'fire')

		this.game.physics.arcade.enableBody(this)

		this.anchor.setTo(0.5,0.5)

		this.checkWorldBounds = true

		this.body.collideWorldBounds = true
	}
}
export default Fire
