import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Space, Row, Button} from 'antd';
import {Input, InputNumber} from 'antd';
import { ErrorMessage } from "@hookform/error-message";

const FormTkb = ({handleOk, handleCancel, itemEdit}) => {
  let defaultValues = {
    name: itemEdit?.name,
    email: itemEdit?.email,
    programs: itemEdit?.programs,
  };
  const { handleSubmit, control, errors } = useForm({ defaultValues });

  return (
    <h1>chua lam</h1>
  );
};

export default FormTkb;