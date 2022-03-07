import React, { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import useTransaction from '../hooks/useTransaction';
import { useParams } from 'react-router-dom';


interface Props {
  from: string;
  to: string;
  amount: string;
}

const CondfirmTransactionComponent = ({from, to, amount}: Props)  => {
  const provider = useMemo(() => new ethers.providers.Web3Provider(window.ethereum), []);
  const [transactionRequest] = useTransaction(from, to, amount, provider);
  const [transactionResponse, setTransactionResponse] = useState<undefined | ethers.providers.TransactionResponse>(undefined);

  const signer = provider.getSigner();

  useEffect(() => {
      if (transactionRequest !== undefined) {
          signer.sendTransaction(transactionRequest).then((transaction) => {
              console.dir(transaction);
              alert("Send finished!");
              setTransactionResponse(transaction);
          });
      }
  }, [signer, transactionRequest]);

  return (
      <div className="container">
      <h1>Confirm Transaction</h1>
      {transactionResponse === undefined ? <p>Transaction is pending</p> : <p>{`Transaction confirmed: ${transactionResponse.hash}`}</p>}
      </div>
  );
}

function CondfirmTransaction() {
  const { account, to, amount } = useParams();
  
  return  (account !== undefined && to!== undefined && amount!== undefined)  ? <CondfirmTransactionComponent from={account} to={to} amount={amount} /> : null
}


export default CondfirmTransaction;