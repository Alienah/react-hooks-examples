import React, {useState, useEffect} from 'react';

import './App.scss';

const initList = [1,2,3,4,5,6];

function App() {
  const [list, setList] = useState(initList);
  const [draggedItem, setDraggedItem] = useState(null);

  // useEffect(() => {
  //   setList
  // })

  function onDragHandle(e, index) {
    setDraggedItem(list[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 10, 10);
    console.log('hola', e.dataTransfer.effectAllowed)
  }

  function onDropHandle(index) {
    const draggedOverItem = list[index];

    if(draggedOverItem === draggedItem) {
      return;
    }

    const items = list.filter((item) => item !== draggedItem)

    // splice: 
    // primer parámetro, el index a partir del cual va a insertar lo que sea, 
    // segundo parámetro: 0 no elimina nada, solo añade, 1 sustituye
    // tercer parámetro: elemento a añadir
    items.splice(index, 0, draggedItem);
    setList(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag and drop list</h1>
        <ul className="list">
          {
          list.map((item, i) => (
            <li className="item" onDragOver={(e) => onDropHandle(i)}>
              <div draggable onDragStart={(e) => onDragHandle(e, i)}>{item}</div>
            </li>
          ))
          }
        </ul>
      </header>
    </div>
  );
}

export default App;