import React, { ChangeEvent, useState } from 'react';
import './App.css';

type ListType = {
  x: number,
  y: number
}
 


const App = () => {

  const [list, setList] = useState<ListType[]>([]);
  const [undid, setUndid] = useState<ListType[]>([]);

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

    if(list.length === 0) {
      return;
    }

    const lastItem = list[list.length -1];
    setUndid((prev) => [...prev, lastItem])

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
     
    })
  }

  const handleRedo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if(undid.length === 0) {
      return;
    }

    const recoveredDot = undid[undid.length -1];

    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList((prev) => [...prev, recoveredDot]);

  }

  return (
    <div id='page' onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map((item, index) => (
        <span className='dot' key={index} style={{left: item.x, top: item.y }} />
      ))}
      
    </div>
  )
}

export default App;