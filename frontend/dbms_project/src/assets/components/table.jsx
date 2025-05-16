import React from 'react';
import Tabelrow from './tabelrow';

function Table({data,handleDelete}) {
    

  return (
    
    <table>
      <thead>
         
          {data.length > 0 && (
          <tr>
          {Object.keys(data[0]).map((key,index) => (
          <th key={index}>{key}</th>
          ))}
          </tr>
          )}
        </thead>
        <tbody>
          {data.map((element, index)=>(
          
          <Tabelrow key={index} element={element}handleDelete ={handleDelete} />
          
          
          ))}
          
        </tbody>
      </table>
    
  );
}

export default Table;
