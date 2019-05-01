import React, { Component } from 'react'


export default class Cell extends Component {
  render() {
      const {x, y, cellsize} = this.props;

    return (
      <div className = 'cell' 
        style = {{
            left: `${cellsize * x + 1}px`,
            top: `${cellsize * y + 1}px`,
            width: `${cellsize - 1}px`,
            height: `${cellsize - 1}px`,
        }}>
      </div>
    )
  }
}
