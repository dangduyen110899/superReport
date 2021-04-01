import React, {useState, useEffect} from 'react';
import LayoutAdmin from '../Layout';
import {
  Table,
  Row,
  Col, Pagination
} from 'antd';
import callAdmin from 'api/admin/Report';
import Select from '../component/Select';
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import Cookies from "js-cookie";

export default function TableReport({match}) {
  const value=queryString.parse(match.location.search);
  const history = useHistory()
  const [data, setData] = useState([])
  const [yearShow, setYearShow] = useState(['All'])
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('')
  const [pageCurren, setPageCurren] = useState(value?.page || 1)
  const [pagesize, setPagesize] = useState(value?.size || 20)
  const [totalData, setTotalData] = useState(0)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  let columns = [
    {
      title: 'Giảng viên',
      dataIndex: 'lecturerName',
      key: 'lecturerName',
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
      title: 'Chương trình dạy',
      dataIndex: 'programs',
      key: 'programs',
    },
    {
      title: 'Giờ dạy trên lớp',
      dataIndex: 'hourSchedule',
      key: 'hourSchedule',
    },
    {
      title: 'Giờ hd khóa luận',
      dataIndex: 'hourThesis',
      key: 'hourThesis',
    },
    {
      title: 'Giờ hd đồ án',
      dataIndex: 'hourProject',
      key: 'hourProject',
    },
    {
      title: 'Giờ hd thực tập',
      dataIndex: 'hourTTCN',
      key: 'hourTTCN',
    },
    {
      title: 'Tổng số giờ',
      dataIndex: 'total',
      key: 'total',
    },
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
      })
  }

  const onChangeYear = (item1, item2) => {
    setYear(item1);
    setSemester(item2);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        await callAdmin.report(year,semester, pageCurren,pagesize).then(res =>{
          setData(res.data.data)
          setTotalData(res.data.total)
        })
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [year, semester,pageCurren, pagesize]);

  useEffect(() => {
    const getData = async () => {
      try {
        return await callAdmin.report('','', 0,0)
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData().then(res =>
      {
        setData(res?.data?.data)
        setTotalData(res?.data?.total)
        let arrString = res?.data?.data.map(item => item.semester + ' ' + item.year)
        const arr = arrString?.filter((item, index) => arrString.indexOf(item) === index);
        arr && setYearShow(['All',...arr])
      }
    )
  }, []);

  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
  }

  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
    history.push(`/admin/report?year=${year}&&semester=${semester}&&page=${page}&&size=${pageSize}&&keyword=${'ddd'}`)
  }

  return (
    <LayoutAdmin match={match}>
      <Row justify="space-between">
        <Col>
          <Select options={yearShow} defaultVl={'All'} onChangeYear={onChangeYear}></Select>
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
