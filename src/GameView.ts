import { Cell } from "./types/Cell";

interface viewState {
  width: number;
  height: number;
  isRunning: boolean;
  stepDurationMs: number;
}

export interface IGameView {
  updateGameField: (
    field: Cell[][],
    onCellClick: (x: number, y: number) => void
  ) => void;
  updateGameState: (state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
    stepDurationMs?: number;
  }) => void;
  getDuration: () => number;
}

export class GameView implements IGameView {
  el: HTMLElement;
  state: viewState;

  constructor(
    element: HTMLElement,
    state: viewState,
    onGameStateChange: (newState: boolean) => void,
    onFieldSizeChange: (width: number, height: number) => void
  ) {
    this.state = state;
    this.el = element;
    this.el.innerHTML =
      "<div class='gameField'></div><div class='gameControls'></div>";

    const gameControls = this.el.querySelector(
      ".gameControls"
    ) as HTMLDivElement;
    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = "Play";
    buttonEl.className = "run-button run-button--stopped";
    buttonEl.addEventListener("click", (ev) => {
      onGameStateChange(buttonEl.innerHTML === "Play");
    });
    gameControls.appendChild(buttonEl);

    const input: HTMLInputElement[] = [
      document.createElement("input"),
      document.createElement("input"),
    ];

    for (let i = 0; i < 2; i++) {
      input[i].type = "number";
      if (i === 0) {
        input[i].className = "field-size field-size--width";
      } else {
        input[i].className = "field-size field-size--height";
      }
      gameControls.appendChild(input[i]);
      input[i].addEventListener("change", (ev) => {
        onFieldSizeChange(input[0].valueAsNumber, input[1].valueAsNumber);
      });
    }

    const inputRangeSpeed = document.createElement("input");
    inputRangeSpeed.type = "range";
    inputRangeSpeed.className = "field-range";
    gameControls.appendChild(inputRangeSpeed);
    inputRangeSpeed.addEventListener("change", (ev) => {
      this.state.stepDurationMs = inputRangeSpeed.valueAsNumber;
    });
  }

  updateGameField(
    field: Cell[][],
    onCellClick: (x: number, y: number) => void
  ) {
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
          onCellClick(col, row);
        });
        tr.appendChild(td);
      }
    }
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
    stepDurationMs?: number;
  }) {
    this.state = {
      ...this.state,
      ...state,
    };

    const inputW = this.el.querySelector(
      ".field-size--width"
    ) as HTMLInputElement;
    inputW.valueAsNumber = this.state.width;

    const inputH = this.el.querySelector(
      ".field-size--height"
    ) as HTMLInputElement;
    inputH.valueAsNumber = this.state.height;

    const inputRangeSpeed = this.el.querySelector(
      "input[type='range']"
    ) as HTMLInputElement;
    if (
      typeof state.stepDurationMs === "number" &&
      !isNaN(state.stepDurationMs)
    ) {
      inputRangeSpeed.max = String(state.stepDurationMs * 2);
      inputRangeSpeed.valueAsNumber = state.stepDurationMs;
    }
    const button = this.el.querySelector(".run-button") as HTMLButtonElement;
    if (this.state.isRunning ?? false) {
      button.className = "run-button run-button--runned";
      button.innerHTML = "Stop";
      inputRangeSpeed.disabled = true;
    } else {
      button.className = "run-button run-button--stopped";
      button.innerHTML = "Play";
      inputRangeSpeed.disabled = false;
    }
  }

  getDuration() {
    return this.state.stepDurationMs ;
  }
}
