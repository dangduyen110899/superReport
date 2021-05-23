import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Space, Row, Button} from 'antd';
import { ErrorMessage } from "@hookform/error-message";
import Autocomplete from 'react-autocomplete';

const FormQuota = ({handleOk, handleCancel, itemEdit}) => {
  let defaultValues = {
    position: itemEdit?.position,
    rate: itemEdit?.rate,
  };
  const { handleSubmit, register, errors } = useForm({ defaultValues });

  return (
  <div className="form-login addLecturer" style={{padding: "0px"}}>
  <div className="row justify-content-center">
    <div className="col-md-12">
      <div className="form-login__content">

        <div className="form-login__form login d-flex flex-column justify-content-center mb-2">
          <form className="login-form" onSubmit={handleSubmit(data => handleOk(data, itemEdit?.id))}>
            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Chức vụ:</label>
              </div> 
              <input
                name="position"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="position" as="p" className="form_email-validate"/>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Tỉ lệ:</label>
              </div> 
              <input
                name="rate"
                type="number"
                className="form-input"
                style={{width: '90%',
                  float: 'left'}}
                ref={register({ required: "This is required message" })}
              />%
              <ErrorMessage errors={errors} name="rate" as="p" className="form_email-validate"/>
            </div>
            <br/>
            <div className="d-flex justify-content-between">
                <Button type="primary" htmlType="submit">Lưu</Button>
              <Button onClick={() => handleCancel()}>Hủy</Button>
            </div>
          </form>
        </div>
      </div>  
    </div>

  </div>
</div>
  );
};

export default FormQuota;