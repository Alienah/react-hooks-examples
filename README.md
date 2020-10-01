# REUSABLE COMPONENTS LIBRARY EXAMPLE

## Install

Run ```npm i``` to install all dependencies

## Run website

Run ```npm start``` to see the examples in [http://localhost:3000](http://localhost:3000) in the browser

ℹ️ This documentation is written in Spanish, as learning notes. For more information on how to start the project and what commands can be used, you can consult the documentation provided by React at [doc folder](/doc)

# 📝 MONTANDO UNA LIBRERÍA DE COMPONENTES REUSABLE.

Para ver un ejemplo de estructura de carpetas, puedes ver la que tenemos en este mini proyecto. Por ahora sólo tenemos un botón, pero nos podemos hacer una idea de cómo podría ir creciendo.

Una de las cuestiones a tener en cuenta cuando estás montando una librería de componentes es documentarla bien para que pueda ser usada por terceros, ya que podrían consumir tus componentes para sus aplicaciones.

Hay diferentes librerías que nos ayudan enormemente con esa tarea. Ejemplos de librerías para documentar:

* Styleguidist
* Storybook

De momento vamos a hablar de Styleguidist, pero en un futuro añadiremos ejemplos con storybook

## STYLEGUIDIST

### Install

```npm install react-styleguidist --save-dev```

### How to use

Buscará en el proyecto los componentes, así que si no los tienes creados en la estructura src/componentes, que es la ruta que busca por defecto, tendrás que configurarla.

Se basa en webpack, que como hemos creado la aplicación con create-react-app, ya viene instalado.

Lo único que tendríamos que hacer, por tanto, es crear el archivo con la documentación que leerá **styleguidist**

### Ejemplo

En nuestra carpeta src/components/Button tenemos este botón

```js
// Button.js

import React from 'react';
import './../../styles/common.scss';
import './Button-style.scss'

function Button({children, type, onClick}) {
  let localClass = 'primary';
  if (type === 'primary') {
    localClass = 'primary';
  }
  if (type === 'secondary') {
    localClass = 'secondary';
  }
  if (type === 'disabled') {
    localClass = 'disabled';
  }
  const classes = `bg-yellow font-black vertical-pad-8 width100 radius15 ${localClass}`

  return (
  <div className="button">
    <button onClick={onClick} className={classes}>{children}</button>
  </div>
  )
}

export default Button;
```
Vamos a crear un README.md

```md
# Default Button

```js
<Button>Click me</Button>
```

# Primary Button

```js
<Button type="primary">Click me</Button>
```

# Secondary Button

```js
<Button type="secondary">Click me</Button>
```

# Disabled Button

```js
<Button type="disabled">Click me</Button>
```
```

Y ejecutamos:

```bash
npx styleguidist server
```

### Modificadores

**noeditor**

Si quisiéramos limilarlo para que no se vea el código en la web, sólo el ejemplo del componente en sí, pondríamos la etiqueta ```noeditor```

```md
# Disabled Button

```js noeditor
<Button type="disabled">Click me</Button>
```
```
```

**static**

Si queremos que sí se muestre el código, pero que no se pueda modificar, y que no muestre la renderización, usamos ```static```.

Por ejemplo para ejemplos de código en los que se muestra cómo se importa algo o código en general que no quieres que se ejecute en la guía.

### Decoradores para documentar

También podríamos añadir en el propio componente decoradores que se mostrarán en la página al inicio.

Podríamos añadir por ejemplo:

```js
import React from 'react';
import './../../styles/common.scss';
import './Button-style.scss'

/**
 * @deprecated Don't use this componente after 2020
 * @author [Aida Albarrán](https://github.com/Alienah)
 * @version 1.0.0
 */
function Button({children, type, onClick}) {
  let localClass = 'primary';
  if (type === 'primary') {
    localClass = 'primary';
  }
  if (type === 'secondary') {
    localClass = 'secondary';
  }
  if (type === 'disabled') {
    localClass = 'disabled';
  }
  const classes = `bg-yellow font-black vertical-pad-8 width100 radius15 ${localClass}`

  return (
  <div className="button">
    <button onClick={onClick} className={classes}>{children}</button>
  </div>
  )
}

export default Button;
```