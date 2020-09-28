import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as balanceActions from '../actions/balanceActions';

function DepositPage() {
  const balance = useSelector(state => state.balanceReducer.balance);
  const loan = useSelector(state => state.loanReducer.loan);
  const loading = useSelector(state => state.balanceReducer.loading);
  const dispatch = useDispatch();
  function onDepositHandle() {
    dispatch(balanceActions.depositAsync());
  }
  return (
    <div>
      <h1>Welcome to DepositPage</h1>
      {
        loading
        ? <p>Saving...</p> 
        : <p>Balance is {balance}</p>
      }
      <button onClick={onDepositHandle}>Deposit</button>
      <h2>{loan ? 'Loan Applied' : 'Loan needed'}</h2>
    </div>
  )
}

export default DepositPage;