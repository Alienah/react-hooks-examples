import React from 'react';
import MyCompExample from './components/MyCompExample';

// $FlowFixMe
import './App.scss';

function App(): Function {

  function onClickHandle() {
    console.log('Clicked')
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Example with PropType</h1>
        <MyCompExample onClick={onClickHandle} str='Hello' obj={{name: "Aida", age: 12}}>
          <div>This is a children</div>
        </MyCompExample>
      </header>
    </div>
  );
}

export default App;