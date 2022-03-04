import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  const [account, setAccount] = useState<string|undefined>(undefined);

  const web3Provider = 'http://localhost:7545';

  const loadBlockchainData = async () => {
    const web3 = new Web3(web3Provider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>{`Your account: ${account}`}</p>
    </div>
  );
}

export default App;
