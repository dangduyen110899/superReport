import React, {useState, useEffect, useMemo} from 'react';
import LayoutAdmin from '../Layout';
import {
  Table,
  Row,
  Col, Pagination,Select
} from 'antd';
import callAdmin from 'api/admin/Report';
import SelectY from '../component/Select';
import { useHistory, Link } from "react-router-dom";
import queryString from 'query-string'
import Cookies from "js-cookie";
import SelectYear from './SelectYear';
import { useDispatch } from 'store/index';
import { LOADING_FULL_SCREEN } from 'store/action-types';
import LoadingFullScreen from '../component/LoadingFullScreen';

export default function TableReport({match}) {
  const dispatch = useDispatch()
  const value=queryString.parse(match.location.search);
  const history = useHistory()
  const [data, setData] = useState([])
  const [yearShow, setYearShow] = useState([])
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('')
  const [pageCurren, setPageCurren] = useState(value?.page || 1)
  const [pagesize, setPagesize] = useState(value?.size || 20)
  const [totalData, setTotalData] = useState(0)
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const [type, settype] = useState(0)
  const [yearShow2, setYearShow2] = useState([])
  const [sort, setSort] = useState('')
  const [sortField, setSortField] = useState('')

  const sortHour = (field) => {
    if (sortField=='') {
      setSort('tang');
      setSortField(field)
    }
    else if (sort=='' && field!==sortField) {
      setSortField(field)
      setSort("tang")
    } if (sort=='' && field!==sortField) {
      setSort("tang")
    }
    else if (sort=='tang') {
      setSort('giam')
    } else {
      setSort('')
      setSortField('')
    }
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
    // {
    //   title: 'Chương trình dạy',
    //   dataIndex: 'programs',
    //   key: 'programs',
    // },
    {
      title: () => { return <div onClick={() => sortHour('hourSchedule')}>Giờ dạy trên lớp <i class="fas fa-sort"></i></div>},
      dataIndex: 'hourSchedule',
      key: 'hourSchedule',
      width: 150,
      align: 'center',
      render: (value, item) => <Link to={`/admin/report/schedules/${item.lecturerId}?year=${item.year}&&semester=${item.semester}&&type=${type}`}>{value}</Link>
    },
    {
      title: () => { return <div onClick={() => sortHour('hourThesis')}>Giờ hd khóa luận <i class="fas fa-sort"></i></div>},
      dataIndex: 'hourThesis',
      key: 'hourThesis',
      width: 150,
      align: 'center',
      render: (value, item) => <Link to={`/admin/report/thesis/${item.lecturerId}?year=${item.year}&&semester=${item.semester}&&type=${type}`}>{value}</Link>
    },
    {
      title: () => { return <div onClick={() => sortHour('hourProject')}>Giờ hd đồ án <i class="fas fa-sort"></i></div>},
      dataIndex: 'hourProject',
      key: 'hourProject',
      width: 130,
      align: 'center'
    },
    {
      title: () => { return <div onClick={() => sortHour('hourTTCN')}>Giờ hd thực tập <i class="fas fa-sort"></i></div>},
      dataIndex: 'hourTTCN',
      key: 'hourTTCN',
      width: 130,
      align: 'center'
    },
    {
      title: () => { return <div onClick={() => sortHour('total')}>Tổng số giờ <i class="fas fa-sort"></i></div>},
      dataIndex: 'total',
      key: 'total',
      width: 130,
      align: 'center'
    },
    {
      title: () => { return <div onClick={() => sortHour('total')}>Tỷ lệ <i class="fas fa-sort"></i></div>},
      key: "index",
      render: (value, item) => `${Math.round((item.total/270)*100)} %` ,
      width: 100,
      align: 'center'
    },
  ];

  // if(!year && !semester) {
  //   columns.unshift(
  //     {
  //       title: 'Năm học',
  //       dataIndex: 'year',
  //       key: 'year',
// },
  //     {
  //       title: 'Học kỳ',
  //       dataIndex: 'semester',
  //       key: 'semester',
  //       width: 100,
  //     align: 'center'
  //     })
  // }
  const onChangeYear = (item1, item2) => {
    setYear(item1);
    setSemester(item2);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        await callAdmin.report(year,semester, pageCurren,pagesize,type, sortField, sort).then(res =>{
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
  }, [year, semester,pageCurren, pagesize,type,sort, sortField]);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: true,
        })
        return await callAdmin.report('','', 0,0,0)
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
        // setData(res?.data?.data)
        // setTotalData(res?.data?.total)
        const arrYear2 = []
        let arrString = res?.data?.data.map(item => {
          arrYear2.push(item.year)
          return item.semester + ' ' + item.year
        })
        const arr = arrString?.filter((item, index) => arrString.indexOf(item) === index);
        const arr2  =  arrYear2?.filter((item, index) => arrYear2.indexOf(item) === index);
        arr && setYearShow([...arr])
        arr2 && setYearShow2(arr2)
        arr2 && setYear(arr2[0])
        const x = arr && arr[0]?.split(' ');
        x && setSemester(x[0])
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
      }
    )
  }, []);

  function onChange(page, pageSize) {
    setPageCurren(page)
    setPagesize(pageSize)
    history.push(`/admin/report?year=${year}}&&semester=${semester}&&page=${page}&&size=${pageSize}&&keyword=${'ddd'}`)
  }
  const { Option } = Select;
  return (
    <LayoutAdmin match={match}>
      <h2 className="title">BÁO CÁO TỔNG HỢP</h2>
      <Row justify="space-between">
        <Col>
          <label>Báo cáo theo: </label>
          <Select onChange={value => settype(value)} defaultValue={0} style={{ width: 200 }}>
            <Option value={0}>Theo học kỳ</Option>
            <Option value={1}>Theo năm học</Option>
            <Option value={2}>Theo năm tài chính</Option>
          </Select>
        </Col>
        {
          useMemo(() => 
          <Col>
          { type==0 && <SelectY options={yearShow} onChangeYear={onChangeYear}></SelectY>}
          { Number(type) ? <SelectYear options={yearShow2} onChangeYear={onChangeYear}></SelectYear> : ''}
        </Col>
          , [type, yearShow, yearShow2])
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
