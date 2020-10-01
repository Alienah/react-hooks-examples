import React from 'react';
import MyExampleComp from './components/MyExampleComp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Example with typescript</h1>
        <MyExampleComp name="Aida" gender="F"></MyExampleComp>
      </header>
    </div>
  );
}

export default App;
