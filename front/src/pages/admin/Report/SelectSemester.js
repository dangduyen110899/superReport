import React, { useEffect, useMemo, useState } from 'react'
import {
   Select
  } from 'antd';

export default function SelectSemester({options, onChangeYear}) {
    const [defaultOption, setdefaultOption] = useState(options[0])
    useEffect(() => {
        setdefaultOption(options[0])
    }, [options])
    const { Option } = Select;
    function handleOnChangeSemester(value) {
        const arr = value.split(' ');
        onChangeYear(arr[1] || '', arr[0] || '')
        setdefaultOption(value)
    }

    function getTitle(value) {
        const arr = value.split(' ');
        return `Học kỳ ${arr[0]==1 ? 'I' : 'II'} năm học ${arr[1]}`
    }

    console.log("defaultOption", defaultOption)

    return (
        <div>
        <Select onChange={value => handleOnChangeSemester(value)} value={defaultOption} style={{ width: 250 }}>
            {
                options.map((item, index) => 
                <Option key={index} value={item}>{getTitle(item)}</Option>
                )
            }
        </Select>
        </div>
    )
}
