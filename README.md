ℹ️ This documentation is written in Spanish, as learning notes. For more information on how to start the project and what commands can be used, you can consult the documentation provided by React at [doc folder](/doc)

# 📝 REDUX. Global state management

A veces necesito que un estado se extienda a todas las vistas de mi aplicación por lo que necesitamos una manera de controlar los estados de un modo global.

Imagina que tenemos una aplicación de una cuenta bancaria y tenemos varias vistas enlas que se ve el balance, si cambio en una de ellas el balance haciendo un depósito porque lo transfiero, por ejemplo, debería actualizarse en el resto de vistas y todas contener la misma cantidad de balance.

Hemos visto que el hook useState controla el estado, de a nivel de componente, así que está limitado a ese componente y no podemos acceder desde fuera.

Redux nos ofrece la solución, de manera que vamos a tener controlado los estados de una forma sistemática.

Así que instalaremos:

```
npm install redux react-redux  --save
```

## Cómo funciona

A grandes rasgos tenemos:

* La UI: En las vistas haré click por ejemplo para aumentar la cantidad del balance (que actualmente es 0), pero no es la vista la que se encargar de actualizar el estado, sino que envía un mensaje ```{"deposit": 5}``` que lo recibe... ==>

* Reducers: Estos reciben el mensaje y mandan la orden de actualizar el estado, el cual se alojará en ==>

* Global Store: El estado global ```state: {balance: 0}```

## Ejemplo con un reducer

👩‍💻 _Para probar los ejemplos aquí explicados, puedes lanzar ```npm i``` en esta para instalar las dependencias y ```npm start``` para abrir en el browser el proyecto._

Partiendo de esta aplicación con tres páginas **Home**, **Deposit** y **Withdraw**:

```js
// App.js

import React, {useState} from 'react';
import { 
  BrowserRouter, 
  Route,
  NavLink,
} from 'react-router-dom';
import HomeBankPage from './pages/HomeBankPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                className="App-link"
                to="/"
                exact
                activeClassName="link-active"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="App-link"
                to="/deposit"
                exact
                activeClassName="link-active"
              >
                Make deposit Page
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="App-link"
                to="/withdraw"
                exact
                activeClassName="link-active"
              >
                Withdraw Page
              </NavLink>
            </li>
          </ul>
          <Route path="/" exact component={HomeBankPage}/>
          <Route path="/deposit" exact component={DepositPage}/>
          <Route path="/withdraw" exact component={WithdrawPage}/>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

```js
// Home

import React from 'react';

function HomeBankPage() {
  return (
    <div>
      <h1>Welcome to Homepage</h1>
    </div>
  )
}

export default HomeBankPage;
```

```js
// Deposit

import React from 'react';

function DepositPage() {
  return (
    <div>
      <h1>Welcome to DepositPage</h1>
    </div>
  )
}

export default DepositPage;
```

```js
// Withdraw

import React from 'react';

function WithdrawPage() {
  return (
    <div>
      <h1>Welcome to WithdrawPage</h1>
    </div>
  )
}

export default WithdrawPage;
```

Empezaríamos creando una carpeta en src llamada ```store```, en la cual vamos a crear un archivo llamado **```reducer.js```**, en el que vamos a construir todos los reducers.

Tendríamos un estado inicial

```js
// reducer.js

const initialState = {
  balance: 0
};

// La función va a recibir dos parámetros: el estado inicial y la acción
function reducer(state=initialState, action)  {
  // La acción va a tener dos cosas: el tipo (como por ejemplo deposit o withdraw) y el payload (el valor, que en este caso sería la cantidad que depositamos o que retiramos)
  switch(action.type) {
    //Nunca se debe modificar el state directamente, sino que creamos copias
    case 'DEPOSIT' : return { balance: state.balance + action.payload}
    case 'WITHDRAW' : return { balance: state.balance + action.payload}
    default: return state
  }
}

export default reducer;
```

Para usarlo antes tenemos que introducir redux en nuestra aplicación, con lo que nos iremos al index.js e importaremos nuestro reducer, al igual que varias herramientas de redux y react-redux:

**createStore**: Que nos permite crear nuestro store
**Provider**: Para poder usar redux con React. Porque redux por sí solo podría funcionar en cualquier framework, pero para usarlo en React necesitamos react-redux, y en concreto esta herramienta.

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import reducer from './store/reducer';
import {Provider} from 'react-redux';

// Creamos nuestra store usando el reducer que hemos creado
const store = createStore(reducer);

// Englobamos la aplicación dentro del Provider
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

Una vez hecho esto, ya tenemos el store de manera global, lo único que hay quehacer es introducirlo en las páginas:

1. En la home sólo queremos mostrar el balance:

```js
// home

import React from 'react';
import {useSelector} from 'react-redux';

function HomeBankPage() {
  //Usamos el hook useSelector porque no queremos mostrar todo el estado en nuestra página, sino sólo el banace
  const balance = useSelector(state => state.balance)
  return (
    <div>
      <h1>Welcome to Homepage</h1>
      <p>Balance is {balance}</p>
    </div>
  )
}

export default HomeBankPage;
```

2. En depositPage además de mostrar el balance, también lanzaremos una acción de depositar

```js
// depositPage.js

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function DepositPage() {
  const balance = useSelector(state => state.balance);
  const dispatch = useDispatch();

  // Al hacer click lanzamos la acción con el tipo y el valor
  function depositHandle() {
    dispatch({
      type: "DEPOSIT",
      payload: 10
    })
  }
  return (
    <div>
      <h1>Welcome to DepositPage</h1>
      <p>Balance is {balance}</p>
      <button onClick={depositHandle}>Deposit</button>
    </div>
  )
}

export default DepositPage;
```

3. Y en withdrawPage, además de mostrar el balance, al hacer click lanzaremos la acción de retirar dinero

```js
// withdrawPage.js

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function WithdrawPage() {
  const balance = useSelector(state => state.balance);
  const dispatch = useDispatch();
  function withdrawHandle() {
    dispatch({
      type: "DEPOSIT",
      payload: -10
    })
  }
  return (
    <div>
      <h1>Welcome to WithdrawPage</h1>
      <p>Balance is {balance}</p>
      <button onClick={withdrawHandle}>Withdraw</button>
    </div>
  )
}

export default WithdrawPage;
```

## Combinar varios reducers

Como solo puedes introducir un reducer al crear el store en index.js hay que conseguir combinar los reducers de tu aplicación, ya que normalmente no vas a tener solo uno, sino uno para cada funcionalidad o estado.

Partiendo de nuestro ejemplo anterior, vamos a crear en la home page un botón que solicite un préstamo

Creamos en nuevo reducer:

```js
// loanReducer.js

const initialState = {
  loan: false
};

function loanReducer(state=initialState, action)  {
  switch(action.type) {
    case 'APPLY' : return { loan: true }
    default: return state
  }
}

export default loanReducer;
```

Renombramos el que teníamos a ```balanceReducer.js```

Y en el index, los combinamos con la herramienta de redux ```combineReducers```:

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers} from 'redux';
import balanceReducer from './store/balanceReducer';
import loanReducer from './store/loanReducer';
import {Provider} from 'react-redux';

// La usamos aquí, lo que hacemos espasar un objeto con los reducers
const store = createStore(combineReducers({
  balanceReducer,
  loanReducer
}));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

Como al método combineReducers le pasamos un objeto, ahora hay que modificar los objetos desde donde se accedía al estado:

Es decir, donde antes poníamos 

```js
  const balance = useSelector(state => state.balance)
```

Ahora tendríamos que poner

```js
  const balance = useSelector(state => state.balanceReducer.balance)
```

Y ahora ya podemos usar nuestro nuevo reducer del préstamo ```loanReducer``` en, por ejemplo, la página home:

```js
// home

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function HomeBankPage() {
  const balance = useSelector(state => state.balanceReducer.balance);
  const loan = useSelector(state => state.loanReducer.loan);
  const dispatch = useDispatch();

  function applyLoanHandle() {
    dispatch({
      type: 'APPLY'
    })
  }
  return (
    <div>
      <h1>Welcome to Homepage</h1>
      <p>Balance is {balance}</p>
      <h2>{loan ? 'Loan Applied' : 'Loan needed'}</h2>
      <button 
        onClick={applyLoanHandle}
        disabled={loan ? true : false}
      >{loan ? 'Loan applied' : 'Apply for loan'}</button>
    </div>
  )
}

export default HomeBankPage;
```

Y podríamos acceder a ese estado desde cualquier otra página. Aquí hemos introducido el estado de "loan":

```js
// depositpage.js

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function DepositPage() {
  const balance = useSelector(state => state.balanceReducer.balance);
  const loan = useSelector(state => state.loanReducer.loan);
  const dispatch = useDispatch();
  function depositHandle() {
    dispatch({
      type: "DEPOSIT",
      payload: 10
    })
  }
  return (
    <div>
      <h1>Welcome to DepositPage</h1>
      <p>Balance is {balance}</p>
      <button onClick={depositHandle}>Deposit</button>
      <h2>{loan ? 'Loan Applied' : 'Loan needed'}</h2>
    </div>
  )
}

export default DepositPage;
```

## REDUX THUNK

Redux thunk es un middleware, es decir, que actúa de intermediario entre dos sistemas.

Lo que habíamos hecho hasta ahora era crear un reducer que recibe una acción, la acción se dispara desde la página de depósito, por ejemplo, y automáticamente se modifica la cantidad del balance.

Pero normalmente en una aplicación real seguramente tengamos hacer cosas entre medias, es decir, cuando hacer click en el botón para hacer un depósito, se tendrá que hacer uana llamada a una api o hacer una petición post, esperar el resultado de la petición y , si es positiva, realizar la acción de cambiar el estado, pero si es negativa, no lo hará, ya que no sería real lo que vemos en el UI a lo que ha sucedido en realidad (no hemos podido hacer el depósito).

### Instalación

Para poder interceptar eso, podemos usar Redux thunk, así que el primer paso es la instalación:

```
npm install redux-thunk  --save
```

### Cómo se usa

En el index.js habrá que importar dos herramientas nuevas:

* __applyMiddleware__: de redux
* __thunk__: de redux-thunk

```js
// index.js

import {createStore, combineReducers, applyMiddleware} from 'redux';
import balanceReducer from './store/balanceReducer';
import loanReducer from './store/loanReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

// createStore ahora recibe dos parámetros, el primero es para los reducer y el segundo para los middleware
const store = createStore(
  combineReducers({
    balanceReducer,
    loanReducer
  }),
  // Intsrucimos este nuevo parámetro que sirve para aplicar middlewares y usamos thunk como argumento
  applyMiddleware(thunk)
);

//...
```

Lo siguiente que haremos será crear la acción que va a actuar de intermediario. Para ello, crearemos otra carpeta en src, llamada ```actions``` y allí iremos introduciendo nuestros archivos para las actions. Ahora como ejemplo crearemos el archivo ```balanceActions.js```.

```js
// balanceActions.js

export function deposit() {
  return ({
    type: "DEPOSIT",
    payload: 10
  })
}

//Creamos una función asíncrona, envez del setTimeout podría ser una petición
export function depositAsync() {
  return (dispatch) => {
    setTimeout(()=> {
      dispatch(deposit());
    }, 5000)
  }
}
```

Y en la página que hace la llamada, en vez de llamar con el dispatch directamente con el action concreto, llamaríamos a la función asíncrona, para que haga lo que tenga que hacer y, en caso de éxito, ésta llamaría a su vez a la función que ejecuta la acción

```js
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
// Estoy importando todas las funciones de nalanceActions
import * as balanceActions from '../actions/balanceActions';

function DepositPage() {
  const balance = useSelector(state => state.balanceReducer.balance);
  const loan = useSelector(state => state.loanReducer.loan);
  const dispatch = useDispatch();
  function onDepositHandle() {
    // En vez de dispatch({ type: "DEPOSIT", payload: 10 })
    dispatch(balanceActions.depositAsync());
  }
  return (
    <div>
      <h1>Welcome to DepositPage</h1>
      <p>Balance is {balance}</p>
      <button onClick={onDepositHandle}>Deposit</button>
      <h2>{loan ? 'Loan Applied' : 'Loan needed'}</h2>
    </div>
  )
}

export default DepositPage;
```

Ahora mismo, si hacemos click en ```deposit```, esperará 5 segundos y depués ejecuta la acción. Sin embargo el usuario no tiene manera de saber qué está pasando en esos 5 segundos y puede resultar confuso.

Así que vamos a añadir un indicador loading.

Para ellos, añadimos un nuevo caso para el balanceReducer

```js
// balanceReducer.js

const initialState = {
  balance: 0,
  // nuevo estado
  loading: false,
};

function balanceReducer(state=initialState, action)  {
  switch(action.type) {
    case 'DEPOSIT' : return { balance: state.balance + action.payload, loading: false}
    case 'WITHDRAW' : return { balance: state.balance + action.payload, loading: false}
    // En el nueva action convertimos a true el nuevo estado loading. En los otros casos es false
    case 'LOADING' : return { ...state, loading: true}
    default: return state
  }
}

export default balanceReducer;
```

En las actions, añadiríamos una nueva action que manda ese tipo 'LOADING':

```js
// balanceActions.js

export function loading() {
  return {
    type: 'LOADING'
  }
}

export function deposit() {
  return ({
    type: "DEPOSIT",
    payload: 10
  })
}

export function depositAsync() {
  return (dispatch) => {
    // Lanzamos otro dispatch con loading
    dispatch(loading());
    setTimeout(()=> {
      dispatch(deposit());
    }, 5000)
  }
}
```

Y en la página depositPage, renderizamos un contenido u otro según esté cargando o no

```js
// DepositPage.js

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as balanceActions from '../actions/balanceActions';

function DepositPage() {
  const balance = useSelector(state => state.balanceReducer.balance);
  const loan = useSelector(state => state.loanReducer.loan);
  const loading = useSelector(state => state.balanceReducer.loading);
  const dispatch = useDispatch();
  function onDepositHandle() {
    dispatch(balanceActions.depositAsync());
  }
  return (
    <div>
      <h1>Welcome to DepositPage</h1>
      {
        loading
        ? <p>Saving...</p> 
        : <p>Balance is {balance}</p>
      }
      <button onClick={onDepositHandle}>Deposit</button>
      <h2>{loan ? 'Loan Applied' : 'Loan needed'}</h2>
    </div>
  )
}

export default DepositPage;
```