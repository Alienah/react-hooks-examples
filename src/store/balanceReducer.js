const initialState = {
  balance: 0,
  loading: false,
};

// La función va a recibir dos parámetros: el estado inicial y la acción
function balanceReducer(state=initialState, action)  {
  // La acción va a tener dos cosas: el tipo (como por ejemplo deposit o withdraw) y el payload (el valor, que en este caso sería la cantidad que depositamos o que retiramos)
  switch(action.type) {
    //Nunca se debe modificar el state directamente, sino que creamos copias
    case 'DEPOSIT' : return { balance: state.balance + action.payload, loading: false}
    case 'WITHDRAW' : return { balance: state.balance + action.payload, loading: false}
    case 'LOADING' : return { ...state, loading: true}
    default: return state
  }
}

export default balanceReducer;