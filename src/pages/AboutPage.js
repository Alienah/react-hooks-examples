import React, {useContext} from 'react';
import messageContext from '../contexts/messageContext';
import Outer from './components/outer';

function AboutPage() {
  return (
    <div>
      <h1>Welcome about</h1>
      <h2>Message: {useContext(messageContext)}</h2>
      <Outer></Outer>
    </div>
  )
}

export default AboutPage;