# 📝 REACT ROUTER

Las SPA te permiten tener varias páginas alojadas en una sola aplicación, de manera que cuando viajas a una ruta determinada, no tiene que hacer una nueva petición al servidor, sino que la aplicación, una vez se ha cargado la primera vez, ya tiene la información necesaria para ir navegando de una ruta a otra. React te permite hacer eso, ya que lo único que hace cuando "viajas" a otra página, es desmontar el componente actual y montar el nuevo componente.

**¿Cómo hace esto?**

Para ello vamos a usar la librería ```react router```, que tendremos que instalar:

```npm install react-router-dom --save```

Primero importamos BrowserRouter, que hace que nuestra aplicación sea capaz de ser enrutada. 

```js
import {  BrowserRouter } from 'react-router-dom';
```

Y como necesitamos que toda nuestra aplicación pueda ser enrutada, tendremos que englobar toda nuestra aplicación.

```js
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>React Router</h1>
        </header>
      </div>
    </BrowserRouter>
  );
}
```

## Route

Después de hacer esto, ya podemos importar ```Route``` que es lo que vamos a usar para crear las rutas.

```js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
        {
          // Route recibe 3 parámetros: 
          //path: la ruta en sí que le vamos a poner
          //exact: cuando es true le indicamos que coja la ruta exacta (no que contenga x)
          //render: el contenido de la página que se va a mostra en esa ruta
        }
          <Route 
            path='/'
            exact
            render={() => {
            return <h1>Welcome home</h1>
          }}/>
          <Route
            path='/about'
            exact
            render={() => {
            return <h1>Welcome about</h1>
          }}/>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

Normalmente en esas rutas vamos a tener páginas con componentes y no un return como en este ejemplo, así que vamos a crear esas páginas para incluirlo en el ejemplo:

```js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';

import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Route 
            path='/'
            exact
            render={() => {
            return <h1>Welcome home</h1>
          }}/>
          <Route
            path='/about'
            exact
            component= {AboutPage}/>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### Parámetros

Imaginameos además que queremos cargar dinámicamente las rutas, por ejemplo en el caso de que haya una ruta user con el nombre de cada usuario. ```/user/aida```

En ese caso vamos a usar el parámetro ```:conElnombreQuePongamos```. Y podemos acceder a él a través de una prop llamada ```match```

```js
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Route 
            path='/'
            exact
            render={() => {
            return <h1>Welcome home</h1>
          }}/>
          <Route
            path='/about'
            exact
            component= {AboutPage}
          />
          <Route
            path='/user/:username'
            exact
            render={({match}) => {
            return <h1>Welcome {match.params.username}</h1>
            }}
          />
        </header>
      </div>
    </BrowserRouter>
```

También podrías usar varios parámetros, que irían separados por una barra ```/```

```js
<Route
  path='/user/:firstname/:lastname'
  exact
  render={({match}) => {
  return <h1>Welcome {match.params.firstname} {match.params.lastname}</h1>
  }}
/>
```

En este ejemplo, cuando accedemos a ```users/aida/albarrán``` se imprime: **Welcome aida albarrán**


### Links

Normalmente no vamos a acceder a las páginas tecleando la ruta a mano, sino a través un link, por eso podemos usar la herramienta que provee react-router llamada, ```Link```

```js
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AboutPage from './pages/AboutPage';

import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <Link className="App-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="App-link" to="/about">
                About Page
              </Link>
            </li>
          </ul>
          <Route
            path="/"
            exact
            render={() => {
              return <h1>Welcome home</h1>;
            }}
          />
          <Route path="/about" exact component={AboutPage} />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### Navlink

Si quisiéramos controlar qué elemento es el que está activo en la página actual que estamos visitando, React-route provee otra herramienta llamada ```NavLink```

Ésta recibe un parámetro **```activeStyle```** alq ue le daremos los estilos del elemento activo y **```exact```**, para que la expresión regular se aplique sólo al match exacto

```js
import React from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import AboutPage from './pages/AboutPage';

import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <NavLink 
                className="App-link" 
                to="/"
                exact
                activeStyle={{"color": "green"}}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="App-link"
                to="/about"
                exact
                activeStyle={{"color": "green"}}
              >
                About Page
              </NavLink>
            </li>
            <li>
              <NavLink
                className="App-link"
                to="/user/aida/albarrán"
                exact
                activeStyle={{"color": "green"}}
              >
                User Aida Albarrán
              </NavLink>
            </li>
          </ul>
          <Route
            path="/"
            exact
            render={() => {
              return <h1>Welcome home</h1>;
            }}
          />
          <Route path="/about" exact component={AboutPage} />
          <Route
            path="/user/:firstname/:lastname"
            exact
            render={({ match }) => {
              return (
                <h1>
                  Welcome {match.params.firstname} {match.params.lastname}
                </h1>
              );
            }}
          />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

También podemos usar clases de css para dar estos estilos y así quede más limpio, para lo cual usaríamos el parámetro **```activeClassName```**.

```js
<ul>
  <li>
    <NavLink 
      className="App-link" 
      to="/"
      exact
      activeClassName="link-active"
    >
      Home
    </NavLink>
  </li>
  <li>
    <NavLink
      className="App-link"
      to="/about"
      exact
      activeClassName="link-active"
    >
      About Page
    </NavLink>
  </li>
  <li>
    <NavLink
      className="App-link"
      to="/user/aida/albarrán"
      exact
      activeClassName="link-active"
    >
      User Aida Albarrán
    </NavLink>
  </li>
</ul>
```

## Redirect

A veces vamos a necesitar que un enalce redirija a otra página que queramos automáticamente

Por ejemplo, cuando intentamos acceder a una página con información de usuario, a la hora de intentar acceder automáticamente debería redirigirme a la página para hacer login.

Para eso, usaremos la herramienta de react-rout **```Redirect```**

```js
import React, {useState} from 'react';
import { BrowserRouter, Route, Link, NavLink, Redirect } from 'react-router-dom';
import AboutPage from './pages/AboutPage';

import './App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function loginHandle() {
    setLoggedIn(!loggedIn);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <NavLink 
                className="App-link" 
                to="/"
                exact
                activeClassName="link-active"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="App-link"
                to="/about"
                exact
                activeClassName="link-active"
              >
                About Page
              </NavLink>
            </li>
            <li>
              <NavLink
                className="App-link"
                to="/user/aida/albarrán"
                exact
                activeClassName="link-active"
              >
                User Aida Albarrán
              </NavLink>
            </li>
          </ul>
          <button onClick={loginHandle}>
            {loggedIn ? "Logout" : "Login"}
          </button>
          <Route
            path="/"
            exact
            render={() => {
              return <h1>Welcome home</h1>;
            }}
          />
          <Route path="/about" exact component={AboutPage} />
          <Route
            path="/user/:firstname/:lastname"
            exact
            render={({ match }) => {
              return loggedIn 
              ? (
                <h1>
                  Welcome {match.params.firstname} {match.params.lastname}
                </h1>
              ) 
              : (
                <Redirect to="/" />
              );
            }}
          />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## Route prompt

Imaginemos que estamos en la página de un usuario, en el que hay un formulario y accidentalmente cierra la ventana. Para evitar que se cierre accidentalmente y perder los datos, podemos usar un prompt que avise de si está segura/o de querer cerrar la ventana, ya que perderá los datos.

```js
import React, {useState} from 'react';
import { 
  BrowserRouter, 
  Route,
  Prompt,
  NavLink,
  Redirect,
} from 'react-router-dom';
import AboutPage from './pages/AboutPage';

import './App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [age, setAge] = useState('');

  function loginHandle() {
    setLoggedIn(!loggedIn);
  }

  function changeAge(e) {
    setAge(e.target.value);
  }

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
                to="/about"
                exact
                activeClassName="link-active"
              >
                About Page
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="App-link"
                to="/user/aida/albarrán"
                exact
                activeClassName="link-active"
              >
                User Aida Albarrán
              </NavLink>
            </li>
          </ul>
          {
            // Este prompt saltará si está logeado y no ha introducido un valor en el input
          }
          <Prompt
            when={loggedIn && !age}
            message={(location) => {
              // El mensaje sólo saltará al cambiar a otra página, es decir cuando el pathname no es la página del usuario
              return location.pathname.startsWith('/user/')
                ? true
                : 'Are you sure?';
            }}
          ></Prompt>
          <button onClick={loginHandle}>{loggedIn ? 'Logout' : 'Login'}</button>
          <Route
            path="/"
            exact
            render={() => {
              return <h1>Welcome home</h1>;
            }}
          />
          <Route path="/about" exact component={AboutPage} />
          <Route
            path="/user/:firstname/:lastname"
            exact
            render={({ match }) => {
              //Hemos añadido un input y un elemento que imprime el valor
              return loggedIn ? (
                <div>
                  <h1>
                    Welcome {match.params.firstname} {match.params.lastname}
                  </h1>
                  <p>Your age: {age}</p>
                  <input type="text" value={age} onChange={changeAge} />
                </div>
              ) : (
                <Redirect to="/" />
              );
            }}
          />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## UseContext Hook

Te permite compartir contenido que es común entre varios componentes/páginas, sin necesidad de pasarlo a través de props.

* No se puede usar useContext dentro de una función callback ( es decir, que se tiene que usar en el componente/página que se esté importando en App e incluyendo en Route)

En la carpeta **contexts** creamos nuestro archivo que creará el contexto

```js
// messageContext.js
import {createContext} from 'react';

const messageContext = createContext(null);

export default messageContext;
```
En la App lo importamos y lo colocamos en primer nivel, justo después del BrowserRouter

```js
// App.js
import React, {useState} from 'react';
import { 
  BrowserRouter, 
  Route,
  Prompt,
  NavLink,
  Redirect,
} from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import messageContext from './contexts/messageContext';

import './App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [age, setAge] = useState('');

  function loginHandle() {
    setLoggedIn(!loggedIn);
  }

  function changeAge(e) {
    setAge(e.target.value);
  }

  return (
    <BrowserRouter>
      <messageContext.Provider value="I am shared content">
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
                  to="/about"
                  exact
                  activeClassName="link-active"
                >
                  About Page
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="App-link"
                  to="/user/aida/albarrán"
                  exact
                  activeClassName="link-active"
                >
                  User Aida Albarrán
                </NavLink>
              </li>
            </ul>
            <Prompt
              when={loggedIn && !age}
              message={(location) => {
                return location.pathname.startsWith('/user/')
                  ? true
                  : 'Are you sure?';
              }}
            ></Prompt>
            <button onClick={loginHandle}>{loggedIn ? 'Logout' : 'Login'}</button>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" exact component={AboutPage} />
            <Route
              path="/user/:firstname/:lastname"
              exact
              render={({ match }) => {
                return loggedIn ? (
                  <div>
                    <h1>
                      Welcome {match.params.firstname} {match.params.lastname}
                    </h1>
                    <p>Your age: {age}</p>
                    <input type="text" value={age} onChange={changeAge} />
                  </div>
                ) : (
                  <Redirect to="/" />
                );
              }}
            />
          </header>
        </div>
      </messageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
```

Y lo usamos en cada página que queramos:

```js
//Home page

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
```

```js
// About page

import React, {useContext} from 'react';
import messageContext from '../contexts/messageContext'

function AboutPage() {
  return (
    <div>
      <h1>Welcome about</h1>
      <h2>Message: {useContext(messageContext)}</h2>
    </div>
  )
}

export default AboutPage;
```

### Aplicándo en componentes anidados

En primer lugar crearemos un estado para el mensaje.

```js
const [message, setMessage] = useState('I am shared content');
```

Después, en vez de psar el mensaje directamente en el **value**, pasaremos el estado entero, es decir, el valor y el método

```js
<messageContext.Provider value={[message, setMessage]}>
```

Por ejemplo tenemos una página 'about' que usa un componente ```outer``` que a su vez tiene otro dentro llamado ```inner```


```js
// aboutPage.js
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
```

El componente outer usa inner dentro:

```js
// Outer.js

import React, {useContext} from 'react';
import Inner from './inner';
import messageContext from '../../contexts/messageContext';

function Outer() {
  return (
    <>
    <h2>Outer: {useContext(messageContext)}[0]</h2>
    <Inner></Inner>
    </>
  )
}

export default Outer;
```

```js
// Inner.js

import React, {useContext} from 'react';
import messageContext from '../../contexts/messageContext';

function Inner() {
  const [message, setMessage] = useContext(messageContext);
  return (
    <>
      <h3>Inner</h3>
      {
        //Aquí estamos modificando el mensaje y se está viendo el mismo, tanto en outer, como en homepage. Pero no lo estamos haciendo a través de props, sino de useContext.
      }
      <button onClick={() => { setMessage(Math.random().toString())}}>Change Message</button>
    </>
  )
}

export default Inner;
```
