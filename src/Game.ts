import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {}

export class Game implements IGame {
    timerId?: NodeJS.Timer;
    constructor(gameField:IGameField, gameView:IGameView, stepDurationMs?:number){
        gameView.onCellClick((x: number, y: number)=>{
            gameField.toggleCellState(x,y);
            gameView.updateGameField(gameField.getState());
        });
        gameView.onGameStateChange((newState: boolean)=>{
            if(newState) {
                this.timerId = setInterval(()=>{
                    gameField.nextGeneration();
                    gameView.updateGameField(gameField.getState());
                }, stepDurationMs);
            } else {
                clearInterval(this.timerId);
            }
            gameView.updateGameState({isRunning:newState});
        });
        gameView.onFieldSizeChange((width: number, height: number)=>{
            gameField.setSize(width,height);
            gameView.updateGameField(gameField.getState());
            gameView.updateGameState({width: width,height: height});
        });
    }
}
