import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import queryString from 'query-string'
import callAdmin from 'api/admin/Report';
import LayoutAdmin from '../Layout';
import { Table } from 'antd';


let  columnsTkb = [
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

  let  columnsKltn = [
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
      align: 'center'
    },
    {
      title: 'Nhiệm vụ chiến lược',
      dataIndex: 'nvcl',
      key: 'nvcl',
      render: (text) => <span>{text===0 ? 'Không' : 'Có'}</span>,
      align: 'center'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center'
    }
  ];

  let  columnsCvht = [
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
      title: 'Giảng viên cố vấn học tập',
      dataIndex: 'lecturerName',
      key: 'lecturerName',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center'
    }
  ];
  let  columnsLvts = [
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
      dataIndex: 'namephdThesis',
      key: 'namephdThesis',
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

  let  columnsDatn = [
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
      dataIndex: 'nameproject',
      key: 'nameproject',
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

  let  columnsTttd = [
    {
      title: 'Giảng viên',
      dataIndex: 'lecturerName',
      key: 'lecturerName',
    },
    {
      title: 'Ngày thực tập thực địa',
      dataIndex: 'date',
      key: 'date',
      align: 'center'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center'
    }
  ];

  let  columnsLats = [
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
export default function DetailReportLecturer({match}) {
    const value=queryString.parse(match.location.search);
    const [year, setYear] = useState(value?.year || '');
    const [semester, setSemester] = useState(value?.semester || '')
    const lecturerId = value?.lecturerId
    const type = value?.type
    const history = useHistory()
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])
    const [data6, setData6] = useState([])
    const [data7, setData7] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
              const res = await callAdmin.detail(year,semester, lecturerId, type)
              console.log(res)
                 setData(res.data.data)
                setData1(res.data.data1)
                setData2(res.data.data2)
                setData3(res.data.data3)
                setData4(res.data.data4)
                setData5(res.data.data5)
                setData6(res.data.data6)
                setData7(res.data.data7)
            } catch (error) {
              console.log("failed to request API: ", error)
            }
          };
          getData();
    }, [])
    return (
        <LayoutAdmin match={match}>
                <h2 className="title">Danh sách hướng dẫn chi tiết của giảng viên: {data[0] && data[0]?.lecturerName}</h2>
                <h4 className="title">{type==='0' ? `Học kỳ ${semester} năm học ${year}` : type==='1' ? `Năm học ${year}` : `Năm tài chính ${year}` }</h4>
                <button className="btn btn-primary" onClick={() => history.goBack()} style={{float: "left",
                marginBottom: "10px",
                fontSize: '9px'}}>Trở về</button>
            {/* table gio day trong dh */}
            <br></br>
            <br></br>
            {
                data.length>0 && 
                <>
                <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách giảng daỵ thời khóa biểu trong đại học</p>
                <Table
                columns={columnsTkb}
                dataSource={data}
                bordered
                pagination={false}
                />
                </>
            }
            {/* table gio sau trong dh */}
            {
                data1.length>0 && 
                <>
               <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách giảng daỵ thời khóa biểu sau đại học</p>
                <Table
                columns={columnsTkb}
                dataSource={data1}
                bordered
                pagination={false}
                />
                </>
            }
            {/* table kltn */}
            {
                data2.length>0 && 
                <>
                <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách hướng dẫn khoá luận tốt nghiệp</p> 
                <Table
                columns={columnsKltn}
                dataSource={data2}
                bordered
                pagination={false}
                />
                </>
            }
            {/* table datn */}
            {
                data3.length>0 && 
                <>
                <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách hướng dẫn đồ án tốt nghiệp</p>
                <Table
                columns={columnsDatn}
                dataSource={data3}
                bordered
                pagination={false}
                />
                </>
            }
            {/* table lvts */}
            {
                data4.length>0 && 
                <>
                <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách hướng dẫn luận văn thạc sĩ</p>
                <Table
                columns={columnsLvts}
                dataSource={data4}
                bordered
                pagination={false}
                />
                </>
            }
            {/* table lats */}
            {
                data5.length>0 && 
                <>
                <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách hướng dẫn luận án tiến sĩ</p>
                <Table
                columns={columnsLats}
                dataSource={data5}
                bordered
                pagination={false}
                />
                </>
            }
            {/* table cvht */}
            {
                data6.length>0 && 
                <>
                <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách hướng dẫn cố vấn học tập</p>
                <Table
                columns={columnsCvht}
                dataSource={data6}
                bordered
                pagination={false}
                />
                </>
            }
            {/* table tttd */}
            {
                data7.length>0 && 
                <>
                <p style={{textAlign: 'left', fontWeight: 'bold', padding: '10px'}}>Danh sách hướng dẫn thực tập thực địa</p>
                <Table
                columns={columnsTttd}
                dataSource={data7}
                bordered
                pagination={false}
                />
                </>
            }
        </LayoutAdmin>
    )
}


