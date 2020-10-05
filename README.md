ℹ️ This documentation is written in Spanish, as learning notes. For more information on how to start the project and what commands can be used, you can consult the documentation provided by React at [doc folder](/doc)

# 📝 REACT TESTING

## TYPE OF TESTS

### UNIT TESTS

* **Jest**

Viene incluido con create-react-app

* **Jest + enzime**

Con enzime tienes disponible una manera fácil de navegar a través del dom para hacer las comprobaciones

* **Jest + react-testing-library**

```npm install @testing-library/jest-dom --save-dev```
```npm install @testing-library/react --save-dev```

Sirve para testear los componentes tal como los usaría el usuario final.

### SNAPSHOTS

```npm i react-test-renderer --save-dev```

tenemos que crear una carpeta en components o dentro de la carpeta del componente una carpeta llamada __ snapshots __ y ahí se alojarán los snapshots.

```js
import React from 'react';

//Snapshot
import ReactTestRenderer from 'react-test-renderer';

afterEach(cleanup);

// Snapshop testing
it('matches snapshop', () => {
  // Esto creará un objeto. primero crea en el dom y luego lo transformamos a JSON
  const tree = ReactTestRenderer.create(<Button label="save"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
})
```

Para actualizar snapshot:

En las opciones que tiene el watch del testing, la opción "u"

### ACCEPTANCE TESTS

Es la fase final del testing donde se comprueba que cumple con los criterios de aceptación, para lo cual serán test en los que se integren varios de esos criterios. Estos test se harán en un entorno previo a producción.

* Cypress

* Jest + Puppeteer

* Bigtest

* TestCafe

### END2END TESTS

Comprueban flujos de nuestra aplicación, es decir, desde que comienza hast que acaba.

Test en un entorno real, en el navegador

* Cypress

* Jest + Puppeteer

* Selenium

## UNIT TEST con jest Y react test renderer

Vamos a estructurar los componentes por carpetas y dentro de la carpeta del componente habrá una carpeta llamada "__ test __" en la que estará el test de mi componente con una extensión así: ```component.test.js```

Vamos a ver ejemplos de test para este componente:

```js
//Button.js

import React from 'react';
import './button.scss';

function button({label}) {
  return <div data-testid="button" className="button">{label}</div>
}

export default button;
```

```js
// App.js

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
```

Y ahora varios ejemplos de test con diferentes librerías:

```js
// button.test.js

import React from 'react';
//Para renderizar el dom en el test
import ReactDOM from 'react-dom';
import Button from './../button';

//Otra render diferente, pues es otra librería
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

//Snapshot
import ReactTestRenderer from 'react-test-renderer';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button></Button>, div);
})

it('renders button correctly', () => {
  // Este es el render de la librería react testing library y devuelve varias cosas, una es el método getByTestId
  const {getByTestId} = render(<Button label="click me"></Button>)
  expect(getByTestId('button')).toHaveTextContent('click me');;
})

it('renders button correctly', () => {
  // Otro test con otro texto
  const {getByTestId} = render(<Button label="save"></Button>)
  expect(getByTestId('button')).toHaveTextContent('save');;
})

// Snapshop testing
it('matches snapshop', () => {
  // Esto creará un objeto. primero crea en el dom y luego lo transformamos a JSON
  const tree = ReactTestRenderer.create(<Button label="save"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
})

it('matches snapshop with another text', () => {
  const tree = ReactTestRenderer.create(<Button label="click"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
})
```