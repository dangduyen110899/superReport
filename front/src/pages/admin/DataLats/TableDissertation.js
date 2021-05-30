import React, {useState, useEffect, useMemo} from 'react';
import LayoutAdmin from '../Layout';
import Cookies from "js-cookie";
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
import callAdmin from 'api/admin/Dissertation';
import { toast } from "react-toastify";
import Select from '../component/Select';
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import { useDispatch } from 'store/index';
import { LOADING_FULL_SCREEN } from 'store/action-types';
import LoadingFullScreen from '../component/LoadingFullScreen';
import FormDissertation from './FormDissertation';

export default function TableDissertation({match}) {
    const dispatch = useDispatch()
  const value=queryString.parse(match.location.search);
  const history = useHistory()
  const [pageCurren, setPageCurren] = useState(value?.page || 1)
  const [pagesize, setPagesize] = useState(value?.size || 20)
  const [totalData, setTotalData] = useState(0)
  const [data, setData] = useState([])
  const [yearShow, setYearShow] = useState([''])
  const [itemEdit, setItemEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [year, setYear] = useState(value?.year || '');
  const [semester, setSemester] = useState(value?.semester || '')
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const [load, setLoad] = useState(false)

  const handleOkAddYear = (yearItem, semesterItem, fileItem) => {
    console.log(fileItem)
    dispatch({
      type: LOADING_FULL_SCREEN,
      payload: true,
    })
    const add = async () => {
      try {
        await callAdmin.checkYear({year: yearItem, semester: semesterItem}).then(() => {
          handleAddDissertations(fileItem, yearItem, semesterItem)
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

  let  columns = [
    {
      title: 'Mã SV',
      dataIndex: 'studentCode',
      key: 'studentCode',
      align: 'center'
    },
    {
      title: 'Sinh viên',
      dataIndex: 'studentName',
      key: 'studentName',
      width: 150,
      align: 'center'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150,
      align: 'center'
    },
    {
      title: 'Lớp',
      dataIndex: 'classCode',
      key: 'classCode',
      align: 'center'
    },
    {
      title: 'Tên đề tài',
      dataIndex: 'nameDissertation',
      key: 'nameDissertation',
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
      align: 'center'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center'
    }
  ];

  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: LOADING_FULL_SCREEN,
        payload: true,
      })
      try {
        const res = await callAdmin.dissertation(year,semester, pageCurren,pagesize)
        setData(res.data.data)
        setTotalData(res.data.total)
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
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
  }, [year, semester,  pageCurren,pagesize]);

  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: LOADING_FULL_SCREEN,
        payload: true,
      })
      try {
        return await callAdmin.dissertation('','', 0,0)
      } catch (error) {
        console.log("failed to request API: ", error)
      }
    };
    getData().then(res =>
      {
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })
        let arrString = res?.data?.data?.map((item, index) => {
          if (index===0) {
            setYear(item.year)
            setSemester(item.semester)
          }
          return item.semester + ' ' + item.year
        })
        const arr = arrString?.filter((item, index) => arrString.indexOf(item) === index);
        arr && setYearShow([...arr])      
      }
    )
  }, [load]);

  const handleAddDissertations = (file,year, semester) => {
    setIsModalVisible(false)
    const formData = new FormData()
    formData.append("file", file)
    formData.append('year', year)
    formData.append('semester', semester)
    const adds = async () => {
      try {
        const res = await callAdmin.addDissertations(formData)
        if(!res.data.length) {
          toast.error(res.data.message);
        }
        setLoad(!load)
        toast.success("Add Kltn success!");
        dispatch({
          type: LOADING_FULL_SCREEN,
          payload: false,
        })

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
    history.push(`/admin/lats?year=${item1}&&semester=${item2}&&page=${1}&&size=${pagesize}&&keyword=${'ddd'}`)
    setPageCurren(1)
    setYear(item1);
    setSemester(item2);
  }

  function onChange(page, pageSize) {
    history.push(`/admin/lats?year=${year}&&semester=${semester}&&page=${page}&&size=${pageSize}&&keyword=${'ddd'}`)
    setPageCurren(page)
    setPagesize(pageSize)
  }

  return (
    <LayoutAdmin match={match}>
      <h2 className="title">Quản lý luận án tiến sĩ</h2>
      <Row justify="space-between select_all">
        <Col>
          {
            useMemo(() => {
              return (
                <Select options={yearShow} defaultVl={''} onChangeYear={onChangeYear}></Select>
              )
            }, [yearShow])
          }
        </Col>
       {
         user && user.roles === 'ADMIN' &&
         <Col>
         <Space>
           <Button className="button-all" onClick={() => setIsModalVisible(true)}>
             Thêm luận án tiến sĩ
           </Button>
         </Space>
         <Modal
           title="Select time"
           footer={null}
           destroyOnClose
           onCancel={handleCancel}
           visible={isModalVisible}
         >
           <FormDissertation handleOkAddYear={handleOkAddYear} handleCancel={handleCancel} />
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
        useMemo(() => {
          return (
            totalData>1 && <Pagination onChange={onChange} total={totalData} defaultPageSize={pagesize} current={pageCurren}
              defaultCurrent={pageCurren}/>
                )
        }, [pageCurren,totalData,pagesize])
      }
       <LoadingFullScreen/>
    </LayoutAdmin>
  )
}