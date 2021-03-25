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
  Space, Pagination
} from 'antd';
import callAdmin from 'api/admin/Lecturer';
import FormLecturer from './FormLecturer';
import { toast } from "react-toastify";

export default function TableLecturer({match}) {
  const [data, setData] = useState([])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageCurren, setPageCurren] = useState(1)
  const [pagesize, setPagesize] = useState(20)
  const [totalData, setTotalData] = useState(0)

  const handleOk = (item, itemId) => {
    item.status = 1;
    const add = async () => {
      try {
       if (itemId) {
        item.id = itemId;
        await callAdmin.editLecturer(item).then(async() => {
          const res = await callAdmin.lecturer(pageCurren,pagesize)
          setData(res.data.data)
          setIsModalVisible(false);
          toast.success("Edit lecturer success!");
        })
       } else {
          await callAdmin.addLecturer(item)
          const res = await callAdmin.lecturer(pageCurren,pagesize)
          setData(res.data.data)
          setTotalData(res.data.total)
          setIsModalVisible(false);
          toast.success("Add lecturer success!");
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
        await callAdmin.editLecturer(itemEdit).then(async() =>
         {
          const res = await callAdmin.lecturer(pageCurren,pagesize)
          setData(res.data.data)
          setTotalData(res.data.total)
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
      title: 'Tên giảng viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Khoa',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Bộ môn',
      dataIndex: 'subject',
      key: 'subject',
    },
    // {
    //   title: 'Programs',
    //   dataIndex: 'programs',
    //   key: 'programs',
    // },
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
        const res = await callAdmin.lecturer(pageCurren,pagesize)
        setData(res.data.data)
        setTotalData(res.data.total)
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [pageCurren, pagesize]);

  
  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
  }

  const handleAddLecturers = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    const adds = async () => {
      try {
        await callAdmin.addLecturers(formData)
        const res = await callAdmin.lecturer(pageCurren,pagesize)
        setData(res.data.data)
        setTotalData(res.data.total)
      } catch (error) {
        toast.error(error)
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
            + Thêm giảng viên
          </Button>
          <Modal
            title="THÊM GIẢNG VIÊN"
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            visible={isModalVisible}
          >
            <FormLecturer handleOk={handleOk} handleCancel={handleCancel} itemEdit={itemEdit} dataLecturer={data}/>
          </Modal>
        </Col>
      </Row>
      <br/>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
         />

      <br/>
      {
        totalData>1 && <Pagination onChange={onChange} total={totalData} defaultPageSize={pagesize}
        defaultCurrent={pageCurren}/>
      }
    </LayoutAdmin>
  )
}
