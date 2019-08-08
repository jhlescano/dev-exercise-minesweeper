import React from 'react';
import { Cell, CellState, CellType } from './components/Board/components/Cell';
import { Board } from './components/Board';
import './styles.css';

enum GameStatus {
  PLAYING = 'PLAYING',
  LOST = 'LOST',
  WIN = 'WIN'
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
      <Board onCellClick={(x, y) => { console.log('click on cell '+ x + y) }} />
    </GameSessionContext.Provider>;
  }

  // Private Methods
  private initGameState(): GameState {
    const cells = this.getCells();

    const bombCells = this.setRandomBombs(cells);

    console.log('CELLS', cells);
    console.log('BOMBS', bombCells);

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
    }

    return this.setRandomBombs(cells, bombs);
  }
}

export const GameBoard = GameBoardComponent;