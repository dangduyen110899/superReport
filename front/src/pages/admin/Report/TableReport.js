import React, {useState, useEffect} from 'react';
import LayoutAdmin from '../Layout';
import {
  Table,
  Row,
  Col
} from 'antd';
import callAdmin from 'api/admin/Report';
import Select from '../component/Select';

export default function TableReport({match}) {
  const [data, setData] = useState([])
  const [yearShow, setYearShow] = useState(['All'])
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('')

  let columns = [
    {
      title: 'year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'semester',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: 'lecturerId',
      dataIndex: 'lecturerId',
      key: 'lecturerId',
    },
    {
      title: 'lecturerName',
      dataIndex: 'lecturerName',
      key: 'lecturerName',
    },
    {
      title: 'Hour schedule',
      dataIndex: 'hourSchedule',
      key: 'hourSchedule',
    },
    {
      title: 'Hour thesis',
      dataIndex: 'hourThesis',
      key: 'hourThesis',
    },
    {
      title: 'Hour project',
      dataIndex: 'hourProject',
      key: 'hourProject',
    },
    {
      title: 'Hour intern',
      dataIndex: 'hourTTCN',
      key: 'hourTTCN',
    },
    {
      title: 'Total hours',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const onChangeYear = (item1, item2) => {
    setYear(item1);
    setSemester(item2);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        await callAdmin.report(year,semester).then(res =>
          setData(res.data)
        )
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [year, semester]);

  useEffect(() => {
    const getData = async () => {
      try {
        return await callAdmin.report('','')
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData().then(res =>
      {
        let arrString = res.data.map(item => item.semester + ' ' + item.year)
        const arr = arrString.filter((item, index) => arrString.indexOf(item) === index);
        setYearShow(['All',...arr])
      }
    )
  }, []);


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
        pagination={{ defaultPageSize: 10}}
         />
    </LayoutAdmin>
  )
}
