import React, {useContext} from 'react';
import messageContext from '../contexts/messageContext'

function HomePage() {
  return (
    <div>
      <h1>Welcome to Homepage</h1>
      <h2>Message: {useContext(messageContext)}</h2>
    </div>
  )
}

export default HomePage;