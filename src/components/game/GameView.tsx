import React, { Component } from 'react';
import { observer } from 'mobx-react';
import 'phaser';
import { GAME_END, GAME_START, INCREASE_SCORE, RESET_SCORE } from './Events';
import CurrentScoreView from './CurrentScoreView';
import { IGameStore } from './gameStore';
import { SnakeScene } from './SnakeScene';

interface Props {
  gameStore?: IGameStore;
}

interface GameOptions {
  type: number;
  width: number;
  height: number;
  parent: string;
  scene: any;
  backgroundColor: any;
}

@observer
export class GameView extends Component<Props> {
  game: Phaser.Game;

  constructor(props: Props) {
    super(props);

    const config: GameOptions = {
      type: Phaser.CANVAS,
      width: 960,
      height: 720,
      backgroundColor: '#e4e4e4',
      parent: 'game',
      scene: SnakeScene
    };

    this.game = new Phaser.Game(config);
    this.game.scale.scaleMode = Phaser.Scale.RESIZE;

    addListeners(this.game, this.props);
  }

  render() {
    return (
      <div>
        <CurrentScoreView currentScore={this.props.gameStore!.currentScore} />
        <div id="game" />
      </div>
    )
  }
}

// Custom event that change value in Mobx store
function addListeners(game: Phaser.Game, props: Props) {
  game.events.on(GAME_START, (level: number) => {
    props.gameStore!.gameStart();
  });

  game.events.on(GAME_END, (level: number) => {
    props.gameStore!.gameEnd();
  });

  game.events.on(INCREASE_SCORE, (amount: number) => {
    props.gameStore!.increaseScore(amount);
  });

  game.events.on(RESET_SCORE, () => {
    props.gameStore!.resetScore();
  });
}
