import React from 'react';
import { ethers, Transaction, utils } from 'ethers';

interface Props {
    transaction: Transaction
}

function CondfirmTransaction({transaction}: Props) {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// get a signer wallet!
const signer = provider.getSigner();

// Creating a transaction param
// const tx = {
//     from: DefaultAccount,
//     to: "0x611E72c39419168FfF07F068E76a077588225798",
//     value: ethers.utils.parseEther("0.05"),
//     nonce: await provider.getTransactionCount(DefaultAccount, "latest"),
//     gasLimit: ethers.utils.hexlify(10000),
//     gasPrice: ethers.utils.hexlify(parseInt(await provider.getGasPrice())),
// };

// signer.sendTransaction(transaction).then((transaction) => {
//     console.dir(transaction);
//     alert("Send finished!");
// });

  return (
    <div className="container">
      <h1>Confirm Transaction</h1>
    </div>
  );
}

export default CondfirmTransaction;
