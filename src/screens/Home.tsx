import React, { useEffect, useState, useMemo, useCallback} from 'react';
import { ethers } from "ethers";
import {Link } from "react-router-dom";

function Home() {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider =  useMemo(() => new ethers.providers.Web3Provider(window.ethereum, "any"), [])
  const [account, setAccount] = useState<string|undefined>(undefined);
  const [balance, setSetBalance] = useState<string|undefined>(undefined);
  
  useEffect(() => {
  const loadAccounts = async () => {
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const userAddress = await signer.getAddress();
    setAccount(userAddress)
  };

    loadAccounts()
  }, [provider]);

  const getBalance = useCallback(async (wallet: string) =>  {
    const balance = await provider.getBalance(wallet);
    // we use the code below to convert the balance from wei to eth
    setSetBalance(ethers.utils.formatEther(balance));
}, [provider]);

  useEffect(() => {
    if (account !== undefined) {
      getBalance(account);
    } 
  }, [account, getBalance]);


  return (
    <div className="container">
      <h1>Account:</h1>
      {account && <p>{`Your account: ${account}`}</p>}
      <h2>Balance:</h2>
      {balance && <p>{`Your account: ${balance}`}</p>}
      <nav>
        <Link to={`/send/${account}/${balance}`}>Send tokens</Link>
      </nav>
    </div>
  );
}

export default Home;
