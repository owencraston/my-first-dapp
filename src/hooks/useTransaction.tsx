import {useEffect, useState, useCallback} from 'react';
import {ethers} from 'ethers';


type State = ethers.utils.Deferrable<ethers.providers.TransactionRequest> | undefined;

const useTransaction = (from: string, to: string, amount: string, provider: ethers.providers.Web3Provider) : [State] => {
    const [transaction, setTransaction] = useState<State>(undefined);
    console.log('beggining transaction');

    const getNonce = useCallback(async () => {
        const gas = await provider.getTransactionCount(from, "latest");
        return gas;
    }, [from, provider]);

    const getGas = useCallback(async () => {
        const gas = await provider.getGasPrice()
        return gas.toNumber;
    }, [provider]);


    useEffect(() => {
        const getTransaction = async () => {
            const nonce = await getNonce();
            const gasPrice = await getGas();
            // Creating a transaction
            const tx : State = {
                from: from,
                to: to,
                value: ethers.utils.parseEther(amount),
                nonce: nonce,
                gasLimit: ethers.utils.hexlify(10000),
                gasPrice: ethers.utils.hexlify(gasPrice()),
            };
            setTransaction(tx);
        };
        getTransaction()
    }, [amount, from, getGas, getNonce, to]);

    return [transaction];

};




export default useTransaction;