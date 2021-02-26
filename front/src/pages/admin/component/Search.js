import React, { useState, useEffect } from 'react';
import { Select, Space } from 'antd';
const { Option } = Select;

export default function Search({ onSearch, data }) {
  const [key, setKey] = useState();

  useEffect(() => {
    setKey(
      `${data?.length > 0 && data[data.length - 1].year} ${
        data?.length > 0 && data[data.length - 1].semester
      }`
    );
  }, [data]);

  const handle = (value) => {
    onSearch(value);
  };

  return (
    <Space>
      <Select
        value={key}
        onChange={(value) => {
          setKey(value);
          handle(value);
        }}
      >
        {data?.map((item) => {
          return (
            <Option value={`${item.year} ${item.semester}`}>
              Học kì: {item.semester}, năm học: {item.year}
            </Option>
          );
        })}
      </Select>
    </Space>
  );
}
