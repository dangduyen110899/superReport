import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select , Space, Row, Button} from 'antd';

const { Option } = Select;

export default function FormAddData({handleOk, handleCancel}) {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(data => handleOk(data))}>
      <Space direction="vertical">
        <Row>
          <Space>
            <Space>
              <label >School  Year</label>
              <Controller
                as={
                  <Select placeholder="Select year school">
                    <Option value={"2015-2016"}>2015-2016</Option>
                    <Option value={"2016-2017"}>2016-2017</Option>
                    <Option value={"2017-2018"}>2017-2018</Option>
                    <Option value={"2018-2019"}>2018-2019</Option>
                    <Option value={"2019-2020"}>2019-2020</Option>
                    <Option value={"2020-2021"}>2020-2021</Option>
                  </Select>
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
