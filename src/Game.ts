import { GameField } from "./GameField";
import { GameView, IGameView } from "./GameView";

export class Game {
  timerId?: NodeJS.Timer;
  constructor(
    el: HTMLElement,
    width: number,
    height: number,
    stepDurationMs = 1000
  ) {
    const gameField = new GameField(5, 5);
    let gameView: IGameView;

    function onCellClick(x: number, y: number) {
      gameField.toggleCellState(x, y);
      gameView.updateGameField(gameField.getState(), onCellClick);
    }

    const onGameStateChange = (newState: boolean) => {
      if (newState) {
        gameField.nextGeneration();
        gameView.updateGameField(gameField.getState(), onCellClick);
        this.timerId = setInterval(() => {
          if (gameField.nextGeneration()) {
            gameView.updateGameField(gameField.getState(), onCellClick);
          } else {
            clearInterval(this.timerId);
            gameView.updateGameState({ isRunning: false });
          }
        }, gameView.getDuration());
      } else {
        gameView.updateGameField(gameField.getState(), onCellClick);
        clearInterval(this.timerId);
      }
      gameView.updateGameState({ isRunning: newState });
    };

    function onFieldSizeChange(width: number, height: number) {
      gameField.setSize(width, height);
      gameView.updateGameField(gameField.getState(), onCellClick);
      gameView.updateGameState({ width, height });
    }

    gameView = new GameView(
      el,
      { width, height, isRunning: false, stepDurationMs },
      onGameStateChange,
      onFieldSizeChange
    );
    const state = gameField.getState();
    gameField.setSize(state[0].length, state.length);
    gameView.updateGameField(state, onCellClick);
    gameView.updateGameState({
      isRunning: false,
      width: state[0].length,
      height: state.length,
      stepDurationMs,
    });
  }
}
