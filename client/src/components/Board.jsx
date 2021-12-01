import React from 'react';
import Square from '../components/Square'


export default function Board(props){

    return (
      <div className="board">
        {props.squares.map((square,index) => {
          return <div key={index} className="square-container">
            <Square value={square} onClick={() => {
              props.onClick(index);
            }}></Square>
        </div>
        })}
       
      </div>
    );
  
}

