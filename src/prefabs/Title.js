import Phaser from 'phaser'

class Title extends Phaser.Sprite {

	constructor (game, x, y){
		super(game, x, y, 'title')
		this.game.physics.arcade.enableBody(this)


		
	}
}


export default Title