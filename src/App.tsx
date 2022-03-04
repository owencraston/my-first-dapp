import React, { useEffect, useState, useMemo} from 'react';
import './App.css';
import { ethers } from "ethers";

declare var window: any

function App() {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider =  useMemo(() => new ethers.providers.Web3Provider(window.ethereum, "any"), [])
  const [account, setAccount] = useState<string|undefined>(undefined);
  useEffect(() => {

  const loadAccounts = async () => {
    console.log("fetching adddress")
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const userAddress = await signer.getAddress();
    console.log(userAddress)
    setAccount(userAddress)
  };

    loadAccounts()
  }, [provider]);

  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>{`Your account: ${account}`}</p>
    </div>
  );
}

export default App;
