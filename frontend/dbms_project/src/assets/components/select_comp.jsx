import React from 'react'

function Select({handleOptionChange}) {
  return (
    <div>
      <select onChange={ (e)=> handleOptionChange(e)}>
        <option value="">Select Table</option>
        <option value="books">Books Table</option>
        <option value="customers">Customer Table</option>
        <option value="orders">orders</option>
      </select>
    </div>
  )
}

export default Select;

