import React from 'react';
import { GameSession, GameStatus } from '../..';
import { IconButton } from '@material-ui/core';
import { SentimentSatisfiedAltOutlined, SentimentVeryDissatisfiedOutlined, SentimentVerySatisfiedOutlined, FlagOutlined } from '@material-ui/icons';

import './styles.scss';
import { CellState } from '../Board/components/Cell';
import { TimerDisplay }  from './components/TimerDisplay';

type Props = {
  onRestartClick?: () => void
};

class HeaderComponent extends React.Component<Props> {
  public render() {
    return <GameSession>
      {({ cells, gameStatus, bombCells }) => {
        const flagedCount = Object.values(cells).filter((cell) => cell.state === CellState.FLAG).length;
        const bombsCount = bombCells.length - flagedCount;

        const { onRestartClick } = this.props;

        return <div className='header'>
          <div className='bomb-counter'>
            <div className='count'>{bombsCount}</div>
            <FlagOutlined />
          </div>
          <div className='state-display'>
            <IconButton color='inherit' style={{ fontSize: 'inherit' }} onClick={onRestartClick}>
              { (gameStatus === GameStatus.PLAYING || gameStatus === GameStatus.PAUSED) && <SentimentSatisfiedAltOutlined fontSize='inherit' /> }
              { gameStatus === GameStatus.WIN && <SentimentVerySatisfiedOutlined fontSize='inherit' /> }
              { gameStatus === GameStatus.LOST && <SentimentVeryDissatisfiedOutlined fontSize='inherit' /> }
            </IconButton>
          </div>
          <TimerDisplay state={(gameStatus === GameStatus.PLAYING) ? 'run' : (gameStatus !== GameStatus.PAUSED) ? 'stop' : 'clear'} />
        </div>
      }}
    </GameSession>;
  }
}

export const Header = HeaderComponent;