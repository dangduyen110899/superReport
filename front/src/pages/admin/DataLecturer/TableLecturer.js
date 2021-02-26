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
import callAdmin from 'api/admin/Lecturer';
import FormLecturer from './FormLecturer';
import { toast } from "react-toastify";

export default function TableLecturer({match}) {
  const [data, setData] = useState([])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = (item, itemId) => {
    item.status = 1;
    const add = async () => {
      try {
       if (itemId) {
        item.id = itemId;
        await callAdmin.editLecturer(item).then(res => {
          const dataNew = [...data]
          dataNew.forEach(element => {
            if (element.id === item.id) {
              element.name = item.name;
              element.email = item.email;
              element.programs = item.programs;
            }
          });
          setData([...dataNew])
          setIsModalVisible(false);
          toast.success("Edit lecturer success!");
        })
       } else {
        await callAdmin.addLecturer(item).then(res => {
          setData([...data, res.data.data])
          setIsModalVisible(false);
          toast.success("Add lecturer success!");
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
        await callAdmin.editLecturer(itemEdit).then(res =>
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
      title: 'Name lecturer',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Programs',
      dataIndex: 'programs',
      key: 'programs',
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
        await callAdmin.lecturer().then(res =>
          setData(res.data.data)
        )
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, []);

  const handleAddLecturers = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    const adds = async () => {
      try {
        await callAdmin.addLecturers(formData).then(res =>
         {
          setData([...data, ...res.data.data])
          toast.success("Add lecturers success!");
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
          <input type="file" onChange={e => handleAddLecturers(e.target.files[0])}/>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            + Add lecturer
          </Button>
          <Modal
            title="Select time"
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            visible={isModalVisible}
          >
            <FormLecturer handleOk={handleOk} handleCancel={handleCancel} itemEdit={itemEdit}/>
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
