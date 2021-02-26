import React from 'react'
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import {Button} from 'antd'

export default function UploadFile({record, handleUpload, name}) {
  return (
    <>
      {/* { record[name] ?  <span>
        <PaperClipOutlined />
        {record[name]}
      </span> : <div style={{position: "relative"}}>
          <input
            type="file"
            onChange={e => handleUpload(record, e.target.files[0], name)}
            className="upload-file-admin"
          />
          <Button
            icon={<UploadOutlined />}
            style={{ position: "absolute", left: "0",top: "-16px" }}
          >
           Upload
          </Button>
      </div>
      } */}
    </>
  )
}
