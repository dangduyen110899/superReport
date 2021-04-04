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
import callAdmin from 'api/admin/Thesis';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import queryString from 'query-string'

export default function ReportDetailThesis({match}) {
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
  }

  let  columns = [
    {
      title: "Số thứ tự",
      key: "index",
      render: (value, item, index) => (pageCurren - 1) *pagesize  + index + 1,
      width: 100,
      align: 'center'
    },
    {
      title: 'Mã SV',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 150,
      align: 'center'
    },
    {
      title: 'Sinh viên',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 200,
      align: 'center'
    },
    {
      title: 'Lớp',
      dataIndex: 'classCode',
      key: 'classCode',
      width: 150,
      align: 'center'
    },
    {
      title: 'Tên đề tài',
      dataIndex: 'nameThesis',
      key: 'nameThesis',
    },
    {
      title: 'Ngôn ngữ',
      dataIndex: 'language',
      key: 'language',
      render: (text) => <span>{text===0 ? 'Tiếng việt' : 'Tiếng anh'}</span>,
      width: 150,
      align: 'center'
    },
    {
      title: 'Nhiệm vụ chiến lược',
      dataIndex: 'nvcl',
      key: 'nvcl',
      render: (text) => <span>{text===0 ? 'Không' : 'Có'}</span>,
      width: 100,
      align: 'center'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center'
    }
  ];
  if(type) {
    columns.unshift(
      {
        title: 'Năm học',
        dataIndex: 'year',
        key: 'year',
        width: 200,
      align: 'center'
      },
      {
        title: 'Học kỳ',
        dataIndex: 'semester',
        key: 'semester',
        width: 100,
      align: 'center'
      }
    )
  }

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
        await callAdmin.detailThesis(year,semester, lecturerId, type,pageCurren, pagesize).then(res =>
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
    history.push(`/admin/report/thesis/${lecturerId}?year=${year}&&semester=${semester}&&page=${page}&&size=${pageSize}&&type=${type}`)
  }

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">DS hướng dẫn kltn chi tiết giảng viên: {data[0] && data[0]?.lecturerName}</h2>
      <h4 className="title">{type===0 ? `Học kỳ ${semester} năm học ${year}` : type===1 ? `Năm học ${year}` : `Năm tài chính ${year}` }</h4>
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
