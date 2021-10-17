import React from 'react';
import { GameNavigator } from './navigation/MainNavigator';
import BoardContextProvider from './context/boardContext';

export default function App() {
  return (
    <BoardContextProvider>
      <GameNavigator />
    </BoardContextProvider>
  );
}


