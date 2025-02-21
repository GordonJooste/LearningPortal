import React, { useCallback, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const Canvas = forwardRef(({ width, height, color = 'red', onErase, isEraser, penSize }, ref) => {

  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);
  

  useImperativeHandle(ref, () => ({
    erase: () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
    }
  }));

  const startPaint = useCallback((event) => {
    if (event.buttons !== 1) return; // Only draw when left mouse button is held
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  // Add mouseenter event handler
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const handleMouseEnter = (event) => {
      if (event.buttons === 1) { // If mouse button is held while entering
        startPaint(event);
      }
    };

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [startPaint]);

  const drawLine = useCallback((originalMousePosition, newMousePosition) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      if (isEraser) {
        context.globalCompositeOperation = 'destination-out';
        context.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        context.globalCompositeOperation = 'source-over';
        context.strokeStyle = color;
      }
      
      context.lineJoin = 'round';
      context.lineWidth = isEraser ? 10+penSize : penSize; // Make eraser width larger

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      context.stroke();
    }
}, [color, isEraser, penSize]);

  const paint = useCallback(
    (event) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        //console.log(`x:${mousePosition.x} and y: ${mousePosition.y}`); //co ordinates of drawing lines is here. not saved in state. Only saved in the ref.
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, drawLine]
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
    const rect = canvas.getBoundingClientRect();
    const scrollContainer = document.querySelector('.pdf-scroll-container');
    const containerRect = scrollContainer.getBoundingClientRect();
  
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top+ scrollContainer.scrollTop
  };
  };


  const erase = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    if (onErase) {
      onErase(); // Notify parent component that erase was triggered
    }
  }, [width, height, onErase]);

  

  return (<div>
            <canvas className='Canvas' ref={canvasRef} height={height} width={width} /> 
            
          </div>);
});

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
