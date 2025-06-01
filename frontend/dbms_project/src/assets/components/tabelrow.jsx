import React from 'react';
import { useState , useEffect} from 'react';

function Tabelrow({element, handleDelete ,handleSave}) {
const [alteredData, setalteredData]= useState({})
const [editable , seteditable ] = useState (false);
useEffect(() => {
  if (element) {
    setalteredData(format_data(element));
  }
}, [element]);

function format_data (element){
  const keys = Object.keys(element);
  const format ={};
  keys.map((key)=>{
    format[key]=null;
  })
  return format;
}

function notNullObject (obj){
const nonNullEntries = Object.entries(obj).filter(([key, value]) => value !== null);

const nonNullobject = Object.fromEntries(nonNullEntries);

return nonNullobject;
}

function handleInputChange(key, e, type) {

  let value;
  if (type === 'checkbox') {
    value = e.target.checked;
  } else if (type === 'number') {
    value = parseFloat(e.target.value);
  } else {
    value = e.target.value;
  }
  

  const updatedData = {
    ...alteredData,
    [key]: value
  };

  const obj = notNullObject(updatedData);
 
  setalteredData(obj);

}

console.log (alteredData)


return (
  editable ? (
    <tr>
      {Object.entries(element).map(([key, value], ind) => {
        let inputType = 'text';
        
        if (typeof value === 'number') {
          inputType = 'number'; 
        }  else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
          inputType = 'datetime-local'; 
        } else if (typeof value === 'boolean') {
          inputType = 'checkbox';
        }else if (key == 'email'){
          inputType= 'email';
        }
        else if (key == 'phone'){
          inputType='tel';
        }

        return (
          <td key={ind}>
            {ind !== 0 ?(
              <input
              inert= {ind==0}
              type={inputType}
              defaultValue={inputType === 'checkbox' ? undefined : value}
              checked={inputType === 'checkbox' ? value : undefined}
              onChange={(e) => handleInputChange(key, e, inputType)}
            />
          ):(
            <span>{value}</span>
          )}
            
          </td>
        );
      })}
      <td>
        <button className='tableRowBtn' onClick={() => {seteditable(false)
        Object.entries(notNullObject(alteredData)).length>0 && handleSave(element,notNullObject(alteredData));
        }}>Save</button>
      </td>
      <td>
        <button className='tableRowBtn' onClick={() => handleDelete(element)}>Delete</button>
      </td>
    </tr>
  ) : (<tr>
  {Object.keys(element)[0] !== 'Tables_in_library' ? (
    <>
      {Object.values(element).map((value, ind) => (
        <td key={ind}>{value?.toString()}</td>
      ))}
      <td>
        <button className='tableRowBtn' onClick={() => seteditable(true)}>Edit</button>
      </td>
      <td>
        <button className='tableRowBtn' onClick={() => handleDelete(element)}>Delete</button>
      </td>
    </>
  ) : null
  }
</tr>)
  )




}

export default Tabelrow;
