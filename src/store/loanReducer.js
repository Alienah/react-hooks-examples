const initialState = {
  loan: false
};

function loanReducer(state=initialState, action)  {
  switch(action.type) {
    case 'APPLY' : return { loan: true }
    default: return state
  }
}

export default loanReducer;