import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function WithdrawPage() {
  const balance = useSelector(state => state.balanceReducer.balance);
  const dispatch = useDispatch();
  function withdrawHandle() {
    dispatch({
      type: "DEPOSIT",
      payload: -10
    })
  }
  return (
    <div>
      <h1>Welcome to WithdrawPage</h1>
      <p>Balance is {balance}</p>
      <button onClick={withdrawHandle}>Withdraw</button>
    </div>
  )
}

export default WithdrawPage;