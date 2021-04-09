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
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import queryString from 'query-string'

export default function ReportDetailTkb({match}) {
  const value=queryString.parse(match.location.search);
  const history = useHistory()
  const [pageCurren, setPageCurren] = useState(value?.page || 1)
  const [pagesize, setPagesize] = useState(value?.size || 20)
  const [data, setData] = useState([])
  const [year, setYear] = useState(value?.year || '');
  const [semester, setSemester] = useState(value?.semester || '')
  const lecturerId = match.match.params.lecturerId
  const type = Number(value?.type)
  const [totalData, setTotalData] = useState(0)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const handleDelete = (itemEdit) => {
    itemEdit.status = 0;
    const remove = async () => {
      try {
        await callAdmin.editTkb(itemEdit)
        const res = await await callAdmin.tkb(year,semester, pageCurren,pagesize)
          setData(res.data.data)
          setTotalData(res.data.total)
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
      width: 100,
      align: 'center'
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
      width: 100,
      align: 'center'
    },
    {
      title: 'Số SV',
      dataIndex: 'total_student',
      key: 'total_student',
      width: 100,
      align: 'center'
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
      width: 100,
      align: 'center'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: 100,
      align: 'center'
    }
  ];

  console.log(type)
  if(type) {
    columns.unshift(
      {
        title: 'Năm học',
        dataIndex: 'year',
        key: 'year',
        width: 100,
        align: 'center'
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
            {/* <span onClick={() => { setItemEdit(record); setIsModalVisible(true)}}> */}
            {/* <EditOutlined />
            </span> */}
            </Space>
          ) : null,
      }
    )
  }
  useEffect(() => {
    const getData = async () => {
      try {
        await callAdmin.detailTkb(year,semester, lecturerId, type,pageCurren, pagesize).then(res =>
        {
          setData(res.data.data)
          setTotalData(res.data.total)
        })
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [pageCurren,pagesize]);
 
  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
    history.push(`/admin/report/schedules/${lecturerId}?year=${year}&&semester=${semester}&&page=${page}&&size=${pageSize}&&type=${type}`)
  }

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">TKB chi tiết giảng viên: {data[0] && data[0]?.lecturerName}</h2>
      <h4 className="title">{type===0 ? `Học kỳ ${semester} năm học ${year}` : type===1 ? `Năm học ${year}` : `Năm tài chính ${year}` }</h4>
      <button className="btn btn-primary" onClick={() => history.goBack()} style={{float: "left",
    margin: "-46px 0",
    fontSize: '9px'}}>Go Back</button>
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
    </LayoutAdmin>
  )
}
