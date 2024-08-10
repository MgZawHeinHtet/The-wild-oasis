import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortedBy from '../../ui/SortedBy'

function CabinTableOperations() {
  const options = [
    {value : 'all' ,label : 'All'},
    {value : 'discount' ,label : 'Discount'},
    {value : 'no-discount' ,label : 'No Discount'}
  ]

  const sortOptions = [
    {value : 'name-asc' ,label : 'Sort by name (A-Z)'},
    {value : 'name-desc' ,label : 'Sort by name (Z-A)'},
    {value : 'regularPrice-asc' ,label : 'Sort by price (low first)'},
    {value : 'regularPrice-desc' ,label : 'Sort by price (high first)'},
    {value : 'maxCapacity-asc',label : 'Sort by capacity (low first)'},
    {value : 'maxCapacity-desc',label : 'Sort by capacity (high first)'}
  ]
  return (
    <TableOperations>
        <Filter fieldName='discount' options={options}/>
        <SortedBy options={sortOptions}/>
    </TableOperations>
  )
}

export default CabinTableOperations