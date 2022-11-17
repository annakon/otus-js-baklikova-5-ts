import { GameView } from "./GameView";

describe("GameView", () => {
  let el: HTMLElement;
  const onCellClick = jest.fn();
  const onGameStateChange = jest.fn();
  const onFieldSizeChange = jest.fn();
  beforeEach(() => {
    el = document.createElement("div");
  });
  describe("public interface", () => {
    it("is a class", () => {
      expect(GameView).toBeInstanceOf(Function);
      expect(
        new GameView(
          el,
          { width: 5, height: 5, isRunning: false, stepDurationMs: 10 },
          onGameStateChange,
          onFieldSizeChange
        )
      ).toBeInstanceOf(GameView);
    });

    it("renders some inital markup on construction", () => {
      new GameView(
        el,
        { width: 5, height: 5, isRunning: false, stepDurationMs: 10 },
        onGameStateChange,
        onFieldSizeChange
      );
      expect(el.querySelector(".gameField")).not.toBeNull();
      expect(el.querySelector(".gameControls")).not.toBeNull();
    });

    it("has public methods", () => {
      const gameView = new GameView(
        el,
        { width: 5, height: 5, isRunning: false, stepDurationMs: 10 },
        onGameStateChange,
        onFieldSizeChange
      );
      expect(gameView.updateGameField).toBeInstanceOf(Function);
      expect(gameView.updateGameState).toBeInstanceOf(Function);
    });
  });

  describe("functional interface", () => {
    let gameView: GameView;
    beforeEach(() => {
      gameView = new GameView(
        el,
        { width: 5, height: 5, isRunning: false, stepDurationMs: 10 },
        onGameStateChange,
        onFieldSizeChange
      );
    });
    it("renders field from .updateGameField", () => {
      gameView.updateGameField(
        [
          [0, 1],
          [1, 0],
        ],
        onCellClick
      );
      expect(el.querySelectorAll(".cell").length).toBe(4);
      expect(el.querySelectorAll(".cell.cell--alive").length).toBe(2);
      expect(el.querySelectorAll(".cell.cell--dead").length).toBe(2);
      gameView.updateGameField(
        [
          [0, 0],
          [1, 0],
        ],
        onCellClick
      );
      expect(el.querySelectorAll(".cell").length).toBe(4);
      expect(el.querySelectorAll(".cell.cell--alive").length).toBe(1);
      expect(el.querySelectorAll(".cell.cell--dead").length).toBe(3);
      gameView.updateGameField(
        [
          [0, 0, 1],
          [1, 0, 1],
        ],
        onCellClick
      );
      expect(el.querySelectorAll(".cell").length).toBe(6);
      expect(el.querySelectorAll(".cell.cell--alive").length).toBe(3);
      expect(el.querySelectorAll(".cell.cell--dead").length).toBe(3);
    });
    it("calls funciton from .onCellClick on field interaction", () => {
      gameView.updateGameField(
        [
          [0, 0],
          [1, 0],
        ],
        onCellClick
      );
      (el.querySelector(".cell.cell--alive") as HTMLElement).dispatchEvent(
        new Event("click", {
          bubbles: true,
        })
      );
      expect(onCellClick).toHaveBeenCalledWith(0, 1);
      el.querySelectorAll(".cell.cell--dead")[1].dispatchEvent(
        new Event("click", {
          bubbles: true,
        })
      );
      expect(onCellClick).toHaveBeenCalledWith(1, 0);
    });
    it("renders correct game state on .updateGameState", () => {
      expect(
        el.querySelector(".run-button.run-button--stopped")
      ).not.toBeNull();
      expect(
        (el.querySelector(".run-button.run-button--stopped") as HTMLElement)
          .innerHTML
      ).toBe("Play");
      gameView.updateGameState({ isRunning: true, width: 3, height: 3 });
      expect(el.querySelector(".run-button.run-button--stopped")).toBeNull();
      expect(el.querySelector(".run-button.run-button--runned")).not.toBeNull();
      expect(
        (el.querySelector(".run-button.run-button--runned") as HTMLElement)
          .innerHTML
      ).toBe("Stop");
      expect(
        Number(
          (
            el.querySelector(
              "input[type='number'].field-size.field-size--width"
            ) as HTMLInputElement
          ).value
        )
      ).toBe(3);
      expect(
        Number(
          (
            el.querySelector(
              "input[type='number'].field-size.field-size--height"
            ) as HTMLInputElement
          ).value
        )
      ).toBe(3);
      gameView.updateGameState({ isRunning: false, width: 5, height: 6 });
      expect(
        el.querySelector(".run-button.run-button--stopped")
      ).not.toBeNull();
      expect(
        (el.querySelector(".run-button.run-button--stopped") as HTMLElement)
          .innerHTML
      ).toBe("Play");
      expect(
        Number(
          (
            el.querySelector(
              "input[type='number'].field-size.field-size--width"
            ) as HTMLInputElement
          ).value
        )
      ).toBe(5);
      expect(
        Number(
          (
            el.querySelector(
              "input[type='number'].field-size.field-size--height"
            ) as HTMLInputElement
          ).value
        )
      ).toBe(6);
    });
    it("calls function from .onGameStateChange on control interaction", () => {
      gameView.updateGameState({ isRunning: true, width: 2, height: 1 });
      (
        el.querySelector(".run-button.run-button--runned") as HTMLElement
      ).dispatchEvent(
        new Event("click", {
          bubbles: true,
        })
      );
      expect(onGameStateChange).toHaveBeenCalledWith(false);
      gameView.updateGameState({ isRunning: false, width: 2, height: 1 });
      (
        el.querySelector(".run-button.run-button--stopped") as HTMLElement
      ).dispatchEvent(
        new Event("click", {
          bubbles: true,
        })
      );
      expect(onGameStateChange).toHaveBeenCalledWith(true);
    });
    it("calls onFieldSizeChange on field size change interaction", () => {
      [
        [33, 66],
        [22, 12],
        [1, 2],
      ].forEach(([width, height]) => {
        (
          el.querySelector(
            "input[type='number'].field-size.field-size--width"
          ) as HTMLInputElement
        ).value = `${width}`;
        (
          el.querySelector(
            "input[type='number'].field-size.field-size--height"
          ) as HTMLInputElement
        ).value = `${height}`;
        (
          el.querySelector(
            "input[type='number'].field-size.field-size--width"
          ) as HTMLInputElement
        ).dispatchEvent(
          new Event("change", {
            bubbles: true,
          })
        );
        expect(onFieldSizeChange).toHaveBeenCalledWith(width, height);
      });

      [
        [101, 103],
        [104, 105],
        [106, 107],
      ].forEach(([width, height]) => {
        (
          el.querySelector(
            "input[type='number'].field-size.field-size--width"
          ) as HTMLInputElement
        ).value = `${width}`;
        (
          el.querySelector(
            "input[type='number'].field-size.field-size--height"
          ) as HTMLInputElement
        ).value = `${height}`;
        (
          el.querySelector(
            "input[type='number'].field-size.field-size--height"
          ) as HTMLInputElement
        ).dispatchEvent(
          new Event("change", {
            bubbles: true,
          })
        );
        expect(onFieldSizeChange).toHaveBeenCalledWith(width, height);
      });
    });
  });
});
