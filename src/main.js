import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import EndState from './states/End'
import End1State from './states/End1'
import PlayerState from './states/Player'
import SimuState from './states/Simultaneous'
import LoginState from './states/Login'
import SecondLevel from './states/Second'
import secondSimul from './states/secondSimul'
import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)
    this.state.add('Login', LoginState, false)
    this.state.add('Player', PlayerState, false)
    this.state.add('Simultaneous', SimuState, false)
    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('End', EndState, false)
    this.state.add('End1', End1State, false)
    this.state.add('singlesecond', SecondLevel, false)
    this.state.add('secondSimul', secondSimul, false)


    if (!window.cordova) {

      this.state.start('Player')

    }
  }
}


window.game = new Game()
require('dotenv').config();


if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },


    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Player')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }


  }


  app.initialize()


}
