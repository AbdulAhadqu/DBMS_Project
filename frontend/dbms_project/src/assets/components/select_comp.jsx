import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {toast} from 'react-toastify';

function Select({handleOptionChange}) {
  const [table, setTable] = useState ([]);
  useEffect ( ()=>{
   fetch (`http://localhost:8000/table`)
   .then (res => res.json())
   .then ( data => {setTable([...data])
   })
   .catch (err => {
    console.error (err)})
  }, [])
  table.length<0 && toast.warning("No Table Found!!!");
  console.log(table)
  return (
    <>
    <div>
      
      <select onChange={ (e)=> handleOptionChange(e)}>
        <option value="">Select Table</option>

        {
        table.map((element,index)=>{
          let tabelname =Object.values(element)
          return(
          <option key={index} value={tabelname}>{tabelname}</option>  
          )  
})
        }
        
      </select>
      
    </div>
    </>
  )
}

export default Select;

