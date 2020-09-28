import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function HomeBankPage() {
  //Usamos el hook useSelector porque no queremos mostrar todo el estado en nuestra página, sino sólo el balance
  //Accedemos al estado del objeto reducer correspondiente
  const balance = useSelector(state => state.balanceReducer.balance);
  const loan = useSelector(state => state.loanReducer.loan);
  const dispatch = useDispatch();

  function applyLoanHandle() {
    dispatch({
      type: 'APPLY'
    })
  }
  return (
    <div>
      <h1>Welcome to Homepage</h1>
      <p>Balance is {balance}</p>
      <h2>{loan ? 'Loan Applied' : 'Loan needed'}</h2>
      <button 
        onClick={applyLoanHandle}
        disabled={loan ? true : false}
      >{loan ? 'Loan applied' : 'Apply for loan'}</button>
    </div>
  )
}

export default HomeBankPage;