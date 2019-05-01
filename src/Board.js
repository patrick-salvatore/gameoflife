import React, { Component } from 'react'
import Cell from './Cell';

const CELL = 20;
const w = 800; 
const h = 600;

export default class Board extends Component {
    constructor() {
        super();
        this.rows = h / CELL;
        this.cols = w/ CELL;
        this.board = this.emptyBoard(); 
    }

    state = {
        cells: [], 
        isActive: false, 
        runTime: 100
    }

    // BOARD HANDLERS
    handleRandom = () => {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          this.board[y][x] = (Math.random() >= 0.75);
        }
      }

      this.setState({ cells: this.generateCells() });
    }

    handleClear = () => {
      this.board = this.emptyBoard();
      this.setState({ cells: this.generateCells() });
    }

    gameHandler = () => {
      this.setState({isActive: !this.state.isActive})
      this.run();
    }

    stopGame = () => {
      this.setState({ isActive: false });
      if (this.timeoutHandler) {
        window.clearTimeout(this.timeoutHandler);
        this.timeoutHandler = null;
      }
    }

    runTimeHandler = (e) => {
      this.setState({runTime: e.target.value})
    }

    emptyBoard = () => {
        let board = [];
        for (let y = 0; y < this.rows; y++ ) {
            board[y] = []
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

    generateCells = () => {
      let cells = [];
      for (let y = 0; y < this.rows; y++ ) {
          for (let x = 0; x < this.cols; x++) {
              if (this.board[y][x]) {
                  cells.push({y,x})
              }
          }
      }
      return cells;
    }

    calcNeighbors = (board, x, y) => {
      let neighbors = 0;
      let options = [[0,-1], [-1,1], [0,1], [1,1], [0,1], [1,-1]];

        for (let i = 0; i < options.length; i++) {
          let opt = options[i];
          let y1 = y + opt[0];
          let x1 = x + opt[1];

          if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
            neighbors++;
          }
          return neighbors
        }
    }

    run = () => {
      let newBoard = this.emptyBoard();

      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          let neighbors = this.calcNeighbors(this.board, x, y);
          
          if (this.board[y][x]) {
            if (neighbors === 2 || neighbors === 3) {
              newBoard[y][x] = true;
            } else {
              newBoard[y][x] = false;
              }
          } else {
              if (!this.board[y][x] && neighbors === 3) {
                newBoard[y][x] = true;
              }
          }
        }
      }

      this.board = newBoard;
      this.setState({cells: this.generateCells()});

      this.timeoutHandler = window.setTimeout(() => {
        this.run();
      }, this.state.runTime);
    }
    

  render() {
      const {cells} = this.state
    return (
      <div>
        <div 
            className='board' 
            style={{width: w, height: h, backgroundSize: `${CELL}px ${CELL}px`}}
            ref={(n) => {this.boardRef = n}}
            >
            {cells.map(cell=> (
                <Cell x ={cell.x} y= {cell.y} cellsize={CELL} key = {`${cell.x}, ${cell.y}`}/>
            ))}
        </div>
        <div className='controller'>
          Update Interval (ms): <input value={this.state.runTime} onChange={this.runTimeHandler}></input>     
          {this.state.isActive ? <button name='stop' value = 'stop' onClick={this.stopGame}>Stop</button> : 
          <button name='run' value = 'run' onClick={this.gameHandler}>Run</button>}
          <button name='random' value = 'random' onClick={this.handleRandom}>Random</button>
          <button name='clear' value = 'clear' onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    )
  }
}
