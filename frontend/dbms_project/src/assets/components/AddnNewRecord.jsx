import React, { useState,useEffect } from 'react';
function AddNewRecord({element,primarykey,onSubmitToParent}) {
    const [data, setdata] = useState({});
    const [record , setRecord]= useState({});
    const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

    useEffect(() => {
      if (Object.keys(data).length > 0) {
        onSubmitToParent(data);
        setRecord({});
         setdata({});
        
      }
    }, [data, onSubmitToParent]);


    function handleChange (e,key){
      setRecord (prev=> ({...prev,[key]:e.target.value}))

    }
    function handleSubmit(e) {
  e.preventDefault();
  setdata(record);
  setRecord({})
    }


  return (
    <div>
      <button style={{display:modal?'none':'block'}} onClick={toggle}>Add Record</button>
     
        <form onSubmit={handleSubmit}>
       {
           Object.entries(element).filter (([key,_])=> key!== primarykey ).map(([key,value],index)=>{
               let inputType = 'text';
               if (typeof value === 'number') {
               inputType = 'number'; 
               } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
               inputType = 'datetime-local'; 
               } else if (typeof value === 'boolean') {
               inputType = 'checkbox';
               }else if (key == 'email'){
                 inputType= 'email';
               }
               return(
               <label key={index} htmlFor={key}>
                  <span>{`${key}:`}</span> 
                   <input 
                   type={inputType} 
                   name={key}
                   defaultValue={inputType !== "checkbox" ? record[key] : undefined}                   
                   onChange={e=>handleChange(e,key)}
                   required                
                   />
               </label>
                );
})
        }
        <button type='submit' >Submit</button>
      </form>

    </div>
  )
}

export default AddNewRecord
