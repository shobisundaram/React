import React from 'react';
import './Output.css'; 

    
      
 const Out =(props) =>{
//     useEffect(()=>{
//     console.log(props.calc) 
// })
console.log(props);
let liData = props.value ? props.value.map(item1=><li onClick={()=> props.functions.setShowval(item1.res)}> {item1.numA} {item1.sign} {item1.numB} = {item1.res}</li>) : '';

// let liData = '';
      return (

    // <textarea class="IsOutput" value={JSON.stringify(props)}> </textarea>
    <div class="divData">
      <ul>
        {liData}
      </ul> 
    </div>
    
     );
  };

export default Out;
