import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number);
  nextGeneration();
  setSize(width: number, height: number) : void;
}

export class GameField implements IGameField {
  field: Cell[][];
  constructor(width: number = 0, height: number = 1) {
    let field = [];
    for (let row = 0; row < height; row++) {
      field[row] = [];
      for (let col = 0; col < width; col++) {
        field[row][col] = 0;
      }
      this.field = field;
    }
  }

  nextGeneration() {}

  getState() {
    return this.field;
  }

  toggleCellState(x: number, y: number) {
    if (this.field[y][x] === 1) {
      this.field[y][x] = 0;
    } else {
      this.field[y][x] = 1;
    }
  }

  setSize(width: number, height: number) {
    let newField = [];

    for (let row = 0; row < height; row++) {
      newField.push([]);
      for (let col = 0; col < width; col++) {
        if (
          this.field[row] !== undefined &&
          this.field[row][col] !== undefined
        ) {
          newField[row][col] = this.field[row][col];
        } else {
          newField[row][col] = 0;
        }
      }
    }
    this.field = newField;
  }
}
