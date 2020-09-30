import React, {useState, useEffect} from 'react';
import Button from './components/Button/Button';

import './App.scss';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reusable components library</h1>
        <Button type="primary">Click me</Button>
        <Button type="secondary">Click me</Button>
        <Button type="disabled">Click me</Button>
      </header>
    </div>
  );
}

export default App;