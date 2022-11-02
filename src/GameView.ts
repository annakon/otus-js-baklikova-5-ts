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
  onGSC: (newState: boolean) => void;
  onFSC: (width: number, height: number) => void;
  state:{width?: number;
    height?: number;
    isRunning?: boolean;}={};
  constructor(element:HTMLElement) {
    this.el=element;
    this.el.innerHTML="<div class='gameField'></div><div class='gameControls'></div>"
    this.onCC = (x: number, y: number) => void {};
    this.onGSC = (newState: boolean) => void {};
    this.onFSC = (width: number, height: number) => void {};
    let gameControls=this.el.querySelector(".gameControls") as HTMLDivElement;
    let buttonEl=document.createElement("button");
    buttonEl.innerHTML="Play";
    buttonEl.className="run-button run-button--stopped";
    buttonEl.addEventListener("click",(ev) => {this.onGSC(buttonEl.innerHTML==="Play")});
    gameControls.appendChild(buttonEl);
    let inputW=document.createElement("input");
    inputW.type="number";
    inputW.className="field-size field-size--width";
    gameControls.appendChild(inputW);
    let inputH=document.createElement("input");
    inputH.type="number";
    inputH.className="field-size field-size--height";
    gameControls.appendChild(inputH);
    inputW.addEventListener("change",(ev) => {
      this.onFSC(inputW.valueAsNumber as number,inputH.valueAsNumber as number)});
    inputH.addEventListener("change",(ev) => {
      this.onFSC(inputW.valueAsNumber as number,inputH.valueAsNumber as number)});
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
  }){
    this.state = {
      ...this.state,
      ...state,
    };
    if(typeof this.state.width === "number"&& !isNaN(this.state.width)) {
      let inputW=(this.el.querySelector(
          "input[type='number'].field-size.field-size--width"
      ) as HTMLInputElement)
      inputW.valueAsNumber = this.state.width as number;
    }
    if(typeof this.state.height === "number" && !isNaN(this.state.height)) {
      let inputH=(this.el.querySelector(
          "input[type='number'].field-size.field-size--height"
      ) as HTMLInputElement)
      inputH.valueAsNumber = this.state.height as number;
    }
    let button=this.el.querySelector(".run-button") as HTMLButtonElement;
    if(state.isRunning){
      button.className="run-button run-button--runned";
      button.innerHTML="Stop";
    }else {
      button.className="run-button run-button--stopped";
      button.innerHTML="Play";
    }

  }
  onCellClick(cb: (x: number, y: number) => void){
    this.onCC=cb;
  }
  onGameStateChange(cb: (newState: boolean) => void){
    this.onGSC=cb;
  }
  onFieldSizeChange(cb: (width: number, height: number) => void){
    this.onFSC=cb;
  }
}
