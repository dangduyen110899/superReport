import React, {useState, useEffect, useMemo} from 'react';
import LayoutAdmin from '../Layout';
import {   DeleteOutlined,
  EditOutlined } from '@ant-design/icons';
import {
  Table,
  Row,
  Col,
  Popconfirm,
  Button,
  Modal,
  Space
} from 'antd';
import callAdmin from 'api/admin/Tkb';
import { toast } from "react-toastify";
import FormAddYear from '../component/FormAddYear';
import Select from '../component/Select';
import FormTkb from './FormTkb';

export default function TableTkb({match}) {
  const [data, setData] = useState([])
  const [yearShow, setYearShow] = useState(['All'])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('')
  const [showFormCheckyear, setShowFormCheckyear] = useState(true)

  const handleOkAddYear = (yearItem, semesterItem) => {
    const add = async () => {
      try {
        await callAdmin.checkYear({year: yearItem, semester: semesterItem}).then(() => {
          setYearShow([`${semesterItem} ${yearItem}`,...yearShow]);
          setIsModalVisible(false);
          toast.success("Add year success!");
        })
      } catch (error) {
        toast.warning(error?.response?.data?.message);
      }
    };
    add();
  };

  const handleCancel = () => {
    setItemEdit(null)
    setIsModalVisible(false);
  };

  const handleDelete = (itemEdit) => {
    itemEdit.status = 0;
    const remove = async () => {
      try {
        await callAdmin.editTkb(itemEdit).then(res =>
         {
          const dataNew = data.filter(item => item.id!==itemEdit.id)
          setData(dataNew)
         }
        )
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    remove();
  }

  let columns = [
    {
      title: 'year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'semester',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: 'subjectCode',
      dataIndex: 'subjectCode',
      key: 'subjectCode',
    },
    {
      title: 'classSubjectCode',
      dataIndex: 'classSubjectCode',
      key: 'classSubjectCode',
    },
    {
      title: 'lecturerId',
      dataIndex: 'lecturerId',
      key: 'lecturerId',
    },
    {
      title: 'day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'total_student',
      dataIndex: 'total_student',
      key: 'total_student',
    },
    {
      title: 'total_tc',
      dataIndex: 'total_tc',
      key: 'total_tc',
    },
    {
      title: 'job',
      dataIndex: 'job',
      key: 'job',
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <Space>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <span><DeleteOutlined /></span>
          </Popconfirm>
          <span onClick={() => { setItemEdit(record); setIsModalVisible(true)}}>
          <EditOutlined />
          </span>
          </Space>
        ) : null,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        await callAdmin.tkb(year,semester).then(res =>
          setData(res.data.data)
        )
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [year, semester]);

  useEffect(() => {
    const getData = async () => {
      try {
        return await callAdmin.tkb('','')
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData().then(res =>
      {
        let arrString = res.data.data.map(item => item.semester + ' ' + item.year)
        const arr = arrString.filter((item, index) => arrString.indexOf(item) === index);
        setYearShow(['All',...arr])
      }
    )
  }, []);

  const handleAddTkbs = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append('year', year)
    formData.append('semester', semester)
    const adds = async () => {
      try {
        await callAdmin.addTkbs(formData).then(res =>
         {
          setData([...data, ...res.data.data])
          toast.success("Add Tkbs success!");
         }
        )
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    adds();
  }

  const onChangeYear = (item1, item2) => {
    console.log(item1, item2)
    setYear(item1);
    setSemester(item2);
  }

  const handleOkAddTkb = () => {

  }

  return (
    <LayoutAdmin match={match}>
      <Row justify="space-between">
        <Col>
          <Select options={yearShow} defaultVl={'All'} onChangeYear={onChangeYear}></Select>
        </Col>
        <Col>
          <input type="file" onChange={e => handleAddTkbs(e.target.files[0])}/>
          <Space>
            <Button type="primary" onClick={() => {setShowFormCheckyear(false); setIsModalVisible(true)}}>
              + Add Tkb
            </Button>
            <Button type="primary" onClick={() =>  {setShowFormCheckyear(true); setIsModalVisible(true)}}>
              + Add year semester
            </Button>
          </Space>
          <Modal
            title="Select time"
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            visible={isModalVisible}
          >
            {showFormCheckyear ? <FormAddYear handleOkAddYear={handleOkAddYear} handleCancel={handleCancel} /> : <FormTkb handleOkAddTkb={handleOkAddTkb} handleCancel={handleCancel} />}
          </Modal>
        </Col>
      </Row>
      <br/>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ defaultPageSize: 10}}
         />
    </LayoutAdmin>
  )
}
