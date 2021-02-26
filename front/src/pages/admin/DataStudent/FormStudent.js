import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Space, Row, Button} from 'antd';
import {Input} from 'antd';
import { ErrorMessage } from "@hookform/error-message";

const FormStudent = ({handleOk, handleCancel, itemEdit}) => {
  let defaultValues = {
    name: itemEdit?.name,
    code: itemEdit?.code,
    classCode: itemEdit?.classCode,
  };
  const { handleSubmit, control, errors } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(data => handleOk(data, itemEdit?.id))}>
      <div style={{display: "flex",
    justifyConent: "center", fontSize: "1rem"}}>
      <Space direction="vertical">
        <Row>
          <Space>
          <label >Name student</label>
          <Controller
            as={
              <Input/>
            }
            name="name"
            control={control}
            rules={{ required: "The field is required!" }}/>
          <ErrorMessage errors={errors} name="singleErrorInput" as="p" />
          </Space>
        </Row>
        <Row>
        <Space>
          <label >Code student</label>
          <Controller
            as={
              <Input/>
            }
            name="code"
            control={control}
            rules={{ required: true }}/>
            </Space>
        </Row>
        <Row>
        <Space>
          <label >Class code</label>
          <Controller
            as={
              <Input/>
            }
            name="classCode"
            control={control}
            rules={{ required: true }}/>
          </Space>
        </Row>
        <Row direction="vertical">
          <Space>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={() => handleCancel()}>Cancel</Button>
          </Space>
        </Row>
      </Space>
      </div>
  </form>
  );
};

export default FormStudent;