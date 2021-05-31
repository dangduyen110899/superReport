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
import callAdmin from 'api/admin/Student';
import FormStudent from './FormStudent';
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import { useDispatch } from 'store/index';
import LoadingFullScreen from '../component/LoadingFullScreen';
import { LOADING_FULL_SCREEN } from 'store/action-types';

export default function TableStudent({match}) {
  const dispatch = useDispatch()
  const value=queryString.parse(match.location.search);
  const history = useHistory()
  const [data, setData] = useState([])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageCurren, setPageCurren] = useState(value?.page || 1)
  const [pagesize, setPagesize] = useState(value?.size || 20)
  const [totalData, setTotalData] = useState(0)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const handleOk = (item, itemId) => {
    item.status = 1;
    const add = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        if (itemId) {
          item.id = itemId;
          await callAdmin.editStudent(item)
          const res = await callAdmin.student(pageCurren,pagesize)
          setData(res.data.data)
          setIsModalVisible(false);
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.success("Thay đổi sinh viên thành công!");
        } else {
          await callAdmin.addStudent(item)
          const res = await callAdmin.student(pageCurren,pagesize)
          setData(res.data.data)
          setTotalData(res.data.total)
          setIsModalVisible(false);
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.success("Thêm sinh viên thành công!");
        }
      } catch (error) {
        toast.warning(error?.response?.data?.message);
      }
      setItemEdit(null)
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
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        await callAdmin.editStudent(itemEdit)
        const res = await callAdmin.student(pageCurren,pagesize)
        setData(res.data.data)
        setTotalData(res.data.total)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
        toast.success('Delete student success.')
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    remove();
  }

  let columns = [
    {
      title: "Số thứ tự",
      key: "index",
      render: (value, item, index) => (pageCurren - 1) *pagesize  + index + 1,
      width: 100,
      align: 'center'
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'code',
      key: 'code',
      align: 'center'
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      align: 'center'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 200,
      align: 'center',
      render: (text) => <span>{text.slice(0,10)}</span>
    },
    {
      title: 'Quê quán',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
    },
    {
      title: 'Mã lớp học',
      dataIndex: 'classCode',
      key: 'classCode',
      align: 'center'
    }
  ];

  if(user && (user.roles === 'ADMIN')) {
    columns.push({
      title: 'Action',
      dataIndex: 'operation',
      width: 100,
        align: 'center',
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
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        const res = await callAdmin.student(pageCurren,pagesize)
        setData(res.data.data)
        setTotalData(res.data.total)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [pageCurren, pagesize]);

  const handleAddStudents = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    const adds = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        await callAdmin.addStudents(formData)
        const res = await callAdmin.student(pageCurren,pagesize)
        setData(res.data.data)
        setTotalData(res.data.total)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
        toast.success("Add students success!");
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    adds();
  }

  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
    history.push(`/admin/student?page=${page}&&size=${pageSize}&&keyword=${'ddd'}`)
  }

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">Quản lý danh sách sinh viên</h2>
      <Row justify="space-between">
        { user && (user.roles === 'ADMIN') && 
          <Col>
          {/* <input type="file" onChange={e => handleAddStudents(e.target.files[0])} id="actual-btn" hidden/>
          <label htmlFor="actual-btn" class="upload-file">Chọn file</label> */}
          <Button className="button-all" onClick={() => setIsModalVisible(true)}>
            + Thêm sinh viên
          </Button>
          <Modal
            title={itemEdit ? "Thay đổi sinh viên" : "Thêm sinh viên"}
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            visible={isModalVisible}
          >
            <FormStudent handleOk={handleOk} handleCancel={handleCancel} itemEdit={itemEdit}/>
          </Modal>
        </Col>
        } 
      </Row>
      <br/>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ y: 550 }}
         />
      <br/>
      {
        totalData>1 && <Pagination onChange={onChange} total={totalData} defaultPageSize={pagesize}
        defaultCurrent={pageCurren}/>
      }
       <LoadingFullScreen/>
    </LayoutAdmin>
  )
}
