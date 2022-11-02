import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {}

export class Game implements IGame {
    constructor(gameField:IGameField, gameView:IGameView, stepDurationMs?:number){
        let timerId: NodeJS.Timer;
        gameView.onCellClick(gameField.toggleCellState);
        gameView.onGameStateChange((newState: boolean)=>{
            if(newState) {
                timerId = setInterval(()=>{
                    gameField.nextGeneration();
                    gameView.updateGameField(gameField.getState());
                    gameView.updateGameState({isRunning:true});
                }, stepDurationMs);
            } else {
                clearInterval(timerId);
            }
        });
        gameView.onFieldSizeChange((width: number, height: number)=>{
            gameField.setSize(width,height);
            gameView.updateGameField(gameField.getState());
            gameView.updateGameState({width: width,height: height});
        });
    }
}
