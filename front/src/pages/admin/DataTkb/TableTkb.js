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
  Space, Pagination
} from 'antd';
import callAdmin from 'api/admin/Tkb';
import { toast } from "react-toastify";
import Select from '../component/Select';
import FormTkb from './FormTkb';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import { useDispatch } from 'store/index';
import LoadingFullScreen from '../component/LoadingFullScreen';
import { LOADING_FULL_SCREEN } from 'store/action-types';

export default function TableTkb({match}) {
  const dispatch = useDispatch()
  const value=queryString.parse(match.location.search);
  const history = useHistory()
  const [pageCurren, setPageCurren] = useState(value?.page || 1)
  const [pagesize, setPagesize] = useState(value?.size || 20)
  const [data, setData] = useState([])
  const [yearShow, setYearShow] = useState([''])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [year, setYear] = useState(value?.year || '');
  const [semester, setSemester] = useState(value?.semester || '')
  const [totalData, setTotalData] = useState(0)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const [load, setLoad] = useState(false)

  const handleOkAddYear = (yearItem, semesterItem, fileItem) => {
    const add = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        await callAdmin.checkYear({year: yearItem, semester: semesterItem}).then(() => {
          handleAddTkbs(fileItem, yearItem, semesterItem)
        })
      } catch (error) {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
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
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        await callAdmin.editTkb(itemEdit)
        const res = await await callAdmin.tkb(year,semester, pageCurren,pagesize)
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
    remove();
  }
  let  columns = [
    {
      title: 'Mã học phần',
      dataIndex: 'subjectCode',
      key: 'subjectCode',
    },
    {
      title: 'Học phần',
      dataIndex: 'nameSubject',
      key: 'nameSubject',
    },
    {
      title: 'TC',
      dataIndex: 'total_tc',
      key: 'total_tc',
      width: 100,
      align: 'center'
    },
    {
      title: 'Mã lớp học phần',
      dataIndex: 'classSubjectCode',
      key: 'classSubjectCode',
    },
    {
      title: 'Số SV',
      dataIndex: 'total_student',
      key: 'total_student',
      width: 100,
      align: 'center'
    },
    {
      title: 'Giảng viên',
      dataIndex: 'lecturerName',
      key: 'lecturerName',
    },
    {
      title: 'Thứ',
      dataIndex: 'day',
      key: 'day',
      width: 100,
      align: 'center'
    },
    {
      title: 'Tiết',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      align: 'center'
    },
   
    {
      title: 'Giảng đường',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: 100,
      align: 'center'
    }
  ];

  if(user && (user.roles === 'ADMIN')) { 
    columns.push(
      {
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
      }
    )
  }
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        await callAdmin.tkb(year,semester, pageCurren,pagesize).then(res =>
        {
          setData(res.data.data)
          setTotalData(res.data.total)
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
        })
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [year, semester, pageCurren,pagesize]);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        return await callAdmin.tkb('','', 0, 0)
      } catch (error) {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
        console.log("failed to request API: ", error)
      }
    };
    getData().then(res =>
      {
        let arrString = res.data.data.map((item, index) => {
          if (index===0) {
            setYear(item.year)
            setSemester(item.semester)
          }
          return item.semester + ' ' + item.year
        })
        const arr = arrString.filter((item, index) => arrString.indexOf(item) === index);
        setYearShow([...arr])
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
      }
    )
  }, [load]);

  const handleAddTkbs = (file, year, semester) => {
    setIsModalVisible(false)
    const formData = new FormData()
    formData.append("file", file)
    formData.append('year', year)
    formData.append('semester', semester)
    const adds = async () => {
      try {
        const res = await callAdmin.addTkbs(formData)
        if (!res.data.length) {
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.error(res.data.message)
        }
          setLoad(!load)
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.success("Add Tkbs success!");
      } catch (error) {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
        console.log("failed to request API: ", error)
      }
    };
    adds();
  }

  const onChangeYear = (item1, item2) => {
    history.push(`/admin/tkb?year=${item1}&&semester=${item2}&&page=${1}&&size=${pagesize}&&keyword=${'ddd'}`)
    setPageCurren(1)
    setYear(item1);
    setSemester(item2);
  }

  function onChange(page, pageSize) {
    history.push(`/admin/tkb?year=${year}&&semester=${semester}&&page=${page}&&size=${pageSize}&&keyword=${'ddd'}`)
    setPageCurren(page)
    setPagesize(pageSize)
  }

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">Quản lý thời khóa biểu</h2>
      <Row justify="space-between">
        <Col>
          <Select options={yearShow} defaultVl={''} onChangeYear={onChangeYear}></Select>
        </Col>
        {
          user && (user.roles === 'ADMIN') && 
          <Col>
          <Space>
            <Button className="button-all">
              Thêm thời khóa biểu
            </Button>
          </Space>
          <Modal
            title="Select time"
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            visible={isModalVisible}
          >
            <FormTkb handleOkAddYear={handleOkAddYear} handleCancel={handleCancel} />
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
         
         {
        totalData>1 && <Pagination onChange={onChange} total={totalData} defaultPageSize={pagesize} current={pageCurren}
        defaultCurrent={pageCurren}/>
      }
      <LoadingFullScreen/>
    </LayoutAdmin>
  )
}
