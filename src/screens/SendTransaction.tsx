import React from 'react';
import { useParams } from 'react-router-dom';

function SendTransaction() {

    const { account, balance } = useParams()

  return (
    <div className="container">
        <h1>Account:</h1>
            {account && <p>{`Your account: ${account}`}</p>}
        <h2>Balance:</h2>
        {balance && <p>{`Your account: ${balance}`}</p>}
    </div>
  );
}

export default SendTransaction;
