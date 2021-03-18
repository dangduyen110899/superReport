import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import account from 'api/account/sign';
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const SignIn = () => {
  const history = useHistory()
  const { handleSubmit, register, errors } = useForm();
  const [errorSignin, setErrorSignin] = useState(null)
  const onSubmit = data => {
    const signinAcc = async () => {
      try {
        await account.signIn(data).then( response => {
          Cookies.set("user", JSON.stringify(response.data)) 
          history.push('/admin/student')
        })
      } catch (error) {
        setErrorSignin(error.response.data.message)
      }
    };
    signinAcc()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Sign in: </h1>
    <div>
      <input
        name="email"
        ref={register({ required: "This is required message" })}
      />
      <ErrorMessage errors={errors} name="email" as="p" className="form_email-validate"/>
    </div>
    <div>
      <input
        name="password"
        ref={register({ required: "This is required message" })}
      />
      <ErrorMessage errors={errors} name="password" as="p" className="form_email-validate"/>
      {
        errorSignin && <p className="form_email-validate">{errorSignin}</p>
      }
    </div>
    <button type="submit">Sign in</button>
  </form>
  );
};

export default SignIn;