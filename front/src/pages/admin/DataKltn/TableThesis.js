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
  Space
} from 'antd';
import callAdmin from 'api/admin/Thesis';
import { toast } from "react-toastify";
import FormAddYear from '../component/FormAddYear';
import Select from '../component/Select';

export default function TableThesic({match}) {
  const [data, setData] = useState([])
  const [yearShow, setYearShow] = useState(['All'])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('')

  const handleOkAddYear = (yearItem, semesterItem) => {
    const add = async () => {
      try {
        await callAdmin.checkYear({year: yearItem, semester: semesterItem}).then(() => {
          setYearShow([`${semesterItem} ${yearItem}`,...yearShow]);
          setIsModalVisible(false);
          toast.success("Add year success!");
        })
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
    itemEdit.status = 0;
    const remove = async () => {
      try {
        await callAdmin.editThesis(itemEdit)
        const res = await callAdmin.thesis(year,semester)
        setData(res.data)
        toast.success("Delete thesic success")
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    remove();
  }

  let columns
  if(!year && !semester) {
    columns = [
      {
        title: 'Năm học',
        dataIndex: 'year',
        key: 'year',
      },
      {
        title: 'Học kỳ',
        dataIndex: 'semester',
        key: 'semester',
      },
      {
        title: 'Mã SV',
        dataIndex: 'studentCode',
        key: 'studentCode',
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
      },
      {
        title: 'Lớp',
        dataIndex: 'classCode',
        key: 'classCode',
      },
      {
        title: 'Tên đề tài',
        dataIndex: 'nameThesis',
        key: 'nameThesis',
      },
      {
        title: 'Giảng viên',
        dataIndex: 'lecturerName',
        key: 'lecturerName',
      },
      {
        title: 'Ngôn ngữ',
        dataIndex: 'language',
        key: 'language',
        render: (text) => <span>{text===0 ? 'Tiếng việt' : 'Tiếng anh'}</span>,
      },
      {
        title: 'Nhiệm vụ chiến lược',
        dataIndex: 'nvcl',
        key: 'nvcl',
        render: (text) => <span>{text===0 ? 'Không' : 'Có'}</span>,
      },
      {
        title: 'Ghi chú',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: 'Action',
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
    ];
  } else {
    columns = [
      {
        title: 'Mã SV',
        dataIndex: 'studentCode',
        key: 'studentCode',
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
      },
      {
        title: 'Lớp',
        dataIndex: 'classCode',
        key: 'classCode',
      },
      {
        title: 'Tên đề tài',
        dataIndex: 'nameThesis',
        key: 'nameThesis',
      },
      {
        title: 'Giảng viên',
        dataIndex: 'lecturerName',
        key: 'lecturerName',
      },
      {
        title: 'Ngôn ngữ',
        dataIndex: 'language',
        key: 'language',
        render: (text) => <span>{text===0 ? 'Tiếng việt' : 'Tiếng anh'}</span>,
      },
      {
        title: 'Nhiệm vụ chiến lược',
        dataIndex: 'nvcl',
        key: 'nvcl',
        render: (text) => <span>{text===0 ? 'Không' : 'Có'}</span>,
      },
      {
        title: 'Ghi chú',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: 'Action',
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
    ];
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await callAdmin.thesis(year,semester)
        setData(res.data)
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData();
  }, [year, semester]);

  useEffect(() => {
    const getData = async () => {
      try {
        return await callAdmin.thesis('','')
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

  const handleAddThesiss = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append('year', year)
    formData.append('semester', semester)
    const adds = async () => {
      try {
        const res = await callAdmin.addThesiss(formData)
        if(res.data.length) {
          setData([...data, ...res.data])
          toast.success("Add thesiss success!");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    adds();
  }

  const onChangeYear = (item1, item2) => {
    setYear(item1);
    setSemester(item2);
  }

  return (
    <LayoutAdmin match={match}>
      <Row justify="space-between">
        <Col>
          {
            useMemo(() => {
              return (
                <Select options={yearShow} defaultVl={'All'} onChangeYear={onChangeYear}></Select>
              )
            }, [yearShow])
          }
        </Col>
        <Col>
          <input type="file" onChange={e => handleAddThesiss(e.target.files[0])}/>
          <Space>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              + Add thesis
            </Button>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
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
            <FormAddYear handleOkAddYear={handleOkAddYear} handleCancel={handleCancel} />
          </Modal>
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
