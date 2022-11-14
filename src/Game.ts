import { GameField } from "./GameField";
import { GameView } from "./GameView";

export class Game {
  timerId?: NodeJS.Timer;
  constructor(
      el: HTMLElement,width: number, height: number,
    stepDurationMs: number=1000
  ) {
    const gameView = new GameView(el,{width,height,isRunning:false,stepDurationMs});
    const gameField = new GameField(5, 5);
    const state = gameField.getState();
    gameField.setSize(state[0].length, state.length);
    gameView.updateGameField(state);
    gameView.updateGameState({
      isRunning: false,
      width: state[0].length,
      height: state.length,
      stepDurationMs: stepDurationMs
    });

    gameView.onCellClick((x: number, y: number) => {
      gameField.toggleCellState(x, y);
      gameView.updateGameField(gameField.getState());
    });
    gameView.onGameStateChange((newState: boolean) => {
      if (newState) {
        gameField.nextGeneration();
        gameView.updateGameField(gameField.getState());
        this.timerId = setInterval(() => {
          if(gameField.nextGeneration()) {
            gameView.updateGameField(gameField.getState());
          } else {
            clearInterval(this.timerId);
            gameView.updateGameState({ isRunning: false });
          }
        }, gameView.getDuration());
      } else {
        gameView.updateGameField(gameField.getState());
        clearInterval(this.timerId);
      }
      gameView.updateGameState({ isRunning: newState });
    });
    gameView.onFieldSizeChange((width: number, height: number) => {
      gameField.setSize(width, height);
      gameView.updateGameField(gameField.getState());
      gameView.updateGameState({ width, height });
    });
  }
}
