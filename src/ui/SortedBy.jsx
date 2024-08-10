import React from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom';

function SortedBy({options}) {
    const [searchParams,setSearchParams] = useSearchParams();

    const selectedValue = searchParams.get('sortBy') || ""

    function handleOnChange(e){
        e.preventDefault();
        searchParams.set('sortBy',e.target.value);
        setSearchParams(searchParams)
    }
  return (
    <Select options={options} type="white" value={selectedValue} onChange={handleOnChange}/>
  )
}

export default SortedBy