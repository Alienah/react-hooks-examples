import React from 'react';
import './button.scss';

function button({label}) {
  return <div data-testid="button" className="button">{label}</div>
}

export default button;