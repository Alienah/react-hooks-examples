import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const h1Element = getByText(/Example with typescript/i);
  expect(h1Element).toBeInTheDocument();
});
