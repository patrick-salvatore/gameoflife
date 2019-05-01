import React from 'react';
import './App.css';
import Board from './Board'



function App() {
  return (
    <div className="App">
      <h2 style = {{textAlign: 'center'}}>Conway's Game of Life</h2>
      <Board/>
    </div>
  );
}

export default App;
