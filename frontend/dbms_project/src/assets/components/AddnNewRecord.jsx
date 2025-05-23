import React, { useState,useEffect } from 'react';
import Modal from './Modal';

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
      setModal(true)
    }, [data, onSubmitToParent]);


    function handleChange (e,key){
      setRecord (prev=> ({...prev,[key]:e.target.value}))

    }
    function handleSubmit(e) {
  e.preventDefault();
  setdata(record);
  setRecord({})
  toggle ()
    }


  return (
    <div>

     <Modal title={"Add Record"}>
      {
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
                  <span>{`${key.replace('_', "  ")}:`}</span> 
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
        <div className="aligning_div">
        <button type='button' onClick={toggle}>Cancel</button>
        <button type='submit' >Submit</button>

        </div>
      </form>
      }
      </Modal>
    </div>
  )
}

export default AddNewRecord
