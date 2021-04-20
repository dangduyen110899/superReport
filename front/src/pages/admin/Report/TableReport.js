import React, {useState, useEffect, useMemo} from 'react';
import LayoutAdmin from '../Layout';
import {
  Table,
  Row,
  Col, Pagination,Select
} from 'antd';
import callAdmin from 'api/admin/Report';
import {FilterOutlined} from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom";
import queryString from 'query-string'
import Cookies from "js-cookie";
import SelectYear from './SelectYear';
import { useDispatch } from 'store/index';
import { LOADING_FULL_SCREEN } from 'store/action-types';
import LoadingFullScreen from '../component/LoadingFullScreen';
import { downloadFile } from './DowloadFile';
import SelectSemester from './SelectSemester';
import * as _ from 'lodash';


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
  // filter 
  const [valuefilter1, setvaluefilter1] = useState([])
  const [valuefilter2, setvaluefilter2] = useState([])
  const [listDepartment, setlistDepartment] = useState([])
  const [listSubject, setlistSubject] = useState([])
  const [visibleModal1, setvisibleModal1] = useState(false)
  const [visibleModal2, setvisibleModal2] = useState(false)
  const onFilter1 = () => {
    setvisibleModal1(!visibleModal1)
  }

  const onFilter2 = () => {
    setvisibleModal2(!visibleModal2)
  }

  const sortHour = (field) => {
    if (sortField=='') {
      setSort('tang');
      setSortField(field)
      return true
    }
    else if (sort=='' && field!==sortField) {
      setSortField(field)
      setSort("tang")
      return true
    } if (sort=='giam' && field==sortField) {
      setSort("tang")
      return true
    }
    else if (sort=='tang') {
      setSort('giam')
      return true
    } else {
      setSort('')
      setSortField('')
      return true
    }
  }

  const handleFilter = (field) => {
    if (field === 'khoa') {
      const departmentCheck = listDepartment.filter(item => item.check)
      const fitler1List = departmentCheck.map(item => item.value)
      setvaluefilter1(fitler1List)
      setvisibleModal1(false)
    } else {
      const subjectCheck = listSubject.filter(item => item.check)
      const fitler2List = subjectCheck.map(item => item.value)
      setvaluefilter2(fitler2List)
      setvisibleModal2(false)
    }
  }

  const handleResetModal1 = () => {
    const departments = listDepartment.map(item => {
      return {
        value: item.value,
        check: false
      }
    })
    setlistDepartment(departments)
    setvaluefilter1([])
  }

  const handleResetModal2 = () => {
    const subjects = listSubject.map(item => {
      return {
        value: item.value,
        check: false
      }
    })
    setlistSubject(subjects)
    setvaluefilter2([])
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
      title: () => {
        return (
          <div style={{position: 'relative'}}>
            <div>Khoa <span style={{cursor: 'pointer', color: `${valuefilter1.length>0 ? 'blue' : ''}`}} onClick={() => onFilter1()}><FilterOutlined /></span></div>
            {
              visibleModal1 &&
              <div style={{boxShadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)', padding: '10px', position: 'absolute', top: '50px', right: '-15px', zIndex: '999', background: '#fff', borderRadius: '2px', width: '250px', overflow: 'auto'}}>
              {
                listDepartment.map(item => {
                  return (
                    <div className="d-flex">
                      <div style={{ marginRight: '10px'}}>
                        <input type="checkbox" name="khoa" value={item.value} onChange={e => {
                          const listDepart = [...listDepartment]
                          _.forEach(listDepart, (item) => {
                            if (item.value === e.target.value) {
                              if (item.check) {
                                item.check = false
                              } else {
                                item.check = true
                              }
                            }
                          })
                          setlistDepartment(listDepart)
                        }} checked={item.check}/>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '100', textTransform: 'capitalize', textAlign: 'left'}}>
                        <label htmlFor="">{item.value}</label>
                      </div>
                    </div>
                  )
                })
              }
              <div style={{ textAlign: 'right' }}>
                <button onClick={() => handleFilter('khoa')} style={{ padding: '0px 15px', border: 'none', borderRadius: '3px', textAlign: 'right', marginTop: '10px'}} type="submit">Ok</button>
                <button onClick={() => setvisibleModal1(false)} style={{ padding: '0px 15px', border: 'none', borderRadius: '3px', textAlign: 'right', marginTop: '10px'}} type="submit">Cancel</button>
                <button onClick={() => handleResetModal1()} style={{ padding: '0px 15px', border: 'none', borderRadius: '3px', textAlign: 'right', marginTop: '10px'}} type="submit">Reset</button>
              </div>
            </div>
            }
          </div>
        )
      },
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: () => {
        return (
          <div style={{position: 'relative'}}>
            <div>Bộ môn<span style={{cursor: 'pointer', color: `${valuefilter2.length>0 ? 'blue' : ''}`}} onClick={() => onFilter2()}><FilterOutlined /></span></div>
            {
              visibleModal2 &&
              <div style={{boxShadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)', padding: '10px', position: 'absolute', top: '50px', right: '-15px', zIndex: '999', background: '#fff', borderRadius: '2px', width: '250px', overflow: 'auto'}}>
              {
                listSubject.map(item => {
                  return (
                    <div className="d-flex">
                      <div style={{ marginRight: '10px'}}>
                        <input type="checkbox" name="khoa" value={item.value} onChange={e => {
                          const listSub = [...listSubject]
                          _.forEach(listSub, (item) => {
                            if (item.value === e.target.value) {
                              if (item.check) {
                                item.check = false
                              } else {
                                item.check = true
                              }
                            }
                          })
                          setlistSubject(listSub)
                        }} checked={item.check}/>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '100', textTransform: 'capitalize', textAlign: 'left'}}>
                        <label htmlFor="">{item.value}</label>
                      </div>
                    </div>
                  )
                })
              }
              <div style={{ textAlign: 'right' }}>
                <button onClick={() => handleFilter('bomon')} style={{ padding: '0px 15px', border: 'none', borderRadius: '3px', textAlign: 'right', marginTop: '10px'}} type="submit">Ok</button>
                <button onClick={() => setvisibleModal2(false)} style={{ padding: '0px 15px', border: 'none', borderRadius: '3px', textAlign: 'right', marginTop: '10px'}} type="submit">Cancel</button>
                <button onClick={() => handleResetModal2()} style={{ padding: '0px 15px', border: 'none', borderRadius: '3px', textAlign: 'right', marginTop: '10px'}} type="submit">Reset</button>
              </div>
            </div>
            }
          </div>
        )
      },
      dataIndex: 'subject',
      key: 'subject',
    },
    // {
    //   title: 'Chương trình dạy',
    //   dataIndex: 'programs',
    //   key: 'programs',
    // },
    {
      title: () => { return <div onClick={() => sortHour('hourSchedule')}>Giờ dạy trên lớp <i className="fas fa-sort"></i></div>},
      dataIndex: 'hourSchedule',
      key: 'hourSchedule',
      width: 150,
      align: 'center',
      render: (value, item) => <Link to={`/admin/report/schedules/${item.lecturerId}?year=${item.year}&&semester=${item.semester}&&type=${type}`}>{value}</Link>
    },
    {
      title: () => { return <div onClick={() => sortHour('hourThesis')}>HD khóa luận <i className="fas fa-sort"></i></div>},
      dataIndex: 'hourThesis',
      key: 'hourThesis',
      width: 150,
      align: 'center',
      render: (value, item) => <Link to={`/admin/report/thesis/${item.lecturerId}?year=${item.year}&&semester=${item.semester}&&type=${type}`}>{value}</Link>
    },
    {
      title: () => { return <div onClick={() => sortHour('hourProject')}>HD đồ án <i className="fas fa-sort"></i></div>},
      dataIndex: 'hourProject',
      key: 'hourProject',
      width: 130,
      align: 'center'
    },
    {
      title: () => { return <div onClick={() => sortHour('hourTTCN')}>HD thực tập <i className="fas fa-sort"></i></div>},
      dataIndex: 'hourTTCN',
      key: 'hourTTCN',
      width: 130,
      align: 'center'
    },
    {
      title: () => { return <div onClick={() => sortHour('total')}>Tổng số giờ <i className="fas fa-sort"></i></div>},
      dataIndex: 'total',
      key: 'total',
      width: 130,
      align: 'center'
    }
  ];

  if(type) {
    columns.push(
      {
        title: () => { return <div onClick={() => sortHour('total')}>Tỷ lệ <i className="fas fa-sort"></i></div>},
        dataIndex: 'rate',
        key: "rate",
        width: 100,
        align: 'center',
        render: (value, item) => <span>{value} %</span>
      },
    )
  }
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
        console.log(sort, sortField)
        await callAdmin.report(year,semester, pageCurren,pagesize,type, sortField, sort ,valuefilter1, valuefilter2).then(res =>{
          setData(res.data.data)
          setTotalData(res.data.total)
          dispatch({
            type: LOADING_FULL_SCREEN,
            payload: false,
          })
        })
      } catch (error) {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [year, semester,pageCurren, pagesize,type,sort, sortField, valuefilter1, valuefilter2]);

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
        // year
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

        // list department
        const listDepartments = res?.data?.data.map(item => item.department)
        let dataDepartment  =  listDepartments?.filter((item, index) => listDepartments.indexOf(item) === index);
        dataDepartment = dataDepartment.map(item => { return {check: false, value: item}})
        setlistDepartment(dataDepartment)

        //list subject
        const listSubjects = res?.data?.data.map(item => item.subject)
        let dataSubject  =  listSubjects?.filter((item, index) => listSubjects.indexOf(item) === index);
        dataSubject = dataSubject.map(item => { return {check: false, value: item}})
        setlistSubject(dataSubject)

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
    history.push(`/admin/report?year=${year}&&semester=${semester}&&page=${page}&&size=${pageSize}&&keyword=${'ddd'}&&valuefilter2=${valuefilter2}&&valuefilter1=${valuefilter1}`)
  }
  const { Option } = Select;
  return (
    <LayoutAdmin match={match}>
      <h2 className="title">Báo cáo tổng hợp</h2>
      <Row justify="space-between">
        <Col>
          <Select onChange={value => settype(value)} defaultValue={0} style={{ width: 200 }}>
            <Option value={0}>Theo học kỳ</Option>
            <Option value={1}>Theo năm học</Option>
            <Option value={2}>Theo năm tài chính</Option>
          </Select>
        </Col>
        {
          useMemo(() => 
          <Col>
          { type==0 && <SelectSemester options={yearShow} onChangeYear={onChangeYear}></SelectSemester>}
          { Number(type) ? <SelectYear options={yearShow2} onChangeYear={onChangeYear}></SelectYear> : ''}
        </Col>
          , [type, yearShow, yearShow2])
        }
        <Col>
          Search
        </Col>
        <Col>
          <span onClick={() => downloadFile({year: year, semester: semester, type: type, sort: sort, sortField: sortField, valuefilter1: valuefilter1, valuefilter2: valuefilter2})}>Export file</span>
        </Col>
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
