import React from 'react';
import Tabelrow from './tabelrow';

function Table({data,handleDelete,handleSave}) {
    

  return (
    
    <table>
      <thead>
         
          {data.length > 0 && (
          <tr>
          {Object.keys(data[0]).map((key,index) => (
          <th key={index}>{key}</th>
          ))}
            <th colSpan={2}>Action</th>
          </tr>
          )}
        </thead>
        <tbody>
          {data.map((element, index)=>(
          <Tabelrow key={index} element={element} handleDelete ={handleDelete} handleSave={handleSave}  />
          ))}
          
        </tbody>
      </table>
    
  );
}

export default Table;
