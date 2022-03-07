import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    sendTo: string,
    sendAmmount: string,
  };

  interface SubmitTransactionProps {
    account: string;
    balance: string;
}

  const SubmitTransaction = ({ account, balance }: SubmitTransactionProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const navigate = useNavigate()
    
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
        // path="confirm/:account/:to/:amount"
        const url = `/confirm/:${account}/:${data.sendTo}/:${data.sendAmmount}`
        navigate(url, { replace: true });
    };

    return (
        <div className="container">
            <h1 className='title'>Send Tokens</h1>
            <form className='"mb-3"' onSubmit={handleSubmit(onSubmit)}>
                <label>Address</label>
                <input {...register("sendTo", { required: true })} />
                <label>Amount</label>
                <input placeholder='amount' {...register("sendAmmount", { min: 0.0000001, max: balance })} />
                {errors.sendTo && <span>This field is required</span>}
                {errors.sendAmmount?.type === 'min' && <span>This field must be a value greater than 0.0000001 ETH</span>}
                {errors.sendAmmount?.type === 'max' && <span>{`This field must be a value smaller than your balance of ${balance} ETH`}</span>}
                <input type="submit" />
            </form>
        </div>
      );
};


function SendTransaction() {
    const { account, balance } = useParams();
    
    return  (account !== undefined && balance!== undefined)  ? <SubmitTransaction account={account} balance={balance} /> : null
}

export default SendTransaction;
