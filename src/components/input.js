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