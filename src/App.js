import React, {useState} from 'react';
import { 
  BrowserRouter, 
  Route,
  NavLink,
} from 'react-router-dom';
import HomeBankPage from './pages/HomeBankPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                className="App-link"
                to="/"
                exact
                activeClassName="link-active"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="App-link"
                to="/deposit"
                exact
                activeClassName="link-active"
              >
                Make deposit Page
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="App-link"
                to="/withdraw"
                exact
                activeClassName="link-active"
              >
                Withdraw Page
              </NavLink>
            </li>
          </ul>
          <Route path="/" exact component={HomeBankPage}/>
          <Route path="/deposit" exact component={DepositPage}/>
          <Route path="/withdraw" exact component={WithdrawPage}/>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;