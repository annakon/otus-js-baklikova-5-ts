import { Cell } from "./types/Cell";

type viewState={
  width?: number;
  height?: number;
  isRunning?: boolean;
  stepDurationMs?: number
}

export interface IGameView {
  updateGameField: (field: Cell[][]) => void;
  updateGameState: (state: viewState) => void;
  onCellClick: (cb: (x: number, y: number) => void) => void;
  onGameStateChange: (cb: (newState: boolean) => void) => void;
  onFieldSizeChange: (cb: (width: number, height: number) => void) => void;
  getDuration: ()=>number;
}

export class GameView implements IGameView {
  el: HTMLElement;
  onCellClickCB: (x: number, y: number) => void;
  onGameStateChangeCB: (newState: boolean) => void;
  onFieldSizeChangeCB: (width: number, height: number) => void;
  state: viewState = {};

  constructor(element: HTMLElement) {
    this.el = element;
    this.el.innerHTML =
      "<div class='gameField'></div><div class='gameControls'></div>";

    this.onCellClickCB = (x: number, y: number) => void {};
    this.onGameStateChangeCB = (newState: boolean) => void {};
    this.onFieldSizeChangeCB = (width: number, height: number) => void {};

    const gameControls = this.el.querySelector(
      ".gameControls"
    ) as HTMLDivElement;
    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = "Play";
    buttonEl.className = "run-button run-button--stopped";
    buttonEl.addEventListener("click", (ev) => {
      this.onGameStateChangeCB(buttonEl.innerHTML === "Play");
    });
    gameControls.appendChild(buttonEl);

    let input: HTMLInputElement[]=[document.createElement("input"),document.createElement("input")];

    for(let i=0;i<2;i++){
      input[i].type = "number";
      if(i===0) {
        input[i].className = "field-size field-size--width";
      } else {
        input[i].className =  "field-size field-size--height";
      }
      gameControls.appendChild(input[i]);
      input[i].addEventListener("change", (ev) => {
        this.onFieldSizeChangeCB(input[0].valueAsNumber, input[1].valueAsNumber);
      });
    }

    const inputRangeSpeed = document.createElement("input");
    inputRangeSpeed.type = "range";
    inputRangeSpeed.className = "field-range";
    gameControls.appendChild(inputRangeSpeed);
    inputRangeSpeed.addEventListener("change", (ev) => {
      this.state.stepDurationMs=inputRangeSpeed.valueAsNumber;
    });
  }

  updateGameField(field: Cell[][]) {
    const gameField = this.el.querySelector(".gameField") as HTMLDivElement;
    gameField.innerHTML = "";
    const tableEl = document.createElement("table");
    gameField.appendChild(tableEl);

    for (let row = 0; row < field.length; row++) {
      const tr = document.createElement("tr");
      tableEl.appendChild(tr);
      for (let col = 0; col < field[row].length; col++) {
        const td = document.createElement("td");
        if (field[row][col] === 1) {
          td.className = "cell cell--alive";
        } else {
          td.className = "cell cell--dead";
        }
        td.addEventListener("click", (ev) => {
          this.onCellClickCB(col, row);
        });
        tr.appendChild(td);
      }
    }
  }

  updateGameState(state: viewState) {
    this.state = {
      ...this.state,
      ...state,
    };
    if (typeof this.state.width === "number" && !isNaN(this.state.width)) {
      const inputW = this.el.querySelector(
        "input[type='number'].field-size.field-size--width"
      ) as HTMLInputElement;
      inputW.valueAsNumber = this.state.width;
    }
    if (typeof this.state.height === "number" && !isNaN(this.state.height)) {
      const inputH = this.el.querySelector(
        "input[type='number'].field-size.field-size--height"
      ) as HTMLInputElement;
      inputH.valueAsNumber = this.state.height;
    }
    const inputRangeSpeed = this.el.querySelector(
        "input[type='range']"
    ) as HTMLInputElement;
    if (typeof state.stepDurationMs === "number" && !isNaN(state.stepDurationMs)) {
      inputRangeSpeed.max = String(state.stepDurationMs*2);
      inputRangeSpeed.valueAsNumber= state.stepDurationMs;
    }
    const button = this.el.querySelector(".run-button") as HTMLButtonElement;
    if (this.state.isRunning ?? false) {
      button.className = "run-button run-button--runned";
      button.innerHTML = "Stop";
      inputRangeSpeed.disabled=true;
    } else {
      button.className = "run-button run-button--stopped";
      button.innerHTML = "Play";
      inputRangeSpeed.disabled=false;
    }
  }

  onCellClick(cb: (x: number, y: number) => void) {
    this.onCellClickCB = cb;
  }

  onGameStateChange(cb: (newState: boolean) => void) {
    this.onGameStateChangeCB = cb;
  }

  onFieldSizeChange(cb: (width: number, height: number) => void) {
    this.onFieldSizeChangeCB = cb;
  }

  getDuration(){
    return this.state.stepDurationMs as number;
  }
}
