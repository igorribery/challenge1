import React, { useState } from 'react';
import './App.css';

type State = {
  x: number,
  y: number
}


const App = () => {

  const [list, setList] = useState<State[]>([]);
  const [undid, setUndid] = useState<State[]>([]);

 
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {

    const newDot = {
      x: e.clientX,
      y: e.clientY
    }
    setList((prev) => [...prev, newDot]);
    setUndid([]);    
  }

  const handleUndo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const lastItem = list[list.length - 1];

    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => [...prev].slice(0, -1));

  }

  const handleRedo = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if(undid.length === 0) {
        return;
      }

      const recoveryDot = undid[undid.length -1];

      setList((prev) => [...prev, recoveryDot]);

      setUndid((prev) => [...prev].slice(0, -1));

  }

  return (
    <div id='page' onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map((item, index) => (
        <span key={index} className='dot' style={{left: item.x, top: item.y}}></span>
      ))}
      
    </div>
  )
}

export default App;