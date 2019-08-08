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
  onClick: () => void
}

export default class CellComponent extends React.Component<Props> {
  public render() {
    const { cell, onClick } = this.props;
    return <td className={`cell ${cell.type} ${cell.state}`} onClick={() => onClick()}>
      { cell.type === CellType.HINT && cell.hintCount !== 0 && cell.hintCount }
      { cell.type === CellType.BOMB && <React.Fragment>BOMB</React.Fragment>}
    </td>;
  }
}

