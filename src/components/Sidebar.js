//import Timer from './components/Timer';
import { useSelector, useDispatch } from 'react-redux';
import React, {useState} from 'react';
//import { useEffect } from 'react';
import { ToggleClear,ToggleChangeColor,SetColor } from '../slice/canvasSlice';
import Timer from './Timer';
import '../App.css';

const Sidebar = () => {
    const dispatch = useDispatch();
    const uploadedFile = useSelector((state) => state.fileUpload.uploadedFile);
    const [color, setColor] = useState([]);
    const presetColors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF'];

    const thunk = () =>{
        console.log('thunking');
        dispatch(ToggleClear());
      }  

    const changeColor = (selectedColor) =>{
        setColor(selectedColor);
        dispatch(SetColor({data: selectedColor}));
        dispatch(ToggleChangeColor());
    }
    

  return (
    <div className='SideBar'>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {presetColors.map((presetColor, index) => (
          <button
            key={index}
            style={{ backgroundColor: presetColor, width: "30px", height: "30px", margin: "5px", border: "none", borderRadius: "50%", cursor: "pointer" }}
            onClick={() => changeColor(presetColor)}
          />
        ))}
        
      </div>
      <button onClick={thunk} style={{ position: 'relative', zIndex: 4 }}> Clear </button>
      <Timer />
    </div>
  )
}

export default Sidebar;