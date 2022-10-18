import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number): void;
  nextGeneration(): void;
  setSize(width: number, height: number) : void;
}

export class GameField implements IGameField {
  field: Cell[][]=[];
  constructor(width: number = 0, height: number = 1) {
    let field = [];
    for (let row = 0; row < height; row++) {
      field[row] = new Array();
      for (let col = 0; col < width; col++) {
        field[row][col] = 0;
      }
      this.field = field;
    }
  }

   getAliveCellCount(x: number,y: number): number{
    let count: number=0;
    for (let row = y-1; row <= y+1; row++) {
      for (let col = x-1; col <= x+1; col++) {
        if(col!==row && this.field[row]?.[col]===1) {
          count++;
        }
      }
    }
    /*if(this.field[y-1][x]===1){
      count++;
    }*/
    return count;
  }

  nextGeneration() {

    for (let row = 0; row < this.field.length; row++) {
      for (let col = 0; col < this.field[row].length; col++) {
        let ACount: number=this.getAliveCellCount(col,row);

        if(ACount===3 && this.field[row][col] === 0){
          this.field[row][col]=1;
        }
        if(ACount !== 3 && ACount !== 2  && this.field[row][col] === 1) {
            this.field[row][col]=0;
          }
      }
    }
  }

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
    let newField : Cell[][] = [];


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
