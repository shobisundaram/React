// import {Textfit} from 'react-textfit';
import './Screen.css'; 
 


const Screen =({value}) => {
   
    return(
        <textarea className='screen'  max={70} value={value}>
        </textarea>
    );
   
};
export default Screen;