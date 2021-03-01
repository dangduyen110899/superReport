import React, {useState, useEffect} from 'react';
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
import callAdmin from 'api/admin/Student';
import FormStudent from './FormStudent';
import { toast } from "react-toastify";

export default function TableStudent({match}) {
  const [data, setData] = useState([])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = (item, itemId) => {
    item.status = 1;
    const add = async () => {
      try {
        if (itemId) {
          item.id = itemId;
          await callAdmin.editStudent(item)
          const res = await callAdmin.student()
          setData(res.data)
          setIsModalVisible(false);
          toast.success("Edit student success!");
        } else {
          const res = await callAdmin.addStudent(item)
          setData([...data, res.data])
          setIsModalVisible(false);
          toast.success("Add student success!");
        }
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
        await callAdmin.editStudent(itemEdit)
        const res = await callAdmin.student()
        setData(res.data)
        toast.success('Delete student success.')
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    remove();
  }

  let columns = [
    {
      title: 'Code student',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code Class',
      dataIndex: 'classCode',
      key: 'classCode',
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
        const res = await callAdmin.student()
        setData(res.data)
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, []);

  const handleAddStudents = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    const adds = async () => {
      try {
        const res = await callAdmin.addStudents(formData)
        console.log(res)
        setData([...data, ...res.data])
        toast.success("Add students success!");
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    adds();
  }

  return (
    <LayoutAdmin match={match}>
      <Row justify="space-between">
        <Col>
          {/* <Search onSearch={onSearch}/> */}
          <span>search</span>
        </Col>
        <Col>
          <input type="file" onChange={e => handleAddStudents(e.target.files[0])}/>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            + Add student
          </Button>
          <Modal
            title="Select time"
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            visible={isModalVisible}
          >
            <FormStudent handleOk={handleOk} handleCancel={handleCancel} itemEdit={itemEdit}/>
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
