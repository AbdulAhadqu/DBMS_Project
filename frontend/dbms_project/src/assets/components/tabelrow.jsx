import React from 'react';
import { useState } from 'react';

function Tabelrow({element, handleDelete}) {
const [editable , seteditable ] = useState (true);
  return (
    
      // <tr >
      //       {Object.values(element).map((element,ind)=>(

      //         <td key={ind}>{element}</td>

      //       )) }
      //       <td>
      //       <button onClick={ ()=>seteditable (e=> !e)}>{editable?'Edit':'Save'}</button>
      //       </td>
      //       <td>
      //       <button onClick={ ()=> handleDelete (element)}>Delete</button>
      //     </td>
      // </tr>
    <tr>
      {Object.values(element).map((value, ind) => (
        <td key={ind}>{value}</td>
      ))}
      <td>
      <button onClick={ ()=>seteditable (e=> !e)}>{editable?'Edit':'Save'}</button>
      </td>
      <td>
        <button onClick={() => handleDelete(element)}>Delete</button>
      </td>
    </tr>
  )
}

export default Tabelrow;
