import React from 'react'
import {
   Select
  } from 'antd';

export default function SelectYear({options, onChangeYear}) {
    const { Option } = Select;
    return (
        <div>
            <Select onChange={value => onChangeYear(value, 1)} defaultValue={options[0]} style={{ width: 150 }}>
            {
                options.map((item, index) => 
                <Option key={index} value={item}>{item}</Option>
                )
            }
          </Select>
        </div>
    )
}
