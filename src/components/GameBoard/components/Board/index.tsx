import React from 'react';
import { GameSession } from '../../';
import CellComponent from './components/Cell';

import './styles.scss';

type BoardProps = {
  onCellClick: (x:number, y: number) => void
}

class BoardComponent extends React.Component<BoardProps> {

  public render() {
    const { onCellClick } = this.props;

    return <GameSession>
      {({ cells }) => {
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < 10; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 10; j++) {
            children.push(<CellComponent key={''+i+j} cell={cells[''+i+j]} onClick={() => { onCellClick(i,j); }}/>);
          }
          //Create the parent and add the children
          table.push(<tr key={''+i}>{children}</tr>)
        }

        return <table className='board'>
          <tbody>
            {table}
          </tbody>
        </table>;
      }}
    </GameSession>
  }
}

export const Board = BoardComponent;