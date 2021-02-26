import React, { useState, useEffect } from 'react';
import {
  Table,
  Row,
  Col,
  Modal,
  Button,
} from 'antd';
import FormAddData from './FormAddData';
import UploadFile from './UploadFile';
import Search from '../component/Search';
import callAdmin from 'api/admin/Upload'
import LayoutAdmin from '../Layout';
import { toast } from "react-toastify";

export default function TableDataExcel({match}) {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataShow, setDataShow] = useState([])

  const handleOk = (add) => {
    const setYear = async () => {
      try {
        await callAdmin.setYear(add).then(res => {
          setDataShow([{
            year: add.year,
            semester: add.semester,
          }])
          setData([...data, {
            year: add.year,
            semester: add.semester,
          }])
          setIsModalVisible(false);
        })
      } catch (error) {
        toast.warning(error?.response?.data?.message);
      }
    };
    setYear();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpload = (record, dataFile, name) => {
    const formData = new FormData();
    formData.append('file', dataFile)
    formData.append('year', record.year)
    formData.append('semester', record.semester)
    const uploadFile = async () => {
      try {
        await callAdmin.upload(formData, name).then(res => {
          const dataNew = [...data];
          dataNew.forEach(element => {
            if (element.id===record.id) {
              element[name] = dataFile.name
            }
          })
          setData([...dataNew]);

          record[name] = dataFile.name
          setDataShow([record]);
          toast.success(`Upload ${name.slice(4,name.length).toLowerCase()} success!`);
        })
      } catch (error) {
        console.log("failed to request API: ", error);
      }
    };
    uploadFile();
  }

  let columns = [
    {
      title: 'TKB',
      key: 'tkb',
      render: (text, record) => (
        <UploadFile record={record} handleUpload={handleUpload} name={"nameTkb"}/>
      ),
      width:120,
    },
    {
      title: 'KLTN',
      key: 'kltn',
      render: (text, record) => (
        <UploadFile record={record} handleUpload={handleUpload} name={'nameKltn'}/>
      ),
      width:120,
    },
    {
      title: 'DATN',
      key: 'datn',
      render: (text, record) => (
        <UploadFile record={record} handleUpload={handleUpload} name={'nameDatn'}/>
      ),
      width:120,
    },
    {
      title: 'LVTS',
      key: 'lvts',
      render: (text, record) => (
        <UploadFile record={record} handleUpload={handleUpload} name={'nameLvts'}/>
      ),
      width:120,
    },
    {
      title: 'LATS',
      key: 'lvts',
      render: (text, record) => (
        <UploadFile record={record} handleUpload={handleUpload} name={'nameLats'}/>
      ),
      width:120,
    },
    {
      title: 'CVHT',
      key: 'cvht',
      render: (text, record) => (
        <UploadFile record={record} handleUpload={handleUpload} name={'nameCvht'}/>
      ),
      width:120,
    },
    {
      title: 'TTTD',
      key: 'tttd',
      render: (text, record) => (
        <UploadFile record={record} handleUpload={handleUpload} name={'nameTttd'}/>
      ),
      width:120,
    },
  ];

  const onSearch = (key) => {
    const arrTemp = key ? key.split(' ') : [];
    const dataTemp = data.filter(item => item.year===arrTemp[0] && item.semester==arrTemp[1])
    setDataShow(dataTemp)
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await callAdmin.data().then(res =>
          {
            setData(res.data.content);
            setDataShow([res.data.content[res.data.content.length-1]]);
          }
        )
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, []);

  return (
    <LayoutAdmin match={match}>
      <Row justify="space-between">
        <Col>
          <Search onSearch={onSearch} data={data}/>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            + Thêm năm học
          </Button>
        </Col>
      </Row>

      <Modal
        title="Select time"
        footer={null}
        destroyOnClose
        onCancel={handleCancel}
        visible={isModalVisible}
      >
        <FormAddData handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>
      <br/>

      {/* {
        data.length>0 ? <p>Học kì: {data[data.length-1]?.semester==1 ? 'I' : 'II'}, năm học: {data[data.length-1]?.year}</p>
        : <p>Năm học chưa tồn tại!.</p>
      } */}

      <Table
        columns={columns}
        dataSource={dataShow}
        bordered
        pagination={false}/>
    </LayoutAdmin>
  );
}
