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
import callAdmin from 'api/admin/Quota';
import FormQuota from './FormQuota';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import { useSelector, useDispatch } from 'store/index';
import { LOADING_FULL_SCREEN } from 'store/action-types';
import LoadingFullScreen from '../component/LoadingFullScreen';

export default function TableQuota({match}) {
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
    dispatch({
      type: LOADING_FULL_SCREEN,
      payload: true,
    })
    item.status = 1;
    const add = async () => {
      try {
       if (itemId) {
        item.id = itemId;
        await callAdmin.editQuota(item).then(async() => {
          const res = await callAdmin.quota(pageCurren,pagesize)
          setData(res.data.data)
          setIsModalVisible(false);
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.success("Edit quota success!");
        })
       } else {
          await callAdmin.addQuota(item)
          const res = await callAdmin.quota(pageCurren, pagesize)
          setData(res.data.data)
          setTotalData(res.data.total)
          setIsModalVisible(false);
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.success("Add quota success!");
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
        await callAdmin.editQuota(itemEdit).then(async() =>
         {
          const res = await callAdmin.quota(pageCurren,pagesize)
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
      align: 'center',
      width: 100
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      align: 'center'
    },
    {
      title: 'Tỉ lệ',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center'
    }
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
        const res = await callAdmin.quota(pageCurren,pagesize)
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
  }, [pageCurren, pagesize]);

  
  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
    history.push(`/admin/quota?page=${page}&&size=${pageSize}&&keyword=${'ddd'}`)
  }

  const handleAddquotas = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    dispatch({
      type: LOADING_FULL_SCREEN,
      payload: true,
    })
    const adds = async () => {
      try {
        await callAdmin.addQuotas(formData)
        const res = await callAdmin.quota(pageCurren,pagesize)
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

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">QUẢN LÝ ĐỊNH MỨC</h2>
      <Row justify="space-between">
        {
          user && (user.roles === 'ADMIN') &&
          <Col>
          <input type="file" onChange={e => handleAddquotas(e.target.files[0])}/>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            + Thêm định mức
          </Button>
          <Modal
            title="THÊM ĐỊNH MỨC"
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            visible={isModalVisible}
          >
            <FormQuota handleOk={handleOk} handleCancel={handleCancel} itemEdit={itemEdit}/>
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
