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
  constructor(el:HTMLElement) {}
  updateGameField(field: Cell[][]){}
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }){}
  onCellClick(cb: (x: number, y: number) => void){}
  onGameStateChange(cb: (newState: boolean) => void){}
  onFieldSizeChange(cb: (width: number, height: number) => void){}
}
