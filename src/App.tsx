import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState<string|undefined>(undefined);

  const loadBlockchainData = async () =>  {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0]);
  }

  useEffect(() => {
    loadBlockchainData();
  }, []);
  
  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>Your account: {account}</p>
  </div>
  );
}

export default App;
