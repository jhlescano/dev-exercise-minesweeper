import React from 'react';
import './App.css';

import { GameBoard } from './components/GameBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <GameBoard></GameBoard>
    </div>
  );
}

export default App;
