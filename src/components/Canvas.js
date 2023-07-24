import React, { useCallback, useEffect, useRef, useState } from 'react';
import { selectCanvas, ToggleClear } from '../slice/canvasSlice';
import { useSelector, useDispatch } from 'react-redux';
import {store} from '../store/store';

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);
  const variable = useSelector(selectCanvas).canvas.clearCanvas;
  //const dispatch = useDispatch();

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
    const handleClearCanvasChange = () => {
      if (variable) {
        // Do something when clearCanvas is true
        console.log('Clear Canvas is true');
        erase();
      } else {
        // Do something when clearCanvas is false
        console.log('Clear Canvas is false');
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
      context.strokeStyle = 'red'; //colours are here
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

  return (<div>
            
            
            <canvas className='Canvas' ref={canvasRef} height={height} width={width} /> 
            
          </div>);
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
