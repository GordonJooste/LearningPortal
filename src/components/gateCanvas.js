import React, { useCallback, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const Canvas = forwardRef(({ width, height, color = 'red', highlighterColor = 'yellow', isHighlighter, isEraser, penSize, isDragMode }, ref) => {

    const canvasRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(undefined);
    const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });


    useImperativeHandle(ref, () => ({
        erase: () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);
        }
    }));

    const startPaint = useCallback((event) => {
        if (event.buttons !== 1 || isDragMode) return; // Only draw when left mouse button is held
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, [isDragMode]);

    // Add mouseenter event handler
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        const handleMouseEnter = (event) => {
            if (event.buttons === 1 && !isDragMode) { // If mouse button is held while entering
                startPaint(event);
            }
        };

        canvas.addEventListener('mousedown', startPaint);
        canvas.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            canvas.removeEventListener('mousedown', startPaint);
            canvas.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [startPaint, isDragMode]);

    const drawLine = useCallback((originalMousePosition, newMousePosition) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context) {
            context.lineJoin = 'round';
            context.lineWidth = penSize;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            if (isEraser) {
                context.globalCompositeOperation = 'destination-out';
                context.strokeStyle = 'rgba(0,0,0,1)';
                context.lineWidth = 10 + penSize;
            } else if (isHighlighter) {
                context.globalCompositeOperation = 'multiply'; // This blend mode creates a highlighter effect
                context.strokeStyle = highlighterColor;
                context.lineWidth = 10 + penSize;
                context.globalAlpha = 0.1; // Adjust alpha for desired highlight transparency
            }
            else {
                context.globalCompositeOperation = 'source-over';
                context.strokeStyle = color;
                context.globalAlpha = 1;
            }
            context.stroke();
            context.globalAlpha = 1; // Reset alpha after drawing
        }
    }, [color, highlighterColor, isEraser, isHighlighter, penSize]);

    const paint = useCallback(
        (event) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition, drawLine]
    );

    useEffect(() => {
        if (!canvasRef.current || isDragMode) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint, isDragMode]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || isDragMode) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint, isDragMode]);

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
            y: event.clientY - rect.top + scrollContainer.scrollTop
        };
    };


    const erase = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
    }, [width, height]);

    useEffect(() => {
        if (!isDragMode) {
            return;
        }

        const canvas = canvasRef.current;
        let startX;
        let startY;
        const scrollContainer = document.querySelector('.pdf-scroll-container');

        const handleMouseDown = (e) => {
            startX = e.clientX - scrollContainer.offsetLeft;
            startY = e.clientY - scrollContainer.offsetTop;
            scrollContainer.style.cursor = 'grabbing';
        };

        const handleMouseUp = () => {
            scrollContainer.style.cursor = 'grab';
            startX = null;
            startY = null;
        };

        const handleMouseMove = (e) => {
            if (!startX || !startY) return;
            e.preventDefault();

            const x = e.clientX - scrollContainer.offsetLeft;
            const y = e.clientY - scrollContainer.offsetTop;

            const walkX = (x - startX);
            const walkY = (y - startY);

            scrollContainer.scrollLeft = scrollContainer.scrollLeft - walkX;
            scrollContainer.scrollTop = scrollContainer.scrollTop - walkY;
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseout', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseout', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.style.cursor = 'default';
            scrollContainer.style.cursor = 'auto'; // Restore scroll container cursor
        };
    }, [isDragMode]);



    return (<div>
        <canvas
            className='Canvas'
            ref={canvasRef}
            height={height}
            width={width}
            style={{ cursor: isDragMode ? 'grab' : 'default' }}
        />

    </div>);
});

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Canvas;
