import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select , Space, Row, Button, Input} from 'antd';

const { Option } = Select;

export default function FormAddYear({handleOkAddYear, handleCancel}) {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(data => handleOkAddYear(data.year, data.semester))}>
      <Space direction="vertical">
        <Row>
          <Space direction="vertical">
            <Space>
              <label >School  Year (format: xxxx-yyyy)</label>
              <Controller
                as={
                  <Input/>
                }
                name="year"
                control={control}
              />
            </Space>

            <Space>
              <label>Semester</label>
              <Controller
                as={
                  <Select placeholder="Select semester">
                    <Option value={1}>I</Option>
                    <Option value={2}>II</Option>
                  </Select>
                }
                name="semester"
                control={control}
              />
            </Space>
            </Space>
          </Row>
        <Row>
        <Space>
          <Button type="primary" htmlType="submit">Save</Button>
          <Button onClick={() => handleCancel()}>Cancel</Button>
        </Space>
    </Row>
    </Space>
  </form>
  )
}
