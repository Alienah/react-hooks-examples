import React from 'react';
import './item.scss';

function item(props) {
  const {item, onClick, editable, onDoubleClick, onKeyPress, index} = props;
  return (
    <div className="item-wrapper">
      <div className="item-info">
        <span className="item-title">Name: </span>
        {editable
        ? <input
            className="item-input"
            type="text" 
            defaultValue={item.name}
            onKeyPress={(e) => onKeyPress(e, index)}/> 
        : <span editable={item.editable} onDoubleClick={onDoubleClick}>{item.name}</span>}
      </div>
      <div className="item-info">
        <span className="item-title">Calories: </span><span>{item.calories}</span>
      </div>
      <button name={item.name} className="remove-btn" onClick={onClick}>Remove</button>
    </div>
  )
}

export default item;