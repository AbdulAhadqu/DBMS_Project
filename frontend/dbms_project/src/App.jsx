
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Table from './assets/components/table';
import Select from './assets/components/select_comp';
import AddNewRecord from './assets/components/AddnNewRecord';
import './app.css';

function App() {
  
  const [data, setdata]= useState([]);
  const [table ,setTable]= useState('books');
  const [postdata, setpostdata]= useState ({});
  const [primaryKey, setPrimaryKey] =useState ('')
  
  console.log (data)
  useEffect (()=>{
    fetch (`http://localhost:8000/${table}`)
    .then( res => res.json())
    .then( data=> {
      setdata([...data]);
      setPrimaryKey(Object.keys (data[0])[0]);
    })
    .catch(err =>console.log(err) )
      
  },[table,postdata])
  console.log('Primary keyyyyyyyyyyyyyyyyyyyyyyy:', primaryKey);

  function handleOptionChange (event){
      setTable(event.target.value);
  }

   function onSubmitToParent(data){
   fetch(`http://localhost:8000/${table}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Request failed");
  }
})
.then(() => {
  console.log( 'Record added succesfully!!!');
  setpostdata({...data})
  setdata (prev=>([...prev,data]));
})
.catch(error => {
  console.error(error);
});

  }
  const handleSave = (updatedRow, bodyData) => {
    fetch(`http://localhost:8000/${table}/${primaryKey}/${updatedRow[primaryKey]}`, {
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
    fetch(`http://localhost:8000/${table}/${row[primaryKey]}`, 
      {method: 'DELETE'}
    )
    .then((res)=> {
      if (!res.ok) {
        throw new Error('Failed to delete the record');
      }
      return res.json();
    })
    .then(()=>{
         setdata(prev => prev.filter(item=> item[primaryKey] !== row[primaryKey]))
    })
    .catch(err => console.log( err))
  }
  
  return (
    <div className='container'>
      <div className="upper">
      <Select handleOptionChange={handleOptionChange}/>

      {data.length > 0 && table !== 'orders' && (
        <AddNewRecord element={data[0]} primarykey={primaryKey} onSubmitToParent={onSubmitToParent} />
      )}
      </div>

      <Table data={data} handleDelete={handleDelete} handleSave={handleSave} />
    </div>
  )
}

export default App

