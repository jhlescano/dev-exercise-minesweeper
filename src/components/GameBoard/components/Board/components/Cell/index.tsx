import React from 'react';
// import { ButtonBase } from '@material-ui/core';
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
    return <td className={`cell ${cell.state} ${cell.state === CellState.TOUCHED ? cell.type : ''}`} onClick={() => onClick()} onContextMenu={(ev) => {
      ev.preventDefault();
      onRightClick()
    }}>
      {
        cell.state === CellState.FLAG && 'FLAG'
      }
      {
        cell.state === CellState.UNSURE && '?'
      }
      {
        cell.state === CellState.TOUCHED &&
        <React.Fragment>
          { cell.type === CellType.HINT && cell.hintCount !== 0 && cell.hintCount }
          { cell.type === CellType.BOMB && <React.Fragment>BOMB</React.Fragment>}
        </React.Fragment>
      }
    </td>;
  }
}

