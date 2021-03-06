import React from 'react';
import { Flag } from '@material-ui/icons';
import './styles.scss';

export enum CellState {
  PRISTINE = 'PRISTINE',
  TOUCHED = 'TOUCHED',
  FLAG = 'FLAG',
  UNSURE = 'UNSURE'
}

export enum CellType {
  BOMB = 'BOMB',
  HINT = 'HINT'
}

export type Cell = {
  x: number,
  y: number,
  state: CellState,
  type: CellType,
  hintCount: number
}

type Props = {
  cell: Cell,
  onClick: () => void,
  onRightClick: () => void
}

export default class CellComponent extends React.Component<Props> {
  public render() {
    const { cell, onClick, onRightClick } = this.props;
    return <td className={`cell ${cell.state} ${cell.state === CellState.TOUCHED ? cell.type + ' h' + cell.hintCount : ''}`} onClick={() => onClick()} onContextMenu={(ev) => {
      ev.preventDefault();
      onRightClick()
    }}>
      {
        cell.state === CellState.FLAG && <Flag className='flag-icon' />
      }
      {
        cell.state === CellState.UNSURE && '?'
      }
      {
        cell.state === CellState.TOUCHED &&
        <React.Fragment>
          { cell.type === CellType.HINT && cell.hintCount !== 0 && cell.hintCount }
        </React.Fragment>
      }
    </td>;
  }
}
