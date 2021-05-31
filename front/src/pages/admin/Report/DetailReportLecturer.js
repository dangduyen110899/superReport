import React from 'react'

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

export default function DetailReportLecturer({idLecturer, year, semester}) {
    use
    return (
        <>
            <div>
            {/* title */}
            Chi tiet thoi gian lam viec cuar giang vien X trong nawm hojc , hojc kyx
            </div>
            {/* table gio day trong dh */}

            {/* table gio sau trong dh */}
            {/* table kltn */}
            {/* table datn */}
            {/* table lvts */}
            {/* table lats */}
            {/* table cvht */}
            {/* table tttd */}
        </>
    )
}


