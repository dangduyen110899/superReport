import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select , Space, Row, Button, Input} from 'antd';

const { Option } = Select;

export default function FormPractice({handleOkAddYear, handleCancel}) {
  const { handleSubmit, control, register } = useForm();
  const [fileKltn, setFileKltn] = useState()
  return (
    <form onSubmit={handleSubmit(data => handleOkAddYear(data.year, data.semester, fileKltn))}>
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
          <input type="file" name="practice" onChange={e => setFileKltn(e.target.files[0])}/>
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
