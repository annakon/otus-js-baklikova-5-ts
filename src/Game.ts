import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {}

export class Game implements IGame {
    constructor(gameField:IGameField, gameView:IGameView, stepDurationMs?:number){}
}
