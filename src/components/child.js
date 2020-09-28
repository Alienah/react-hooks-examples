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