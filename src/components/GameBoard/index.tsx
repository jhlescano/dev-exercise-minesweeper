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
  [xy: string]: Cell;
}

type GameState = {
  cells: Cells
  gameStatus: GameStatus
}

const GameSessionContext = React.createContext<GameState>({
  cells: {},
  gameStatus: GameStatus.PLAYING
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

    console.log('CELLS', cells);

    return {
      cells,
      gameStatus: GameStatus.PLAYING
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
}

export const GameBoard = GameBoardComponent;