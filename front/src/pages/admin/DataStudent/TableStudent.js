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
        await callAdmin.editStudent(item).then(res => {
          const dataNew = [...data]
          dataNew.forEach(element => {
            if (element.id === item.id) {
              element.name = item.name;
              element.code = item.code;
              element.classCode = item.classCode;
            }
          });
          setData([...dataNew])
          setIsModalVisible(false);
          toast.success("Edit student success!");
        })
       } else {
        await callAdmin.addStudent(item).then(res => {
          setData([...data, res.data.data])
          setIsModalVisible(false);
          toast.success("Add student success!");
        })
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
        await callAdmin.editStudent(itemEdit).then(res =>
         {
          const dataNew = data.filter(item => item.id!==itemEdit.id)
          setData(dataNew)
          toast.success('Delete student success.')
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
        await callAdmin.student().then(res =>
          setData(res.data.data)
        )
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
        await callAdmin.addStudents(formData).then(res =>
         {
          setData([...data, ...res.data.data])
          toast.success("Add students success!");
         }
        )
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
