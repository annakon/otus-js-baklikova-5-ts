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
  onCC: (x: number, y: number) => void;
  constructor(element:HTMLElement) {
    this.el=element;
    this.el.innerHTML="<div class='gameField'></div><div class='gameControls'></div>"
    this.onCC = (x: number, y: number) => void {};
  }
  updateGameField(field: Cell[][]){
    let gameField=this.el.querySelector(".gameField") as HTMLDivElement;
    gameField.innerHTML='';
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
        td.addEventListener("click",(ev) => {this.onCC(col,row)});
         tr.appendChild(td);
      }
    }
  }
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }){}
  onCellClick(cb: (x: number, y: number) => void){
    this.onCC=cb;
     /*let trs=[...this.el.querySelectorAll("tr")];
     for (let i=0;i<trs.length;i++) {
       let tds=[...trs[i].querySelectorAll("td")];
       for (let j=0;j<tds.length;j++) {
         tds[j].addEventListener("click",(ev) => {cb(i,j)});
       }
     }*/
  }
  onGameStateChange(cb: (newState: boolean) => void){}
  onFieldSizeChange(cb: (width: number, height: number) => void){}
}
