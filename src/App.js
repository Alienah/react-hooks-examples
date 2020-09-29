import React, {useReducer} from 'react';
import Button from "./components/button/button";

import './App.scss';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Example for testing</h1>
        <Button label="Click me please"></Button>
      </header>
    </div>
  );
}

export default App;