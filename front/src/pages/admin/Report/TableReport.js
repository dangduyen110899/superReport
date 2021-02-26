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
      title: 'teaching hours',
      dataIndex: 'teachingHours',
      key: 'teachingHours',
    },
    {
      title: 'Kltn hours',
      dataIndex: 'thesisHours',
      key: 'thesisHours',
    },
    {
      title: 'Datn hours',
      dataIndex: 'datnHours',
      key: 'datnHours',
    },
    {
      title: 'Latn hours',
      dataIndex: 'latnHours',
      key: 'latnHours',
    },
    {
      title: 'Lvts hours',
      dataIndex: 'lvtsHours',
      key: 'lvtsHours',
    },
    {
      title: 'Tt hours',
      dataIndex: 'TtHours',
      key: 'TtHours',
    },
    {
      title: '... hours',
      dataIndex: 'vHours',
      key: 'vHours',
    },
  ];

  const onChangeYear = (item1, item2) => {
    console.log(item1, item2)
    setYear(item1);
    setSemester(item2);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        await callAdmin.report(year,semester).then(res =>
          setData(res.data.data)
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
        return await callAdmin.tkb('','')
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData().then(res =>
      {
        let arrString = res.data.data.map(item => item.semester + ' ' + item.year)
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
