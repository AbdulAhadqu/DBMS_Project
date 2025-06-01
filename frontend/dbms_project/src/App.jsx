
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Table from './assets/components/table';
import Select from './assets/components/select_comp';
import AddNewRecord from './assets/components/AddnNewRecord';
import { ToastContainer, toast } from 'react-toastify';
import LoginPage from './assets/components/LoginPage';
import './app.css';

function App() {
  
  const [data, setdata]= useState([]);
  const [table ,setTable]= useState('');
  const [postdata, setpostdata]= useState ({});
  const [primaryKey, setPrimaryKey] =useState ('');
  const [LoggedIn, setLoggedIn] = useState(true);
  
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
  
  useEffect(() => {
  if (sessionStorage.getItem('user@ex') === '123456') {
    toast.success('✅ Logged In from session!');
    setLoggedIn(false);  
  }
}, []);

  function handleOptionChange (event){
      setTable(event.target.value);
  }

   function handleLoggedIn (){
    setLoggedIn(login => !login);

  }
   function onSubmitToParent(data) {
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
      setpostdata({ ...data });
      setdata(prev => [...prev, data]);
      toast.success("Record Added Successfully!!!");
    })
    .catch(error => {
      console.error(error);
      toast.error("Record Not Added!!!");
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
        toast.success("Record Updated Succesfully!!!");
      })
      .catch((err) => {console.log('Update error:', err) 
        toast.error("Record Is Not Updated!!!")
      });
  };

  function handleDelete(row ){
    fetch(`http://localhost:8000/${table}/${primaryKey}/${row[primaryKey]}`, 
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
         toast.success("Record Deleted Succesfully!!! ")
    })
    .catch(err => {
      toast.error("Record Is Not Deleted!!!")
      console.log( err)})
  }
  
  return (
    LoggedIn 
    ?
    <LoginPage handleLoggedIn={handleLoggedIn} />
    :
    <>
    <div className='container'>
      <ToastContainer/>
      <div className="upper">
      <Select handleOptionChange={handleOptionChange}/>

      {data.length > 0  && (
        <AddNewRecord element={data[0]} primarykey={primaryKey} onSubmitToParent={onSubmitToParent} />
      )}
      </div>
      {data.length > 0 ? (
        <div className='tableContainer'>
        <Table data={data} handleDelete={handleDelete} handleSave={handleSave} />
        </div>)
      :(<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h1 >No Records Available</h1>
      </div>)}
    </div>
    </>
    
  )
}

export default App

