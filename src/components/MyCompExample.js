import React from 'react';

function MyCompExample({str, onClick, obj}) {
  console.log(obj)
  return <div onClick={onClick}>{str}</div>
}

export default MyCompExample;