import React from 'react';
import MainScreen from './components/Main';
import PlayerContext from './components/PlayerContext';

function App(): JSX.Element {
  return (
    <PlayerContext>
      <MainScreen />
    </PlayerContext>
  );
}

export default App;
