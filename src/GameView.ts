import { Cell } from "./types/Cell";
import {IGameField} from "./GameField";

export interface IGameView {
  updateGameField(field: Cell[][]): void;
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }): void;
  onCellClick(cb: (x: number, y: number) => void): void;
  onGameStateChange(cb: (newState: boolean) => void): void;
  onFieldSizeChange(cb: (width: number, height: number) => void): void;
}

export class GameView implements IGameView {
  el:HTMLElement;
  constructor(element:HTMLElement) {
    this.el=element;
    this.el.innerHTML="<div class='gameField'></div><div class='gameControls'></div>"
  }
  updateGameField(field: Cell[][]){
    let gameField=this.el.querySelector(".gameField");

  }
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }){}
  onCellClick(cb: (x: number, y: number) => void){}
  onGameStateChange(cb: (newState: boolean) => void){}
  onFieldSizeChange(cb: (width: number, height: number) => void){}
}
