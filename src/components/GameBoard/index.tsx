import React from 'react';
import { Cell, CellState, CellType } from './components/Board/components/Cell';
import { Board } from './components/Board';
import { Header } from './components/Header';
import './styles.css';

export enum GameStatus {
  PLAYING = 'PLAYING',
  LOST = 'LOST',
  WIN = 'WIN'
}

type Coord = {
  x: number,
  y: number
}

type Cells = {
  [xy: string]: Cell
}

type GameState = {
  cells: Cells,
  gameStatus: GameStatus,
  bombCells: string[]
}

const GameSessionContext = React.createContext<GameState>({
  cells: {},
  gameStatus: GameStatus.PLAYING,
  bombCells: []
});

export const GameSession = GameSessionContext.Consumer;

class GameBoardComponent extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = this.initGameState();
  }

  public render() {
    return <GameSessionContext.Provider value={this.state}>
      <div>MINESWEEPER</div>
      <Header onRestartClick={this.restartGame} />
      <Board onCellClick={this.onCellClick} onCellRightClick={this.onCellRightClick} />
    </GameSessionContext.Provider>;
  }

  // Private Methods
  private initGameState(): GameState {
    const cells = this.getCells();

    const bombCells = this.setRandomBombs(cells);

    return {
      cells,
      gameStatus: GameStatus.PLAYING,
      bombCells
    };
  }

  private getCells(): Cells {
    const cells: Cells = {};
    // Initialize the Cells dictionary for the game.
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const index = '' + i + j;
        cells[index] = {
          x: i,
          y: j,
          state: CellState.PRISTINE,
          type: CellType.HINT,
          hintCount: 0
        };
      }
    }

    return cells;
  }

  private setRandomBombs(cells: Cells, bombs: string[] = []): string[] {
    /*
      select random row
      select random column
      if that cell is already a bomb -> repeat
      else set cell as bomb
      repeat until bombs.length = 10
    */
    if (bombs.length === 10) return bombs;

    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const index = ''+x+y;

    if (!(cells[index] && cells[index].type === CellType.BOMB)) {
      bombs.push(index);
      cells[index].type = CellType.BOMB;

      // update all adjacent cells
      const aIndexes = this.gerAdjacentIndexes(x, y) as string[];

      aIndexes.forEach((aIndex) => {
        this.increaseBombHintCount(cells, aIndex);
      });

      
    }

    return this.setRandomBombs(cells, bombs);
  }

  private gerAdjacentIndexes(x: number, y: number, asObject?: boolean): string[] | Coord[] {
    // generates an array of all the adjacent cell indexes for the coord x+y
    const aIndexesC: Coord[] = [];
    const aIndexesS: string[] = [];

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i !== 0 || j !== 0) {
          const a = x + i;
          const b = y + j;

          if (a < 0 || a > 9 || b < 0 || b > 9) continue;

          if (asObject)
            aIndexesC.push({ x: a, y: b });
          else
            aIndexesS.push(''+ a + b);
        }
        
      }
    }

    return (asObject) ? aIndexesC : aIndexesS;
  }

  private increaseBombHintCount(cells: Cells, index: string) {
    // Increases in 1 the hint counter of the adjacents cells in the coord x+y
    if (cells[index] && cells[index].type === CellType.HINT) {
      cells[index].hintCount = cells[index].hintCount + 1;
    }
  }

  private onCellClick = (x: number, y: number) => {
    console.log('click on cell '+ x + y);

    const { cells, gameStatus } = this.state;
    const index = ''+x+y;

    if (!(cells[index] && cells[index].state === CellState.PRISTINE) || gameStatus !== GameStatus.PLAYING) return;

    const newCells = {...this.state.cells};

    newCells[index].state = CellState.TOUCHED;
    //if the touched cell is a bomb, end the game
    let newStatus: GameStatus = gameStatus;
    if (newCells[index].type === CellType.BOMB) {
      newStatus = GameStatus.LOST
    }

    if (cells[index].type === CellType.HINT && cells[index].hintCount === 0) { // if empty hint cell repeat click for every adjacent cell
      const aIndexes = this.gerAdjacentIndexes(x, y, true) as Coord[];

      aIndexes.forEach((aIndex) => {
        this.onCellClick(aIndex.x, aIndex.y);
      });
    }

    this.setState({
      cells: newCells,
      gameStatus: newStatus
    }, this.evalWinCondition);
  }

  private onCellRightClick = (x: number, y: number) => {
    console.log('right click on cell '+ x + y);

    const { cells, gameStatus } = this.state;
    const index = ''+x+y;

    if (!(cells[index] && cells[index].state !== CellState.TOUCHED) || gameStatus !== GameStatus.PLAYING) return;

    const newCells = {...this.state.cells};

    switch (newCells[index].state) {
      case CellState.FLAG: {
        newCells[index].state = CellState.UNSURE;
        break;
      }
      case CellState.UNSURE: {
        newCells[index].state = CellState.PRISTINE;
        break;
      }
      default: {
        newCells[index].state = CellState.FLAG;
        break;
      }
    }

    this.setState({
      cells: newCells
    }, this.evalWinCondition);
  }

  private evalWinCondition () {
    // Evaluate the state of the board to calculate if the game should end.
    const { cells, gameStatus } = this.state;

    if (gameStatus !== GameStatus.PLAYING) return;

    /**
     * WIN Condition: all cells must have TOUCHED state except for the bomb cells, wich must have the FLAG state
     */

    const cellsValues = Object.values(cells);

    for (let i = 0; i < cellsValues.length; i++) {
      let cell = cellsValues[i];

      if (cell.state === CellState.PRISTINE) return; // if there is one untouched cell, continue the game
      if (cell.type === CellType.BOMB && cell.state !== CellState.FLAG) return; // if not all bombs are flaged, continue the game
    }

    this.setState({
      gameStatus: GameStatus.WIN
    });
  }

  private restartGame = () => {
    this.setState(this.initGameState());
  }
}

export const GameBoard = GameBoardComponent;