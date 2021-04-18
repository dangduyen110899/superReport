import React, { useMemo } from 'react'
import {
   Select
  } from 'antd';

export default function SelectSemester({options, onChangeYear}) {
    const defaultValue = options[0]
    const { Option } = Select;
    function handleOnChangeSemester(value) {
        const arr = value.split(' ');
        onChangeYear(arr[1] || '', arr[0] || '')
    }

    function getTitle(value) {
        const arr = value.split(' ');
        return `Học kỳ ${arr[0]==1 ? 'I' : 'II'} năm học ${arr[1]}`
    }

    return (
        <div>
        <Select onChange={value => handleOnChangeSemester(value)} defaultValue={defaultValue} style={{ width: 250 }}>
            {
                options.map((item, index) => 
                <Option key={index} value={item}>{getTitle(item)}</Option>
                )
            }
        </Select>
        </div>
    )
}
