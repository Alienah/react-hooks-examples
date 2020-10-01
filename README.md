ℹ️ This documentation is written in Spanish, as learning notes. For more information on how to start the project and what commands can be used, you can consult the documentation provided by React at [doc folder](/doc)

# 📝 TYPES CHECKING

Vamos a ver tres herramientas que comprueban los tipados

## 1.PropTypes

Viene ya integrado con ```create-react-app```.

### Ejemplo

👩‍💻 _Para probar este ejemplo, viaja a [esta rama](https://github.com/Alienah/react-hooks-examples/tree/example-proptypes)_

En este ejemplo hemos creao un componente muy simple que imprime un div con un texto.

```js
import React from 'react';

function MyCompExample({str}) {
  return <div>{str}</div>
}

export default MyCompExample;
```

Que estamos usando en esta app:

```js
// App.js

import React, {useState} from 'react';
import MyCompExample from './components/MyCompExample';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Example with PropType</h1>
        <MyCompExample str="Hello"></MyCompExample>
      </header>
    </div>
  );
}

export default App;
```

**PropTypes.string**

Va a recibir un string como props, y queremos asegurarnos de que sea un string y no un número u otro tipo, con lo que podemos usar proptype de la siguiente manera:

```js
import React from 'react';
import PropTypes from 'prop-types';

function MyCompExample({str}) {
  return <div>{str}</div>
}

MyCompExample.propTypes = {
  str: PropTypes.string
}

export default MyCompExample;
```

De este modo, en la consola nos saldrá un warning si introducimos cualquier otro tipo (aunque igualmente lo intentará imprimir en la pantalla)

**PropTypes.func**

Podríamos añadirle por ejemplo un evento onClick, que tipamos como función y además podríamos decir que es obligatorio rellenar ese campo en ```App.js```

```js
// MyCompExample.js

import React from 'react';
import PropTypes from 'prop-types';

function MyCompExample({str, onClick}) {
  return <div onClick={onClick}>{str}</div>
}

MyCompExample.propTypes = {
  str: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default MyCompExample;
```

De manera que si no lo relleno en ```App.js```, saltará un warning en la consola.

**PropTypes.exact**

Puedo definir los tipos que hay dentro de la estructura de un objeto y limitarlo para que no puedan introducir ninguna propiedad que no tenga el tipo definido-

```js
// MyCompExample

import React from 'react';
import PropTypes from 'prop-types';

function MyCompExample({str, onClick, obj}) {
  console.log(obj)
  return <div onClick={onClick}>{str}</div>
}

MyCompExample.propTypes = {
  str: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  obj: PropTypes.exact({
    age: PropTypes.number.isRequired,
    name: PropTypes.string,
    gender: PropTypes.oneOf(['M', 'F']),
    birthdate: PropTypes.instanceOf(Date)
  })
}

export default MyCompExample;
```

## 2.FlowTypes

Otra librería para tipar tus objetos. Está desarrollada por los mimso que desarrollaron React.

### Instalación

```npm install flow-bin --save-dev```

En el package.json añadimos el siguiente script:

```json
"flow": "flow"
```

Y ejecutamos en la consola:

```npm run flow init```

Lo cual nos generará un archivo de configuración llamado ```.flowconfig```

### Uso

Para comprobar los tipados del proyecto, se ejecuta el comando ```npm run flow```

### Ejemplos

👩‍💻 _Para probar este ejemplo, viaja a [esta rama](https://github.com/Alienah/react-hooks-examples/tree/example-flowtypes)_

```js
// MyCompExample.js

//@flow
import * as React from 'react';

type MyCompExampleProps = {
  str: string,
  obj?: Object,
  onClick?: Function,
  children: React.Node
}

function MyCompExample(props: MyCompExampleProps): Function {
  console.log(props.obj)
  return (
    <div onClick={props.onClick}>
      <div>
        {props.str}
      </div>
      {props.children}
    </div>)
}

MyCompExample.defaultProps = {
  str: 'Hello',
  children: <div>Default children</div>
}

export default MyCompExample;
```

hemos añadido al inicio del archivo ```//@flow``` que lo que hace es decirle al comando que lanzamos para hacer las comprobaciones, que compruebe este archivo.

Si lo que queremos es que compruebe todos los archivos del proyecto, podríamos añadirlo enla configuración de ```.flowconfig```.

```config
[ignore]
.*/node_modules/.*
.*/src/index\.js
.**/src/serviceWorker.js
.*\.test\.js

[include]

[libs]

[lints]

[options]
all=true

[strict]
```

## 3.Typescript

A diferencia de los dos anteriores, que sólo te avisan con un warning de los errores de tipado, typescript no sólo te avisa, sino que no te deja compilar el proyecto si no los corriges.

### Instalación

Para trabajar con typescript, en vez de crear el proyecto con create-react-app de manera normal, lo haríamos añadiendo.

```npx create-react-app react-hooks-with-typescript --typescript```

O el más actual:

```npx create-react-app react-hooks-with-typescript --template typescript```

### Uso y ejemplos

👩‍💻 _Para probar este ejemplo, viaja a [esta rama](https://github.com/Alienah/react-hooks-examples/tree/example-typescript)_

Como en los casos anteriores, vamos a poner varios ejemplos de tipados usando un ejemplo simple de componente.

```tsx
// App.tsx

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
```

```tsx
// MyExampleComp.tsx

import React from 'react';

// interface MyExampleComInterface {
//   name: string;
// }
// Se pueden usar ambas opciones: interface o type

//Props
type MyExampleComType = {
  name: string,
  gender: 'M' | 'F',
  isMarried?: boolean,
  flexible?: any,
  [key:string]: any
}

//Objetos
type PersonType = {
  firstName: string,
  lastName: string,
}

const person: PersonType = {
  firstName: 'Aida',
  lastName: 'Albarrán'
}

//Funciones
function isOld(age: number): boolean {
  return (age > 80) || false;
}

function myExampleComp({name, gender, isMarried, flexible, whatever}: MyExampleComType) {
  return <>
      <div>{name}</div>
      <div>{gender}</div>
      <div>{flexible}</div>
      <div>{whatever}</div>
    </>
}

export default myExampleComp;
```


