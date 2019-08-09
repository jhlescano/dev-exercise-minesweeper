import React from 'react';
import { GameSession } from '../..';

type Props = {};

class HeaderComponent extends React.Component<Props> {
  public render() {
    return <GameSession>
      {({ cells, gameStatus }) => {
        return <div><div>{gameStatus}</div></div>
      }}
    </GameSession>;
  }
}

export const Header = HeaderComponent;