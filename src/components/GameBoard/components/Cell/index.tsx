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

