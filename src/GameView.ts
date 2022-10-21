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
    let gameField=this.el.querySelector(".gameField") as HTMLDivElement;
    let tableEl=document.createElement("table");
    gameField.appendChild(tableEl);
    for (let row = 0; row < field.length; row++) {
      let tr=document.createElement("tr");
      tableEl.appendChild(tr)
      for (let col = 0; col < field[row].length; col++) {
         let td=document.createElement("td");
         if(field[row][col]===1){
           td.className="cell cell--alive";
         }
         else {
           td.className="cell cell--dead";
         }
         tr.appendChild(td);
      }
    }
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
