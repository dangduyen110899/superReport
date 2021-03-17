import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import account from 'api/account/sign';
import Cookies from "js-cookie";

const SignIn = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = data => {
    const signinAcc = async () => {
      try {
        await account.signIn(data).then( response => {
          console.log(response)
          if (response.data.token) {
            Cookies.set("user", JSON.stringify(response.data)) 
            console.log(response.data);
          }
        })
      } catch (error) {
        console.log("failed to request API: ", error)
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
    </div>
    <button type="submit">Sign in</button>
  </form>
  );
};

export default SignIn;