import {useEffect, useState, useCallback} from 'react';
import {ethers} from 'ethers';


type State = ethers.utils.Deferrable<ethers.providers.TransactionRequest> | undefined;

const useTransaction = (from: string, to: string, amount: string, provider: ethers.providers.Web3Provider) : [State] => {
    const [transaction, setTransaction] = useState<State>(undefined);
    console.log('beggining transaction');
    const gasLimit = 21000;

    const getNonce = useCallback(async () => {
        console.log('getting nonce');
        const nonce = await provider.getTransactionCount(from);
        console.log({nonce});
        return nonce;
    }, [from, provider]);

    const getGas = useCallback(async () => {
        const gas = await provider.getGasPrice()
        console.log({gas});
        return gas.toNumber();
    }, [provider]);



    useEffect(() => {
        const getTransaction = async () => {
            const gasPrice = await getGas();
            const nonce = await getNonce();            
            // Creating a transaction
            const tx : State = {
                from: from,
                to: to,
                value: ethers.utils.parseEther(amount),
                nonce: nonce,
                gasPrice: ethers.utils.hexlify(gasPrice),
            };
            setTransaction(tx);
        };
        getTransaction()
    }, [amount, from, getGas, getNonce, to]);

    return [transaction];

};




export default useTransaction;