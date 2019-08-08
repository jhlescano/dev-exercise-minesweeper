import React from 'react';
import { Cell, CellState, CellType } from './components/Cell';
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

class GameBoardComponent extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = this.initGameState();
  }

  public render() {
    return <GameSessionContext.Provider value={this.state}>
      <div>GAME BOARD</div>
    </GameSessionContext.Provider>;
  }

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