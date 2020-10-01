# REACT EXAMPLES USING REACT HOOKS

This repository has several branches with differentes uses and examples

## Install

Run ```npm i``` to install all dependencies

## Run website

Run ```npm start``` to see the examples in [http://localhost:3000](http://localhost:3000) in the browser

ℹ️ This documentation is written in Spanish, as learning notes. For more information on how to start the project and what commands can be used, you can consult the documentation provided by React at [doc folder](/doc)

# 📝 REACT CON FUNCIONES Y HOOKS.

## STYLES

### Usando JS in CSS para estilar

Cuando usas un objeto de javascript para escribir el css

Ejemplo

```js
import React from 'react';
import './App.scss';

const nameStyle = {
  color: 'gray',
  border: '1px solid grey',
  paddinTop: '5px',
  paddingBottom: '5px',
  width: '300px',
};

const titleStyle = {
  color: "yellow",
  borderColor: "yellow",
  borderStyle: "dotted"
}
function App() {
  // eslint-disable-next-line no-console
  console.log('hola')
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{...nameStyle, ...titleStyle}}>Names List</h1>
        <h2 className="name" style={nameStyle}>Aida</h2>
        <h2 className="name" style={nameStyle}>Daniela</h2>
        <h2 className="name" style={nameStyle}>Roberto</h2>
      </header>
    </div>
  );
}

export default App;
```

### Usando clases de CSS para estilar.

Como se usa normalmente los estilos de css, con clases

Ejemplo:

```js
//app.js
import React from 'react';
import './App.scss';

function App() {
  // eslint-disable-next-line no-console
  console.log('hola')
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        <h2 className="name">Aida</h2>
        <h2 className="name">Daniela</h2>
        <h2 className="name">Roberto</h2>
      </header>
    </div>
  );
}

export default App;
```

```css
/* app.scss */
.name {
  color: gray;
  border: 1px solid grey;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 300px;
}

.title {
  color: yellow;
  border-color: yellow;
  border-style: dotted;
}
```

## COMPONENTES

### Pasando los datos de padre a hijo con props

```js
//App.js
import React from 'react';
import './App.scss';
import NameTag from './components/nameTag'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        <NameTag name="Aida"></NameTag>
        <NameTag name="Daniela"></NameTag>
        <NameTag name="Roberto"></NameTag>
      </header>
    </div>
  );
}

export default App;
```

```js
// nameTag.js
import React from 'react';

function nameTag(props) {
  return <h2 className="name">{props.name}</h2>
}

export default nameTag;
```

### Pasando los datos de padre a hijo con children (como en lit los slots)

```js
//App.js
import React from 'react';
import './App.scss';
import NameTag from './components/nameTag'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        <NameTag>Aida</NameTag>
        <NameTag>Daniela</NameTag>
        <NameTag>Roberto</NameTag>
      </header>
    </div>
  );
}

export default App;
```

```js
// nameTag.js
import React from 'react';

function nameTag() {
  return <h2 className="name">{props.children}</h2>
}

export default nameTag;
```

### Fragments

Cuando montamos en un mismo elemento de un componente más de un fragmento, podemos encontrarnos con problemas en el css por la creación que hace por dentro react cada vez que añades un div (probar a escribir código en https://babeljs.io/ para ver cómo transforma React en javascript vanilla)

En este ejemplo vemos 3 maneras de renderizar el mismo código

Este te crea objetos de react extras

```js
// nametag.js
import React from 'react';

function nameTag(props) {
  return (
    <div>
      <h2 className="name">{props.firstName}</h2>
      <h2 className="name">{props.lastName}</h2>
    </div>
  );
}

export default nameTag;
```

Esto es usando Fragment, que te evita usar over div

```js
import React, {Fragment} from 'react';

function nameTag(props) {
  return (
    <Fragment>
      <h2 className="name">{props.firstName}</h2>
      <h2 className="name">{props.lastName}</h2>
    </Fragment>
  );
}

export default nameTag;
```

Que es lo mismo que usar esta sintaxis:

```js
import React from 'react';

function nameTag(props) {
  return (
    <>
      <h2 className="name">{props.firstName}</h2>
      <h2 className="name">{props.lastName}</h2>
    </>
  );
}

export default nameTag;
```

También se podría incluir en un array

```js
import React from 'react';

function nameTag(props) {
  return (
    [
      <h2 className="name">{props.firstName}</h2>
      <h2 className="name">{props.lastName}</h2>
    ]
  );
}

export default nameTag;
```

### Destructuring props

Partiendo de un componente que usa varias props, podríamos usar destructuring para convertir esto:

```js
import React from 'react';

function input(props) {
  return (
    <input placeholder={props.placeholder} type={props.type}></input>
  );
}

export default input;
```

En esto:

```js
import React from 'react';

function input({placeholder, type}) {
  return (
    <input placeholder={placeholder} type={type}></input>
  );
}

export default input;
```

### Conditional rendering

Partiendo de este App.js

```js
//App.js
import React from 'react';
import './App.scss';
import NameTag from './components/nameTag';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        <NameTag firstName="Aida" lastName="Albarrán"></NameTag>
        <NameTag firstName="Daniela" lastName="Minecraft"></NameTag>
        <NameTag firstName="Roberto" lastName="Palomino"></NameTag>
        <NameTag></NameTag>
      </header>
    </div>
  );
}

export default App;
```

Si no se rellena las props podemos retornar otro html

```js
//nameTag.js
import React from 'react';

function nameTag({firstName, lastName}) {
  if (!firstName && !lastName) {
    return (
    <div className="name">
      <h2>Invalid name</h2>
    </div>
    )
  }
  return (
    <div className="name">
      <h2>First name: {firstName}</h2>
      <h2>Last name: {lastName}</h2>
    </div>
  );
}

export default nameTag;
```

O bien renderizar en el return principal usando estos condicionales:

```js
//nameTag.js
import React from 'react';

function nameTag({firstName, lastName}) {
  if (!firstName && !lastName) {
    return (
    <div className="name">
      <h2>Invalid name</h2>
    </div>
    )
  }
  return (
    <div className="name">
      <h2>First name: {firstName}</h2>
      <h2>Last name: {lastName}</h2>
      {firstName === 'Daniela' && <div style={{color: "pink"}}>VIP</div>}
    </div>
  );
}

export default nameTag;
```

### High Order Components

Las funciones High Order son, como sabemos, funciones que reciben como parámetro otras funciones y a su vez, devuelven funciones.

Con los componentes de react funciona de la misma manera, de modo que recibiremos como argumento un componente y devolveremos otro transformado.

Ejemplo

```js
//App.js
import React from 'react';
import './App.scss';
import NameTag from './components/nameTag'
import Input from './components/input'

// Función de nivel superior
const makeGreen = BaseComponent => props => {
  const addGreen = {
    style: {
      color: "green"
    }
  }

  const newProps = {
    ...props, ...addGreen
  }

  return <BaseComponent {...newProps}/>
}

//Instanciamos el componente transformado
const GreenNameTag = makeGreen(NameTag);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input placeholder="Enter here" type="text"></Input>
        <h1 className="name title">Names List</h1>
        <GreenNameTag firstName="Aida" lastName="Albarrán"></GreenNameTag>
        <NameTag firstName="Daniela" lastName="Minecraft"></NameTag>
        <NameTag firstName="Roberto" lastName="Palomino"></NameTag>
        <NameTag></NameTag>
      </header>
    </div>
  );
}

export default App;
```

```js
// nameTag.jsx
import React from 'react';

// Recibimos una nueva prop: style
function nameTag({firstName, lastName, style}) {
  if (!firstName && !lastName) {
    return (
    <div className="name">
      <h2>Invalid name</h2>
    </div>
    )
  }
  return (
    // Y la usamos aquí
    <div className="name">
      <h2 style={style}>First name: {firstName}</h2>
      <h2 style={style}>Last name: {lastName}</h2>
      {firstName === 'Daniela' && <div style={{color: "fuchsia"}}>VIP</div>}
    </div>
  );
}

export default nameTag;
```

Sin embargo, no queremos usar estilos en línea, porque es una mala práctica, con lo cual, podríamos crear un componente high order para quitar el estilo en línea.

```js
// App.js
import React from 'react';
import './App.scss';
import NameTag from './components/nameTag'
import Input from './components/input'

const makeGreen = BaseComponent => props => {
  const addGreen = {
    style: {
      color: "green"
    }
  }

  const newProps = {
    ...props, ...addGreen
  }

  return <BaseComponent {...newProps}/>
}

// Añadimos esta función de order superior
const removeInline = BaseComponent => props => {
  const newProps = {...props};
  delete newProps.style;
  return <BaseComponent {...newProps}/>
}

const GreenNameTag = makeGreen(NameTag);
const CleanNameTag = removeInline(NameTag);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input placeholder="Enter here" type="text"></Input>
        <h1 className="name title">Names List</h1>
        <GreenNameTag firstName="Aida" lastName="Albarrán"></GreenNameTag>
        <!-- Estos estilos no se pintarán -->
        <CleanNameTag style={{color: "red"}} firstName="Daniela" lastName="Albarrán"></CleanNameTag>
        <NameTag firstName="Roberto" lastName="Palomino"></NameTag>
        <NameTag></NameTag>
      </header>
    </div>
  );
}

export default App;
```

## HOOKS

👩‍💻 _Consultar el archivo [react-Hooks.md](/doc/React-Hooks.md)_

## STATE

¿Cómo se usan los estados ahora con hooks?

Partiendo del ejemplo de los nombres, vamos a convertir los valores de los nombres en un estado.

Aquí estarían "hardcodeados":

```js
//App.js
import React from 'react';
import './App.scss';
import NameTag from './components/nameTag';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        <NameTag firstName="Aida" lastName="Albarrán"></NameTag>
        <NameTag firstName="Daniela" lastName="Minecraft"></NameTag>
        <NameTag firstName="Roberto" lastName="Palomino"></NameTag>
      </header>
    </div>
  );
}

export default App;
```

Lo transformamos en un estado:

```js
import React, { useState } from 'react';
import './App.scss';
import NameTag from './components/nameTag';

// Inicializamos el estado inicial fuera de la función
const initialName = [
  { firstName: "Aida", lastName: "Albarrán" },
  { firstName: "Daniela", lastName: "Minecraft" },
  { firstName: "Roberto", lastName: "Palomino" },
]

function App() {
  const [names, setNames] = useState(initialName);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        <NameTag firstName={names[0].firstName} lastName={names[0].lastName}></NameTag>
        <NameTag firstName={names[1].firstName} lastName={names[1].lastName}></NameTag>
        <NameTag firstName={names[2].firstName} lastName={names[2].lastName}></NameTag>
      </header>
    </div>
  );
}

export default App;
```

Ahora vamos a ver cómo manejar los estados más complejos como este:

```js
import React, { useState } from 'react';
import './App.scss';
import NameTag from './components/nameTag';

// Inicializamos el estado inicial fuera de la función
const initialName = [
  { firstName: "Aida", lastName: "Albarrán" },
  { firstName: "Daniela", lastName: "Minecraft" },
  { firstName: "Roberto", lastName: "Palomino" },
]

function App() {
  const [names, setNames] = useState(initialName);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        {names.map((name, index) => {
          return <NameTag key={`${index}${name.firstName}`} firstName={name.firstName} lastName={name.lastName}></NameTag>
        })}
      </header>
    </div>
  );
}

export default App;
```

## EVENTOS

 Vamos a crear un ejemplo de un botón que elimina de una lista (que es un estado) los elementos que tengan más de 50 calorías.

 Tendríamos por un lado la App

 ```js
 import React, { useState } from 'react';
import './App.scss';
import Item from './components/item';

const initList = [
  {name: "tomato", calories: 20},
  {name: "rice", calories: 30},
  {name: "candy", calories: 100},
]

function App() {
  const [list, setList] = useState(initList);

  const removeUnhealthyItem = (e) => {
    e.preventDefault();
    //No es recomendable modificar directamente el estado, en este caso "list", hay que hacer una copia
    //  const copyList = [...list];
    //O si usamos un filter, ya nos da una copia
    const fileterdList = list.filter((item) => item.calories <= 50);
    // Aquí usamos la función del hook useSate para modificar el estado, es decir, nuestar lista
    setList(fileterdList)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
        {list.map((item, index) => {
          return <Item key={`${index}${item.name}`} item={item}></Item>
        })}
        {
          // Y aquí tenemos nuestro evento click, con camelCase
        }
        <button 
          className="remove-btn" 
          onClick={removeUnhealthyItem}>Remove Unhealthy</button>
      </header>
    </div>
  );
}

export default App;
 ```

Este sería el item que renderiza

```js
import React from 'react';
import './item.scss';

function item({item}) {
  return (
    <div className="item-wrapper">
      <div className="item-info">
        <span className="item-title">Name: </span><span>{item.name}</span>
      </div>
      <div className="item-info">
        <span className="item-title">Calories: </span><span>{item.calories}</span>
      </div>
    </div>
  )
}

export default item;
```

## COMUNICACIÓN ENTRE COMPONENTES

Normalmente queremos que los componentes hijos sean "tontos", es decir, que no recaiga en ellos responsabilidades como la de eliminar un item de un estado/lista. Así pues, si queremos hacer por ejemplo que al darle un click en el item que sea se elimine ese item y no otro podemos hacerlo mediante eventos.

La manera de comunicarse los hijos con los padres es mediante eventos.

En la App.js le pasaríamos por props una más que sería en este caso el onClick

```js
import React, { useState } from 'react';
import './App.scss';
import Item from './components/item';

const initList = [
  {name: "tomato", calories: 20},
  {name: "rice", calories: 30},
  {name: "candy", calories: 100},
]

function App() {
  const [list, setList] = useState(initList);

  //Aquí recibimos el evento del hijo que quiere ser eliminado y hacemos nuestra lógica que setea el state
  const removeItem = (e) => {
    e.preventDefault();
    console.dir(e.target)
    const filteredList = list.filter((item) => item.name !== e.target.name);
    setList(filteredList);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
        {list.map((item, index) => {
          //Aquí le estamos pasando la prop onClick
          return <Item key={`${index}${item.name}`} item={item} onClick={removeItem}></Item>
        })}
      </header>
    </div>
  );
}

export default App;
```

En el hijo:

```js
import React from 'react';
import './item.scss';

function item({item, onClick}) {
  return (
    <div className="item-wrapper">
      <div className="item-info">
        <span className="item-title">Name: </span><span>{item.name}</span>
      </div>
      <div className="item-info">
        <span className="item-title">Calories: </span><span>{item.calories}</span>
      </div>
      <button name={item.name} className="remove-btn" onClick={onClick}>Remove</button>
    </div>
  )
}

export default item;
```

## MÚLTIPLES ESTADOS

Siguiendo con el ejemplo anterior, imaginemos queremos poder editar cada nombre de la lista haciendo doble click y guardar ese dato al darle al enter.

Ahora mismo sólo teníamos un state, la lista.

La novedad con React hooks es que ahora podemos tener más de un state. Antes con las clases sólo podíamos tener un state.

Continuando el ejemplo anterior:

```js
// App.js
import React, { useState } from 'react';
import './App.scss';
import Item from './components/item';

const initList = [
  {name: "tomato", calories: 20},
  {name: "rice", calories: 30},
  {name: "candy", calories: 100},
]

function App() {
  // Estamos usando dos estados
  const [list, setList] = useState(initList);
  const [editable, setEditable] = useState(false);

  const removeItem = (e) => {
    e.preventDefault();
    console.dir(e.target)
    const filteredList = list.filter((item) => item.name !== e.target.name);
    setList(filteredList);
  }

  const makeEditable = (e) => {
    e.preventDefault();
    setEditable(true);
  }
  
  const keyPressHandle = (e, index) => {
    if (e.key === 'Enter') {
      setEditable(!editable);
      const copyList = [...list];
      copyList[index].name = e.target.value;
      setList(copyList);

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
        {list.map((item, index) => {
          return (
            <Item 
              key={`${index}${item.name}`}
              item={item}
              onClick={removeItem}
              editable={editable}
              onDoubleClick={makeEditable}
              onKeyPress={keyPressHandle}
              index={index}
            />
            )
        })}
      </header>
    </div>
  );
}

export default App;
```

Y en item.js

```js
import React from 'react';
import './item.scss';

function item(props) {
  const {item, onClick, editable, onDoubleClick, onKeyPress, index} = props;
  return (
    <div className="item-wrapper">
      <div className="item-info">
        <span className="item-title">Name: </span>
        {editable
        ? <input
            className="item-input"
            type="text" 
            defaultValue={item.name}
            onKeyPress={(e) => onKeyPress(e, index)}/>
        {
          // Con el evento onDoubleClick mandamos la señal a App para que cambie el estado a editable. Nosotros aquí estamos escuchando esa prop que, cuando es true mostrará el input de más arriba
        }
        : <span editable={item.editable} onDoubleClick={onDoubleClick}>{item.name}</span>}
      </div>
      <div className="item-info">
        <span className="item-title">Calories: </span><span>{item.calories}</span>
      </div>
      <button name={item.name} className="remove-btn" onClick={onClick}>Remove</button>
    </div>
  )
}

export default item;
```

## OTROS EVENTOS: ONCHANGE

Aquí vemos un ejemplo de cómo gestionar con onChange cada campo del formulario, pero recuperar todos los valores de los campos del mismo recogiendo el valor que automáticamente se ha almacenado en su estado correspondiente. De manera que cada onChange cambiará el valor del estado de cada campo, pero al hacer submit tendremos acceso a todos esos valores (puesto que están en un estado).

Ejemplo:

```js
import React, { useState } from 'react';
import './App.scss';

function App() {
  const [name, setName] = useState('Your Name');
  const [income, setIncome] = useState('high');

  function changeName(e) {
    setName(e.target.value);
  }

  function changeIncome(e) {
    setIncome(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    //Aquí tengo acceso a los valores de los campos porque se han almacenado en sus estados correspondientes a través del onChange
    console.log('Valores de los campos', name, income)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Form</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>Name: </label>
            <input
              value={name}
              type="text"
              onChange={changeName}
            />
          </div>
          <div>
            <label>Income: </label>
            <select value={income} onChange={changeIncome}>
              <option value="high">High</option>
              <option value="mid">Mid</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
```

## CICLOS DE VIDA

1. **MOUNT** Se inicializa un componente. la página se carga
2. **UPDATE** Se actualiza .Cuando haces click en algo, cuando cambia alguna propiedad, o cambia un estado, el componente se actualiza.
3. **UNMOUNT** Por último, se desmonta. Cuando cargas otra cosa u otro componente éste "muere".

Cómo funciona un componente de React?

Nosotros escribimos plantillas en JSX, que es el HTML que luego se convierte en objetos de React.
Los objetos de react crean lo que llamamos virtual DOM, que es como un DOM paraleleo, gracias a lo cual puede permitirse actualizar sólo las partes que necesita con el render, al no trabajar directamente con el DOM, sino con el DOM virtual, que luego es lo que se traslada al DOM

JSX ==> VIRTUAL DOM ==> DOM

Los cilos de vida han cambiado desde que se han introducido los hooks:

* __Con clases__:
constructor
getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
(React updates DOM and refs)
componentDidMount
componentDiDUpdate
componentWillUnmount

* __Con Hooks__:

useEffect
useLayoutEffect
useMemo (el antiguo shouldComponentUpdate). Un hook