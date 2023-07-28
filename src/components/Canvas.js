import React, { useCallback, useEffect, useRef, useState } from 'react';
import { selectCanvas, selectColor, selectColorChange, ToggleChangeColor, ToggleClear } from '../slice/canvasSlice';
import { useSelector, useDispatch } from 'react-redux';
import {store} from '../store/store';

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);
  const variable = useSelector(selectCanvas).canvas.clearCanvas;
  const colorRedux = useSelector(selectColor);
  const [colorState,setColorState] = useState('blue');
  const colorChange = useSelector(selectColorChange);
  const dispatch = useDispatch();

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  //TODO modify to make the eraser work when the variable is changed
  useEffect(() => {
    // Function to be triggered when clearCanvas changes
    console.log(`clearCanvas:${variable}`);
    const handleClearCanvasChange = () => {
      if (variable) {
        // Do something when clearCanvas is true
        
        erase();
      } else {
        // Do something when clearCanvas is false
        
      }
    };

    handleClearCanvasChange(); // Call the function initially

    // Subscribe to changes in clearCanvas
    const unsubscribe = store.subscribe(handleClearCanvasChange);

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, [variable]);

  
  useEffect(() => {
    // Function to be triggered when colorChange changes
    const handleColorChange = () => {
      console.log(`colorChange:${colorChange}`);
      if (colorChange) {
        // Do something when colorChange is true
        
        changeColor(colorRedux);
      } else {
        // Do something when colorChange is false
        
      }
    };

    handleColorChange(colorRedux); // Call the function initially

    // Subscribe to changes in colorChange
    const unsubscribe = store.subscribe(handleColorChange);

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, [colorRedux]);


  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        //console.log(`x:${mousePosition.x} and y: ${mousePosition.y}`); co ordinates of drawing lines is here. not saved in state. Only saved in the ref.
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  const drawLine = (originalMousePosition, newMousePosition) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = colorState; //colours are here
      console.log(context.strokeStyle);
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      
      context.stroke();
    }
  };

  const erase = () =>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0,0, height, width);
    
  }

  const changeColor = (localColor) =>{
    setColorState(localColor);
    console.log('suxxess');
  }

  return (<div>
            
            
            <canvas className='Canvas' ref={canvasRef} height={height} width={width} /> 
            
          </div>);
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
