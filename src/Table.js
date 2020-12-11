import React ,{ forwardRef, useRef, useImperativeHandle } from 'react';
import './Table.css';
import numeral from 'numeral'; 
/* import SimpleModal from 'SimpleModal';  */

function Table({countries}) { 


   
    const childRef = useRef(); 

    const showAlert = () => alert("name");   
    console.log('==============',countries);  

    return( <div className="table"  onClick={showAlert}>   
             {countries.map (({country, cases}) => (
              <tr>
                  <td>{country}</td>
                  <td>
                  <strong>{numeral(cases).format("0,0")}</strong>
                 </td>
              </tr>
               ))}  
              {/*  <SimpleModal ref={childRef}/>  */} 
            </div>
    ) 
    
}

export default Table

/* onClick={childRef.current.showAlert()} */