import React, { useState } from 'react'

function AddNewRecord({element,primarykey}) {
    const [data, setdata] = useState({})
    const [record , setRecord]= useState({})
    // console.log(element)
    function handleChange (e,key){
      setRecord (prev=> ({...prev,[key]:e.target.value}))

    }
    function handleSubmit(e) {
  e.preventDefault();
  setdata(record);
  // setRecord({})
  console.log(data,record)
    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
            Object.entries(element).filter (([key,_])=> key!== primarykey ).map(([key,value],index)=>{
                let inputType = 'text';
                if (typeof value === 'number') {
                inputType = 'number'; 
                } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
                inputType = 'date'; 
                } else if (typeof value === 'boolean') {
                inputType = 'checkbox';
                }
                return(
                <label key={index} htmlFor={key}>
                    {`${key}:`}
                    <input 
                    type={inputType} 
                    name={key}
                    defaultValue={inputType !== "checkbox" ? record[key] : undefined}
                  defaultChecked={inputType === "checkbox" ? record[key] : undefined}
                    onChange={e=>handleChange(e,key)}
                    
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
