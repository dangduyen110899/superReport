import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select , Space, Row, Button, Input} from 'antd';

const { Option } = Select;

export default function FormConsultant({handleOkAddYear, handleCancel}) {
  const { handleSubmit, control } = useForm();
  const [fileKltn, setFileKltn] = useState()
  return (
    <form onSubmit={handleSubmit(data => handleOkAddYear(data.year, data.semester, fileKltn))}>
      <Space direction="vertical">
        <Row>
          <Space direction="vertical">
            <Space>
              <label>Chọn học kỳ</label>
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
            <Space>
              <label >Chọn năm học <br/>(định dạng: 20xx-20yy)</label>
              <Controller
                as={
                  <Input/>
                }
                name="year"
                control={control}
              />
            </Space>
            </Space>
          </Row>
          <Row>
          <label htmlFor="actual-btn" class="upload-file" style={{ zIndex: 1}}>Chọn file cố vấn học tập</label>
          <input type="file" name="consultant" onChange={e => setFileKltn(e.target.files[0])} id="actual-btn" style={{position: 'absolute',
    top: '192px',
    left: '153px'}}/>
          </Row>
        <Row>
    </Row>
    </Space>
    <div  className="d-flex justify-content-between mt-3">
          <Button type="primary" htmlType="submit">Save</Button>
          <Button onClick={() => handleCancel()}>Cancel</Button>
        </div>
  </form>
  )
}
