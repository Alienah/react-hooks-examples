# 📝 REACT HOOKS

## Hooks Rules

* No llamar hook dentro de un loop
* No llamar hook dentro de una condición
* No llamar hook dentro de funciones anidadas
* Siempre usar hooks al principio de la función

```js
import React, {useState} from 'react';
import './App.scss';

function App() {
  // Tenemos que hacer hoist y definirlo al principio de la función
  const [age, setAge] = useState(21);
  const ageUpHandle = () => {
    //Aquí es donde usamos el setter para modificar el estado
    setAge(age + 1);
  }
  const ageDownHandle = () => {
    setAge(age - 1);
  }
  //Porque si no mantenemos el orden, como aquí, no funcionará. Hay que seguir unh orden para que, si hay otros hooks que necesitan este valor, lo tengan disponible
  const [age, setAge] = useState(21); //Esto NO

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use State Hook</h1>
        <h2>Age: {age}</h2>
        <button onClick={ageUpHandle}>Age up</button>
        <button onClick={ageDownHandle}>Age down</button>
      </header>
    </div>
  );
}

export default App;
```

* Sólo llamar a los hooks desde dentro de una función de react

## useState Hook

El state es una propiedad de React y hay hay un hook para el state. En react los hooks empiezan por "use", así que en nuestro caso vamos a ver el ejemplo de ```useState```;

Por ejemplo vamos a usar la edad como state

```js
import React, {useState} from 'react';
import './App.scss';

function App() {
  // Tiene que tener un valor inicial en useState, que nosotros vamos a inicializar en 21. 
  // Por otro lado definimos dos variables, que en nuestro caso van a ser age (donde se almacena el valor) y setAge (la función que lo modifica)
  const [age, setAge] = useState(21);
  const ageUpHandle = () => {
    //Aquí es donde usamos el setter para modificar el estado
    setAge(age + 1);
  }
  const ageDownHandle = () => {
    setAge(age - 1);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use State Hook</h1>
        <h2>Age: {age}</h2>
        <button onClick={ageUpHandle}>Age up</button>
        <button onClick={ageDownHandle}>Age down</button>
      </header>
    </div>
  );
}

export default App;
```

**¿Cómo funcionaría interamente este hook?**

Sería algo así:

En primer lugar vemos que useState recibe un parámetro y devuelve un array

```js
function useState(initValue) {
  let _value = initValue;
  return [
    // El valor transformado
    _value,
    // La función que tranforma el valor. El parámetro de esta función es lo que queramos hacer nosotros con el estado
    (newValue) => {
      _value = newValue;
    }
  ];
}
```

Vamos a implementar este ejemplo para que funcione en cualquier emulador de javascript:

```js
const React = (function() {
  let _val;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(init) {
      _val = _val || init;

      function setState(newVal) {
        _val = newVal;
      }

      return [_val, setState];
    }
  };
})();

function AgeComp() {
  const [age, setAge] = React.useState(21);
  return {
    render() {
      console.log(age);
    },
    ageUp() {
      setAge(age + 1);
    }
  };
}

// ejecutamos
let App = React.render(AgeComp);
App.ageUp();
App = React.render(AgeComp);
App.ageUp();

```

## useRef Hook

El objetivo es acceder al dom creado por react. Puedes mantener objetos mutables in wrappers de modo que puedas acceder más tarde.

Vamos a tratar de que se pueda cambiar el focus, tanto con el tab, como con el arrow, por ejemplo

```js
import React, { useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
  const nameRef = useRef();
  const ageRef = useRef();
  const marriedRef = useRef();
  const submitRef = useRef();

  useEffect(() => {
    // hago que el name sea el primero en tener el focus
    nameRef.current.focus();
  }, [])
  //Este array vacío es porque solo quiero que se ejecute una vez, al iniciar el componente

  function keyPressHandle(e) {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
      if(e.target.id === 'name-input') {
        console.log(e.target.id)
        // Voy cambiando el focus en base a la referencia
        ageRef.current.focus();
      }
      if(e.target.id === 'age-input') {
        marriedRef.current.focus();
      }
      if(e.target.id === 'married-input') {
        submitRef.current.focus();
      }
    }
  }

  function onClickHandle(e) {
    e.preventDefault();
    alert('submitted')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>UseRefs Hook</h1>
        <div className="inputs-container">
          <div>
            <div className="input">
              <label>Name: </label>
              <input
                id="name-input"
                ref={nameRef}
                type="text"
                onKeyDown={keyPressHandle}
              />
            </div>
            <div className="input">
              <label>Age: </label>
              <input
                id="age-input"
                ref={ageRef}
                type="text"
                onKeyDown={keyPressHandle}
              />
            </div>
            <div className="input">
              <label>Married: </label>
              <input
                id="married-input"
                ref={marriedRef}
                type="checkbox"
                onKeyDown={keyPressHandle}
              />
            </div>
          </div>
           <button id ="submit" ref={submitRef} type="submit" onClick={onClickHandle}>Submit</button>
        </div>
      </header>
    </div>
  );
}

export default App;
```

### Forwarding refs

¿Qué pasaría si en vez de html regular, lo que tienes es un componente que contiene múltiples elementos o componentes dentro? Que si quisiéramos hacer focus tendríamos que usar forwarding ref, que lo que quiere decir es que tiene el forwardref dentro de ese componente o elemento.

Por ejemplo, imaginemos el ejemplo anterior, pero que en vez de tener los inputs en App, lo que usamos son componentes Input:

```js
//App.js
import React, { useEffect, useRef } from 'react';
import './App.scss';
import Input from './components/input';

function App() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  function onFirstKeyDown(e) {
    if(e.key === 'Enter') {
      lastNameRef.current.focus();
    }
  }

  function onLastKeyDown(e) {
    if(e.key === 'Enter') {
      firstNameRef.current.focus();
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>UseRefs Hook</h1>
        <div className="inputs-container">
            <Input ref={firstNameRef} placeholder="Type your first name" onKeyDown={onFirstKeyDown}/>
            <Input ref={lastNameRef} placeholder="Type your last name"onKeyDown={onLastKeyDown}/>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Nuestro componente sería algo así:

```js
// input.js
import React from 'react';

function input({placeholder, type, onKeyDown}, ref) {
  // Ese segundo argumento ref no un objeto extendible, es por lo que necesitamos redirigir el ref con forwardingref
  return (
    <input onKeyDown={onKeyDown} ref={ref} placeholder={placeholder} type={type}></input>
  );
}

// Con esto redirigimos el componente para extenderlo
const forwardedInput = React.forwardRef(input)

export default forwardedInput;
```

Usando ```React.forwardRef(input)``` por tanto, estamos extendiendo el ref

## useEffect Hook

Este hook recibe un callback como parámetro y el segundo parámetro es el que determina cúando es montado por primera vez o actualizado nuestro componente.

### Ejecutar algo sólo la primera vez

Si pasamos un array vacío, significa que nuestro componente es montado por primera vez

```js
  useEffect(() => {

  }, [])
```

```js
import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [growth, setGrowth] = useState(0);
  
  useEffect(() => {
    console.log('I am born')
  }, [])

  function grow() {
    setGrowth(growth + 5);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Effect</h1>
        <h2>Life cycle</h2>
        <h3>Growth: {growth}</h3>
        <button onClick={grow}>Learn and grow</button>
      </header>
    </div>
  );
}

export default App;
```
### Actualizar cada vez que se ejecuta un click

Qué pasaría si queremos que se actualizara cada vez que pulso el botón?

A diferencia de los cilos de vida ComponentDidMount, que sólo puede haber uno por componente, los hooks se pueden ejecutar varias veces, es decir, que ```useEffect``` lo podríamso usar de nuevo en este caso.

```js
// Si no le pasamos el segundo argumento se ejecuta al iniciarse y cada vez que se actualiza
  useEffect(() => {
    console.log('I make mistake and learn')
  })
```

Usando este método de esta manera, cada vez que hacemos clik en el botón y cambia el estado, se ejecuta

```js
import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [growth, setGrowth] = useState(0);
  
  useEffect(() => {
    console.log('I am born')
  }, [])

  useEffect(() => {
    console.log('I make mistake and learn')
  })

  function grow() {
    setGrowth(growth + 5);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Effect</h1>
        <h2>Life cycle</h2>
        <h3>Growth: {growth}</h3>
        <button onClick={grow}>Learn and grow</button>
      </header>
    </div>
  );
}

export default App;
```
### Controlar que NO se ejecute el update la primera vez

Pero si no queremos que ambos useEffect se ejecuten al inicio del componente, simplemente podemos crear una variable que se iguale a true en el primer mount, de modo que el useEffect que usamos para actualizar, no se ejecutaría la primera vez.

```js
//...
// Creamos esta variable
let born = false;
function App() {
  const [growth, setGrowth] = useState(0);
  
  useEffect(() => {
    console.log('I am born')
  }, [])

  useEffect(() => {
    if (born) {
      console.log('I make mistake and learn');
    } else {
      born = true;
    }
  })
  //...
```

### Observar el cambio en una variable

Ahora imaginemos que queremos limitar el update hasta cierto punto o controlarlo de alguna manera. En nuestro ejemplo, queremos que al cumplir los 70 se alcance el nirvana.

Creamos nuevas variables con useState y le pasamos como segundo argumento al useEffect la variable que tiene que observar.

```js
import React, { useState, useEffect } from 'react';
import './App.scss';

let born = false;
function App() {
  const [growth, setGrowth] = useState(0);
  const [nirvana, setNirvana] = useState(false);
  
  useEffect(() => {
     if (born) {
       document.querySelector('.nirvana-container').innerHTML = 'Nirvana attained';
     }
     //Está escuchando que esta variable "nirvana" cambie, y ese momento se ejecutará lo que hayamos determinado
  }, [nirvana])

  useEffect(() => {
    console.log('I am born')
  }, [])

  useEffect(() => {
    if (born) {
      console.log('I make mistake and learn');
    } else {
      born = true;
    }

    if (growth > 70) {
      setNirvana(true);
    }

    return function cleanup() {
      console.log('Cleanup after mistakes');
    }
  },[growth])

  function grow() {
    setGrowth(growth + 5);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Effect</h1>
        <h2>Life cycle</h2>
        <h3>Growth: {growth}</h3>
        <p className="nirvana-container"></p>
        <button onClick={grow}>Learn and grow</button>
      </header>
    </div>
  );
}

export default App;
```

### Más ejemplos con useEffect

Construimos:
* Un reloj que se va actualizando
* Un contenedor con los valores de la posición del ratón que va captando según se mueve

```js
import React, { useState, useEffect } from 'react';
import './App.scss';

const initXY = {
  x: null,
  y: null
}
function App() {
  const [time, setTime] = useState(Date);
  const [xy, setXy] = useState(initXY);
  
  useEffect(() => {
    let handle = setInterval(() => {
      setTime(Date)
    }, 1000);

    return () => {
      // Necesitamos limpiar el interval cada vez que se actualiza, para que no se colapse
      clearInterval(handle);
    }
  })

  function mouseMoveHandle(e) {
    setXy({
      x: e.clientX,
      y: e.clientY
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandle)
    // Lo limitamos a que sólo añada el listener la primera vez para evitar problemas que habría si se añadiera cada vez que se actualiza
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Effect Examples</h1>
        <h2>Date and Time: {time}</h2>
        <h3>{`x: ${xy.x}, y: ${xy.y}`}</h3>
      </header>
    </div>
  );
}

export default App;
```

Cuando trabajamos con addEventListener hay que manejar que no se estén añadiendo de forma infirnita para no saturar javascript. Un forma es la que hemos puesto arriba, limitando a que sólo se ejecuta una vez al inicio.

```js
  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandle);
    // Lo limitamos a que sólo añada el listener la primera vez para evitar problemas que habría si se añadiera cada vez que se actualiza
  }, [])
```

Otra sería retornando una función de limpieza en el useEffect

```js
  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandle);
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandle);
    }
  })
```

### Ejemplo de UseEffect para fetch data

Cuando haces peticiones de datos a un servidor, necesitas asegurarte de que tienes los datos disponibles antes de que se visualice la página. Use Effect te ayuda con eso.

¿Cúando haremos el fecth de los datos? Cuando la página se haya montado o actualizado y quiero que lo haga sólo una vez cuando es montado.

```js
import React, { useState, useEffect } from 'react';
import './App.scss';

const initProfile = {
  followers: null,
  publicRepos: null,
}
function App() {
  const [profiles, setProfile] = useState(initProfile);

  async function getProfile() {
    const response = await fetch('https://api.github.com/users/alienah');
    const json = await response.json();
    setProfile({
      followers: json.followers,
      publicRepos: json.public_repos
    });
  }
  
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Effect fetch Data</h1>
  <h2>{`Followers: ${profiles.followers}, repos: ${profiles.publicRepos}`}</h2>
      </header>
    </div>
  );
}

export default App;
```

## useMemo Hook

Se refiere a lo que se conoce como Memoization, es una técnica de programación en la cual se reduce el tiempo de ejecución de una función a cambio de ampliar el coste del espacio (normalmente en memoria). Es decir, las funciones que han sido memoizadas ganan velocidad al usar un mayor espacio de memoria.

Si por ejemplo tenemos una función en la que introducimos el valor que genera un determinado output, se alacenaría en memoria, de manera que si vuelvo a solicitar ese output (sin cambiar el input) las siguientes veces se ejecutará de manera más rápida. La primera vez tardará más, pero las siguientes menos que si no está memoizado.

Vamos a ver un ejemplo de cuándo puede ser útil esto.

Imaginemos quie tenemos por un lado nuestra app, que tiene un botón en el que, cada vez que se pulsa, se vuelve a renderizar la página, porque cambia el estado (en este caso, aumenta el número con cada click)

```js
import React, { useState, useEffect } from 'react';
import './App.scss';
import Child from './components/child';

function App() {
  const [i, setI] = useState(0);

  function onClickHandle() {
    setI(i + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Memo</h1>
        <h2>{`I: ${i}`}</h2>
        <button onClick={onClickHandle}>Increment i</button>
        <h3>Normal render</h3>
        <Child />
      </header>
    </div>
  );
}

export default App;
```

Y una hija, que lo único que hace es pintar un valor, y este valor aumenta en uno cada vez que se renderiza la página.

```js
import React, {useEffect} from 'react';

let renderCount = 0;
function Child() {
  // Va a aumentar cada vez que se renderiza (Si es App quien usa este componente y hay algo en App que activa que se cambie, este cambio hará que también se active aquí este cambio, aun cuando no ha habido en realidadnada que haya cambiado en el hijo)
  useEffect(() => {
    renderCount ++;
  })

  return <div>renderCount: {renderCount}</div>
}

export default Child;
```

Si es App quien usa este componente y hay algo en App que activa que se cambie, este cambio hará que se vuelva a renderizar la página, incluido su elemento hijo, a pesar de que éste en realidad no ha cambiado o no tenía por qué cambiar.

¿Cómo controlamos eso? Con la memoization

* Si trabajáramos con clases, hay un método del ciclo de vida que se llama ```**componentShouldUpdate**```, donde podría comprobar las props y compararlas y tomar la decisión de que si la propiedad no ha cambiado no volver a renderizar ese componente.

* Trabajando con funciones y hooks, tenemos el hook useMemo

```js
import React, { useState, useMemo } from 'react';
import './App.scss';
import Child from './components/child';

function App() {
  const [i, setI] = useState(0);

  function onClickHandle() {
    setI(i + 1);
  }

  const memoChild = useMemo(() => {
    return <Child />
    // Si este segundo parámetro es un array vacío, no se ejecutará el render del hijo de nuevo, nunca
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Memo</h1>
        <h2>{`I: ${i}`}</h2>
        <button onClick={onClickHandle}>Increment i</button>
        <h3>Normal render</h3>
        <Child />
        <h3>Memo render</h3>
        {memoChild}
      </header>
    </div>
  );
}

export default App;
```

Si quisiéramos controlar que sí se renderice de nuevo el hijo en base al estado del padre, podríamos ponerlo en el array del segundo parámetro, para que escuche esa variable

```js
  const memoChild = useMemo(() => {
    return <Child />
    // Cuando cambie i, también se renderizará child
  }, [i])
```

## useLayoutEffect Hook

Es similar a useEffect, la diferencia es que se lanza de forma síncrona después de todos las mutaciones en el DOM, pero antes de que se haya pintado en el navegador.

**¿Cuándo es útil?**

Es recomendado cuando necesitas leer estilos computados después de que el DOM haya mutado, pero antes de que el navegador haya pintado el nuevo layout.

Así que si necesitas mutar el DOM o necesitas ejecutar algunas medidas, ya que te da la oportunidad de aplicar animaciones con la probabilidad de que los artefactos visuales o la render en el navegador tenga performance issues.  Con lo que verás que se usa mucho en librerías de animación.

Pero no hay que sustituir todos los useEffects, ya que el layoutEffect se ejecuta antes de que el navegador haya pintado, con lo que puede penalizar la performance si no es usado en casos necesarios.

**Ejemplo**

En este ejemplo, vamos a tener un componente con un contenido, que cambiará y pintará la altura y el vector del elemento según vaya creciendo (es decir, va cambiando el estilo computado)

```js
// App.js

import React, { useState, useRef, useLayoutEffect } from 'react';
import './App.scss';

//Esto es un custom hook que tendríamos que sacar a la carpeta de hooks
function useDim(el, val) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    let {height, width} = el.current.getBoundingClientRect();
    setHeight(height);
    setWidth(width);
  }, [val]);

  return {height, width};
}

function App() {
  const [val, setVal] = useState(2);
  const valRef = useRef(null);
  const {height, width} = useDim(valRef, val)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use LayoutEffect</h1>
        <h2>{`Height is : ${height}`}</h2>
        <h2>{`Width is : ${width}`}</h2>
        <h2 ref={valRef}>{`Value: ${val}`}</h2>
        <button onClick={() => setVal(val * 10)}>+ 10</button>
      </header>
    </div>
  );
}

export default App;
```

## Custom hooks: Contruir nuestro propio hook

Los hooks son meros intermediarios en los que puede recaer lógicas más complejas y así poder mantener nuestros componentes sin muchas responsabilidades.

### custom hook usando useState
Partiendo del ejemplo que teníamos de las listas:

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

Vamos a construir nuestro hook.

Crearemos en el directorio, dentro de src una carpeta llamada **hooks** y dentro iremos poniendo nuestros hooks que recordemos que deben comenzar por 'use', por ejemplo ```useList.js```

En él vamos a importat el hook useState y vamos a trasladar aquí la lógica de eliminar item y renombrar item

```js
// useList.js
import {useState} from 'react';

function useList(init) {
  const [list, setList] = useState(init);
  return {
    list,
    removeItem(name) {
      const filteredList = list.filter((item) => item.name !== name);
      setList(filteredList);
    },
    saveItem(index, newVal) {
      const copyList = [...list];
      copyList[index].name = newVal;
      setList(copyList);

    }
  }
}

export default useList;
```

Y ahora vemos cómo quedaría App.js. Hemos dejado comentado lo que había antes y que de este modo se eliminaría

```js
//App.js
import React, { useState } from 'react';
import './App.scss';
import Item from './components/item';
import useList from './hooks/useList';

const initList = [
  {name: "tomato", calories: 20},
  {name: "rice", calories: 30},
  {name: "candy", calories: 100},
]

function App() {
  // const [list, setList] = useState(initList);
  const listObject = useList(initList);
  const [editable, setEditable] = useState(false);

  const removeItem = (e) => {
    // const filteredList = list.filter((item) => item.name !== e.target.name);
    // setList(filteredList);
    listObject.removeItem(e.target.name);
  }

  const makeEditable = (e) => {
    e.preventDefault();
    setEditable(true);
  }
  
  const keyPressHandle = (e, index) => {
    if (e.key === 'Enter') {
      setEditable(!editable);
      // const copyList = [...list];
      // copyList[index].name = e.target.value;
      // setList(copyList);
      listObject.saveItem(index, e.target.value);

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
        {
          //Ahora en vez de list.map es el list que devuelve nuestro hook
        }
        {listObject.list.map((item, index) => {
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

### custom hook combinando useEffect y useRef

**usePrevious**

Vamos a crear un hook que me almacene el valor anterior:

Nuestro App quedaría así:

```js
//App.js
import React, { useState } from 'react';
import './App.scss';
import usePrevious from './hooks/usePrevious';

function App() {
  const [age, setAge] = useState(21);
  const previousAge = usePrevious(age);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use custom hook usePreviuos</h1>
        <h2>{`Current age: ${age}`}</h2>
        {previousAge ? <h2>{`Previous age: ${previousAge}`}</h2> : ''}
        <button onClick={() => setAge(age - 1)}>Make me younger</button>
      </header>
    </div>
  );
}

export default App;
```

Y este es el hook, que usa useEffect y useRef por dentro

```js
import {useEffect, useRef} from 'react';

function usePrevious(value) {
  // Inicializamos el valor de referencia
  const ref = useRef(null);
  useEffect(() => {
    // Lo igualamos al valor que viene de fuera, que es el anterior a haberse modificado
    ref.current = value;
  })

  return ref.current;
}

export default usePrevious;
```

### Custom hook: useCustomfetch

Seguramenteen tu aplicación, si es grande, tengas que hacer muchas llamadas a apis y en todas ellas siempre hay una plantilla parecida, con lo que puedes aprovechar la ventaja que te ofrece hacer tu propio hook y que simplemente se llame desde distintos sitios, dejando tu código más limpio y reusable.

```js
// Usando el custom hook en la app
import React, { useState } from 'react';
import './App.scss';
import useCustomFetch from './hooks/useCustomFetch';

function App() {
  const [url, setUrl] = useState(null);
  const [data, loading, error] = useCustomFetch(url);
  
  function getFollowers(e) {
    if (e.key === 'Enter') {
      setUrl(('https://api.github.com/users/' + e.target.value))
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use custom hook useCustomFetch</h1>
        <h2>Get Data from ID</h2>
        <input onKeyPress={getFollowers} />
        {loading && url && <div>Loading...</div>}
        {!loading && data && data.followers && <div>Followers: {data.followers}</div>}
        {error && <div>Error: {error}</div>}
      </header>
    </div>
  );
}

export default App;
```

El custom hook useCustomfetch

```js
import {useState, useEffect} from 'react';

function useCustomFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function customFetch(url) {
    try {
      let response = await fetch(url);
      let rData = await response.json();
      setData(rData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (url) {
        customFetch(url);
      }
    }, 3000)
  }, [url])

  return [data, loading, error]
}

export default useCustomFetch;
```


## useDebugValue HOOK

Es útil para debugear la aplicación en dev tools. Te puede poner una etiqueta en los custom hooks.

Partiendo del ejemplo que tenemos más abajo de un custom hook llamado usePrevious:

Con esta App

```js
//App.js
import React, { useState } from 'react';
import './App.scss';
import usePrevious from './hooks/usePrevious';

function App() {
  const [age, setAge] = useState(21);
  const previousAge = usePrevious(age);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use custom hook usePreviuos</h1>
        <h2>{`Current age: ${age}`}</h2>
        {previousAge ? <h2>{`Previous age: ${previousAge}`}</h2> : ''}
        <button onClick={() => setAge(age - 1)}>Make me younger</button>
      </header>
    </div>
  );
}

export default App;
```

Y este hook customizado usePrevious

```js
import {useEffect, useRef} from 'react';

function usePrevious(value) {
  // Inicializamos el valor de referencia
  const ref = useRef(null);
  useEffect(() => {
    // Lo igualamos al valor que viene de fuera, que es el anterior a haberse modificado
    ref.current = value;
  })

  return ref.current;
}

export default usePrevious;
```

Podemos usar el debug para mostrar una etiqueta en las dev tools de React

```js
import {useEffect, useRef, useDebugValue} from 'react';

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  })

  // Estas son las etiquetas que se mostrarán en las dev tools
  useDebugValue(ref.current > 18 ? 'Twoo much': 'Too little')

  return ref.current;
}

export default usePrevious;
```

Las react dev tools son muy útiles porque ahí puedes ver todos los hooks, los valores cambiando y los estados de redux fácilmente sin necesidad de tanto console.log.

## useContext 

👩‍💻 _Consultar en el archivo [React-Router.md](/doc/React-Router.md)_

## useReducer Hook

En otra lección hemos visto cómo se usa Redux, este hook tiene un comportamiento parecido a redux, pero viene incluida internamente en react y sólo se aplica al estado local, a diferencia de redux, que es para gestionar el estado de forma global.

Aunque si se usa useReducer junto con el hook useContext, podemos transformarlo en global.

### Ejemplo

Vamos a ver un ejemplo sencillo de una página con dos botones, uno que suma uno y otro que resta uno

Igual que redux, este hook recibe dos parámetros, la función reduced y el estado inicial. 

```js
  //App.js

  // Como hemos dicho, useReducer recibe dos parámetros: la función y el estado inicial
  // Lo que nosotros vamos a recibir son dos variables: el estado (que es el estado actual) y el dispatch, que nos va a permitir lanzar la acción 
  const [state, dispatch] =  useReducer(reducerFunction, initState);
```

Quedaría algo así

```js
// App.js

import React, {useReducer} from 'react';

import './App.scss';

const initState = {
  count: 0
}

function reducerFunction(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + 1} 
    case 'DECREMENT':
      return {count: state.count - 1}  
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] =  useReducer(reducerFunction, initState);

  function plusOne() {
    dispatch({type: 'INCREMENT'});
  }
  
  function minusOne() {
    dispatch({type: 'DECREMENT'});

  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>useReducer Example</h1>
        <h2>Count: {state.count}</h2>
        <button onClick={plusOne}>Plus one</button>
        <button onClick={minusOne}>Minus one</button>
      </header>
    </div>
  );
}

export default App;
```

Si quisiéramos que se use de manera global, habría que combinarlo con useContext hook.