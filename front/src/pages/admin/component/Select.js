import React, {useState, useEffect} from 'react'

export default function Select({options, onChangeYear}) {

  const [data, setdata] = useState(options)
  const [vl, setVl] = useState(options[0])

  useEffect(() => {
    setdata(options)
  }, [options])

  const handleOnchangeSelect = (value) => {
    setVl(value);
    const arr = value.split(' ');
    (arr[1] && arr[0]) ? onChangeYear(arr[1], arr[0]) : onChangeYear('','')
  }
  return (
    <select value={vl} onChange={e => handleOnchangeSelect(e.target.value)}>
      {
        data && data.map(option => {
          const ar = option.split(' ');
          return (
            <option selected={vl===option} key={option} value={option}>{option==='All' ? 'All' : ` Hoc ky ${ar[0]} nam hoc ${ar[1]}`}</option>
          )
        })
      }
    </select>
  )
}
