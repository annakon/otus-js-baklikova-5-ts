import { IGameField } from "./GameField";
import { IGameView } from "./GameView";

export class Game {
  timerId?: NodeJS.Timer;
  constructor(
    gameField: IGameField,
    gameView: IGameView,
    stepDurationMs: number=1000
  ) {
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
          gameField.nextGeneration();
          gameView.updateGameField(gameField.getState());
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
