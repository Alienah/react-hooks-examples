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