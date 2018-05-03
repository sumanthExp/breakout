import Phaser from 'phaser'


export default class extends Phaser.State {
  init () {}

  preload () { 
    this.game.load.spritesheet('button', 'assets/images/replay.png', 200, 200);
    this.game.load.spritesheet('home', 'assets/images/home.png', 200, 200);

  }


  create () {
     this.setUpButton()
     this.setUpScore()
     this.setUpText()
     this.setUpHiScore()
     this.setUpHome()
     
  }

  setUpText(){
    let text = this.add.text(
        this.game.width * 0.5, this.game.height *0.3, 'G A M E - O V E R',
        {

          font: '18px Courier', 
          fill:'#000', 
          boundsAlignH: 'align'
        }

      )
    text.anchor.set(0.5)
    text.fontWeight = 'bold';
    text.fontSize = 50;

    
    text.strokeThickness = 1.5;


  } 
  setUpScore(){
    let text = this.add.text(
        this.game.width * 0.5, this.game.height *0.4, `Score: ${this.game.global.score}`,
        {

          font: '18px Courier', 
          fill:'#000', 
          boundsAlignH: 'align'
        }

      )
    text.anchor.set(0.5)
    text.fontWeight = 'bold';
    text.fontSize = 50;

    
    text.strokeThickness = 1.5;


  } 
  setUpHiScore(){
    let text = this.add.text(
        this.game.width * 0.5, this.game.height *0.5, "Hi Score:" ,
        {

          font: '18px Courier', 
          fill:'#000', 
          boundsAlignH: 'align'
        }

      )
    text.anchor.set(0.5)
    text.fontWeight = 'bold';
    text.fontSize = 50;

    
    text.strokeThickness = 1.5;


  } 
  

  setUpButton(){
     var button
     button = game.add.button(game.world.centerX *0.6, this.game.height*0.7, 'button', this.actionOnClick, this, 2, 1, 0);
     
  }
  setUpHome(){
     var button
     button = game.add.button(game.world.centerX *1.3, this.game.height*0.67, 'home', this.actionOnHome, this, 2, 1, 0);
     
     
  }
 
  
  actionOnClick(){
    
      this.game.state.start('Simultaneous')
  }
  actionOnHome(){
    
      this.game.state.start('Player')
  }
  
}
