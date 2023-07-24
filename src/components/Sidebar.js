import Timer from './components/Timer';
import { useSelector, useDispatch } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { useEffect } from 'react';
import SinglePage from './components/Singlepage';
import { selectCanvas, ToggleClear } from './slice/canvasSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const uploadedFile = useSelector((state) => state.fileUpload.uploadedFile);


    const thunk = () =>{
        console.log('thunking');
        dispatch(ToggleClear());
      }  
    
    return (
        <div className='SideBar'>

            <button onClick={thunk} style={{ position: 'relative', zIndex: 4 }}> Clear </button>
            {//<Timer />
            // <Color Selector />
            }
        </div>
    )

}

export default Sidebar;