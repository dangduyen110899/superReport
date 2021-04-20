import React, {useState, useEffect} from 'react';
import LayoutAdmin from '../Layout';
import Cookies from "js-cookie";
import {   DeleteOutlined,
  EditOutlined } from '@ant-design/icons';
import {
  Table,
  Row,
  Col,
  Popconfirm,
  Button,
  Modal,
  Space, Pagination, Radio
} from 'antd';
import callAdmin from 'api/admin/Lecturer';
import FormLecturer from './FormLecturer';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import { useSelector, useDispatch } from 'store/index';
import { LOADING_FULL_SCREEN } from 'store/action-types';
import LoadingFullScreen from '../component/LoadingFullScreen';

export default function TableLecturer({match}) {
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
  const [mode, setmode] = useState(value?.mode || '1')

  const handleOk = (item, itemId) => {
    dispatch({
      type: LOADING_FULL_SCREEN,
      payload: true,
    })
    item.status = 1;
    const add = async () => {
      try {
       if (itemId) {
        item.id = itemId;
        await callAdmin.editLecturer(item).then(async() => {
          const res = await callAdmin.lecturer(pageCurren,pagesize, mode)
          setData(res.data.data)
          setIsModalVisible(false);
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.success("Edit lecturer success!");
        })
       } else {
          item.mode = mode
          await callAdmin.addLecturer(item)
          const res = await callAdmin.lecturer(pageCurren, pagesize, mode)
          setData(res.data.data)
          setTotalData(res.data.total)
          setIsModalVisible(false);
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
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
    dispatch({
      type: LOADING_FULL_SCREEN,
      payload: true,
    })
    itemEdit.status = 0;
    const remove = async () => {
      try {
        await callAdmin.editLecturer(itemEdit).then(async() =>
         {
          const res = await callAdmin.lecturer(pageCurren,pagesize,mode)
          setData(res.data.data)
          setTotalData(res.data.total)
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
         }
        )
      } catch (error) {
        console.log("failed to request API: ", error)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
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
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
    },
  ];

  if(user && (user.roles === 'ADMIN')) {
    columns.push(
      {
        title: 'Action',
        width: 100,
        align: 'center',
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
    )
  } 

  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: LOADING_FULL_SCREEN,
        payload: true,
      })
      try {
        const res = await callAdmin.lecturer(pageCurren,pagesize,mode)
        setData(res.data.data)
        setTotalData(res.data.total)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
      } catch (error) {
        console.log("failed to request API: ", error)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
      }
    };
    getData();
  }, [pageCurren, pagesize, mode]);

  
  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
    history.push(`/admin/lecturer?page=${page}&&size=${pageSize}&&keyword=${'ddd'}&&mode=${mode}`)
  }

  const handleAddLecturers = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("mode", mode)
    dispatch({
      type: LOADING_FULL_SCREEN,
      payload: true,
    })
    const adds = async () => {
      try {
        await callAdmin.addLecturers(formData)
        const res = await callAdmin.lecturer(pageCurren,pagesize,mode)
        setData(res.data.data)
        setTotalData(res.data.total)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
      } catch (error) {
        toast.error(error)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
      }
    };
    adds();
  }

  function handleModeChange(event) {
    setmode(event.target.value)
    setPageCurren(1)
    setPagesize(20)
    history.push(`/admin/lecturer?page=${1}&&size=${pagesize}&&keyword=${'ddd'}&&mode=${event.target.value}`)
  }

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">Quản lý danh sách giảng viên</h2>
      <Row justify="space-between">
        <Col>
        <div className="tab-lecturer">
      <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="1">DS giảng viên cơ hữu</Radio.Button>
          <Radio.Button value="0">DS giảng viên thỉnh giảng</Radio.Button>
        </Radio.Group>
      </div>
        </Col>
        {
          user && (user.roles === 'ADMIN') &&
          <Col>
          <input type="file" onChange={e => handleAddLecturers(e.target.files[0])}/>
          <Button className="button-all" onClick={() => setIsModalVisible(true)}>
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
