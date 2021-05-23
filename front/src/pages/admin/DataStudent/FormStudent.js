import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Space, Row, Button} from 'antd';
import { ErrorMessage } from "@hookform/error-message";

const FormStudent = ({handleOk, handleCancel, itemEdit}) => {

  let defaultValues = {
    code: itemEdit?.code,
    name: itemEdit?.name,
    birthday: itemEdit?.birthday,
    address: itemEdit?.address,
    gender:  itemEdit?.gender,
    classCode:  itemEdit?.classCode,
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
                <label className="form-label">Mã sinh viên:</label>
              </div> 
              <input
                name="code"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="code" as="p" className="form_email-validate"/>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Tên sinh viên:</label>
              </div> 
              <input
                name="name"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="name" as="p" className="form_email-validate"/>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Ngày sinh:</label>
              </div> 
              <input
              type="date"
                name="birthday"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="birthday" as="p" className="form_email-validate"/>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Giới tính:</label>
                <select name="gender" ref={register()} className="form-input" style={{    width: "75%"}}>
                  <option>Nam</option>
                  <option>Nữ </option>
                </select>
              </div> 
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Địa chỉ:</label>
              </div> 
              <input
                name="address"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="address" as="p" className="form_email-validate"/>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Mã lớp học:</label>
              </div> 
              <input
                name="classCode"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="classCode" as="p" className="form_email-validate"/>
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

export default FormStudent;