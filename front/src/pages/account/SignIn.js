import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import account from 'api/account/sign';
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import signin from "../../assets/images/signin.png"

const SignIn = () => {
  const history = useHistory()
  const { handleSubmit, register, errors } = useForm();
  const [errorSignin, setErrorSignin] = useState(null)
  const [showPAss, setshowPAss] = useState(false)
  const onSubmit = data => {
    const signinAcc = async () => {
      try {
        await account.signIn(data).then( response => {
          Cookies.set("user", JSON.stringify(response.data)) 
          window.location.href = "/report"
        })
      } catch (error) {
        setErrorSignin(error.response?.data?.message)
      }
    };
    signinAcc()
  }

  return (
  <div className="form-login">
    <div className="row justify-content-center">
      <div className="col-md-12 col-lg-10 col-xl-8 row justify-content-center d-flex  bd-radius">

        <div className="form-login__content col-md-6">

          <div className="form-login__header">
            <h2 className="form-login__header-title text-center mb-2">Đăng nhập</h2>
            <p className="form-login__header-description text-center">Vui lòng đăng nhập để sử dụng hệ thống</p>
          </div>

          <div className="form-login__form login d-flex flex-column justify-content-center mb-2">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Email đăng nhập:</label>
              </div> 
                <input
                  name="email"
                  className="form-input"
                  onChange={() => setErrorSignin('')}
                  ref={register({ required: "This is required message" })}
                />
                <ErrorMessage errors={errors} name="email" as="p" className="form_email-validate"/>
              </div>

              <div className="form-login__form-group">
                <div className="d-flex justify-content-between">
                <label className="form-label">Mật khẩu:</label>
              </div> 
                <input
                    type={showPAss ? "text" : "password"}
                    name="password"
                    className="form-input"
                    onChange={() => setErrorSignin('')}
                    ref={register({ required: "This is required message" })}
                  />
                  <ErrorMessage errors={errors} name="password" as="p" className="form_email-validate"/>
                  {
                    errorSignin && <p className="form_email-validate">{errorSignin}</p>
                  }
              </div>

              <div className="form-login__form-group" style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                  <input name="showPass" id="showPass" type="checkbox" onChange={() => setshowPAss(!showPAss)}/>
                  <label className="remenber" htmlFor="showPass">Show password</label>
                </div>

                <div>
                  <input name="remember" id="remember" type="checkbox"/>
                  <label className="remenber" htmlFor="remember">Ghi nhớ đăng nhập</label>
                </div>

              </div>

              <button type="submit" className="form-login__form-submit" >Đăng nhập</button>
            </form>
          </div>

          <div className="form-login__form-help">
            {/* <div className="text-center">
              <a href="" className="forgot-password">Quên mật khẩu?</a>
            </div> */}
          </div>

        </div>
      </div>

    </div>
  </div>
  );
};

export default SignIn;