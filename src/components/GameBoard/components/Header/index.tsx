import React from 'react';
import { GameSession, GameStatus } from '../..';
import { IconButton } from '@material-ui/core';
import { SentimentSatisfiedAltOutlined, SentimentVeryDissatisfiedOutlined, SentimentVerySatisfiedOutlined, FlagOutlined } from '@material-ui/icons';

import './styles.scss';
import { CellState } from '../Board/components/Cell';

type Props = {
  onRestartClick?: () => void
};

class HeaderComponent extends React.Component<Props> {
  public render() {
    return <GameSession>
      {({ cells, gameStatus, bombCells }) => {
        const flagedCount = Object.values(cells).filter((cell) => cell.state === CellState.FLAG).length;
        const bombsCount = bombCells.length - flagedCount;

        return <div className='header'>
          <div className='bomb-counter'>
            <div className='count'>{bombsCount}</div>
            <FlagOutlined />
          </div>
          <div className='state-display'>
            <IconButton centerRipple color='inherit'>
              { gameStatus === GameStatus.PLAYING && <SentimentSatisfiedAltOutlined fontSize='large' /> }
              { gameStatus === GameStatus.WIN && <SentimentVerySatisfiedOutlined fontSize='large' /> }
              { gameStatus === GameStatus.LOST && <SentimentVeryDissatisfiedOutlined fontSize='large' /> }
            </IconButton>
          </div>
          <div className='timer'></div>
        </div>
      }}
    </GameSession>;
  }
}

export const Header = HeaderComponent;