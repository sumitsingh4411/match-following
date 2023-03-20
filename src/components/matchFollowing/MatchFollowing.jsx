import React, { useRef, useEffect } from "react";
import { FIRST_COLUMN, SECOND_COLUMN } from "./constant";
import "./style.css";

function MatchFollowing() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [canWeDraw, setCanWeDraw] = React.useState(false);
  const [selectedDot, setSelectedDot] = React.useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 150;
    canvas.height = 452;
    canvas.style.width = `${155}px`;
    canvas.style.height = `${455}px`;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "yellow";
    context.lineWidth = 1;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    if (!canWeDraw) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const continueDrawing = ({ nativeEvent }) => {
    if (!canWeDraw) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <div className="match_maker">
      <div className="first_coloumn">
        {FIRST_COLUMN?.map((item, index) => (
          <div
            key={index}
            className={`first_coloumn_item  ${
              index === selectedDot ? "selcted_item" : ""
            }`}
            onClick={() => {
              setSelectedDot(index);
              contextRef.current.clearRect(0, 0, 150, 452);
            }}
          >
            {item}
            {index === selectedDot && (
              <div
                className="first_coloumn_item_dot"
                onMouseDown={() => {
                  contextRef.current.closePath();
                  setCanWeDraw(true);
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
      <canvas
        className="canvas"
        onMouseDown={startDrawing}
        onMouseMove={
          canWeDraw
            ? continueDrawing
            : () => {
                contextRef.current.closePath();
              }
        }
        onMouseUp={() => {
          setCanWeDraw(false);
          contextRef.current.closePath();
        }}
        ref={canvasRef}
      />
      <div className="first_coloumn">
        {SECOND_COLUMN?.map((item, index) => (
          <div key={index} className="first_coloumn_item">
            {item}
            <div
              className="first_coloumn_item_dot_2"
              onMouseOver={() => {
                setCanWeDraw(false);
                contextRef.current.closePath();
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchFollowing;
