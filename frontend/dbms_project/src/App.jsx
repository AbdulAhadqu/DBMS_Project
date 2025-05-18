
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Table from './assets/components/table';
import Select from './assets/components/select_comp';
import AddNewRecord from './assets/components/AddnNewRecord';
import './app.css';

function App() {
  
  const [data, setdata]= useState([]);
  const [table ,setTable]= useState('books');
  
  console.log (data)
  useEffect (()=>{
    fetch (`http://localhost:8000/${table}`)
    .then( res => res.json())
    .then( data=> setdata([...data]))
    .catch(err =>console.log(err) )
  },[table])
  
  let primarykey;
  if (table=='books')
  {
    primarykey = 'book_id';
  }
  else if (table =='customers'){
    primarykey= 'customer_id'
  }
  else{
    primarykey='order_id'
  }

  function handleOptionChange (event){
      setTable(event.target.value);
  }


  const handleSave = (updatedRow, bodyData) => {
    fetch(`http://localhost:8000/${table}/${updatedRow[primarykey]}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then(() => {
        setdata((prev) =>
          prev.map((row) => (row === updatedRow ? {...updatedRow,...bodyData} : row))
        );
      })
      .catch((err) => console.log('Update error:', err));
  };

  function handleDelete(row ){
    fetch(`http://localhost:8000/${table}/${row[primarykey]}`, 
      {method: 'DELETE'}
    )
    .then((res)=> {
      if (!res.ok) {
        throw new Error('Failed to delete the record');
      }
      return res.json();
    })
    .then(()=>{
         setdata(prev => prev.filter(item=> item[primarykey] !== row[primarykey]))
    })
    .catch(err => console.log( err))
  }
  
  return (
    <div>
      <Select handleOptionChange={handleOptionChange}/>
      {data.length > 0 && table !== 'orders' && (
        <AddNewRecord element={data[0]} primarykey={primarykey} />
      )}

      <Table data={data} handleDelete={handleDelete} handleSave={handleSave} />
    </div>
  )
}

export default App

