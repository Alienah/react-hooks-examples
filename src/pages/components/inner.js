import React, {useContext} from 'react';
import messageContext from '../../contexts/messageContext';

function Inner() {
  const [message, setMessage] = useContext(messageContext);
  return (
    <>
      <h3>Inner</h3>
      <button onClick={() => { setMessage(Math.random().toString())}}>Change Message</button>
    </>
  )
}

export default Inner;