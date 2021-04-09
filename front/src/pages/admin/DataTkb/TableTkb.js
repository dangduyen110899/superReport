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
import FormAddYear from '../component/FormAddYear';
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
  const [yearShow, setYearShow] = useState(['All'])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [year, setYear] = useState(value?.year || '');
  const [semester, setSemester] = useState(value?.semester || '')
  const [totalData, setTotalData] = useState(0)
  const [showFormCheckyear, setShowFormCheckyear] = useState(true)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;


  const handleOkAddYear = (yearItem, semesterItem) => {
    const add = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        await callAdmin.checkYear({year: yearItem, semester: semesterItem}).then(() => {
          setYearShow([`${semesterItem} ${yearItem}`,...yearShow]);
          setIsModalVisible(false);
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.success("Add year success!");
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
  if(!year && !semester) {
    columns.unshift(
      {
        title: 'Năm học',
        dataIndex: 'year',
        key: 'year',
      },
      {
        title: 'Học kỳ',
        dataIndex: 'semester',
        key: 'semester',
        width: 100,
      align: 'center'
      }) }

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
        let arrString = res.data.data.map(item => item.semester + ' ' + item.year)
        const arr = arrString.filter((item, index) => arrString.indexOf(item) === index);
        setYearShow(['All',...arr])
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
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
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        const res = await callAdmin.addTkbs(formData)
        if (!res.data.length) {
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
          toast.error(res.data.message)
        }
        const res1 = await callAdmin.tkb(year,semester, pageCurren,pagesize)
          setData(res1.data.data)
          setTotalData(res1.data.total)
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
    setYear(item1);
    setSemester(item2);
  }

  const handleOkAddTkb = () => {

  }

  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
    history.push(`/admin/tkb?year=${year}&&semester=${semester}&&page=${page}&&size=${pageSize}&&keyword=${'ddd'}`)
  }

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">QUẢN LÝ THỜI KHÓA BIỂU</h2>
      <Row justify="space-between">
        <Col>
          <Select options={yearShow} defaultVl={'All'} onChangeYear={onChangeYear}></Select>
        </Col>
        {
          user && (user.roles === 'ADMIN') && 
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
        totalData>1 && <Pagination onChange={onChange} total={totalData} defaultPageSize={pagesize}
        defaultCurrent={pageCurren}/>
      }
      <LoadingFullScreen/>
    </LayoutAdmin>
  )
}
