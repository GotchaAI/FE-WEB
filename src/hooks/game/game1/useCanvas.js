import { useEffect, useRef, useState } from "react";
import { imageUploadAPI } from "services/commons/commons";

const useCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [penActive, setPenActive] = useState(true);
  const [eraserActive, setEraserActive] = useState(false);
  const [isDrawingDisabled, setIsDrawingDisabled] = useState(false);

  const [strokeStyle, setStrokeStyle] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;

    // 캔버스 크기 설정
    canvas.width = 1312;
    canvas.height = 762;
    canvas.style.width = "656px";
    canvas.style.height = "376px";

    const context = canvas.getContext("2d");
    context.scale(2, 2);

    // 기본 선 스타일
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    // 흰색 배경 초기화
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, canvas.width, canvas.height);
    contextRef.current = context;
  }, []);

  const startDrawing = (e) => {
    if (!penActive && !eraserActive) return;
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const drawing = (e) => {
    if (!isDrawing) return;

    if (eraserActive) {
      contextRef.current.strokeStyle = "white";
      contextRef.current.lineWidth = 20;
    } else {
      contextRef.current.strokeStyle = strokeStyle;
      contextRef.current.lineWidth = 5;
    }

    contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    contextRef.current.stroke();
  };

  const drawGrid = (ctx, width, height, gridSize = 13.78) => {
    ctx.strokeStyle = "#EFEFEF"; // 격자 선 색
    ctx.lineWidth = 0.57;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  const togglePen = () => {
    setPenActive(true);
    setEraserActive(false);
  };

  const toggleEraser = () => {
    setEraserActive(true);
    setPenActive(false);
  };

  // 캔버스 지우기
  const handleClearCanvas = () => {
    const context = contextRef.current;
    if (!context) return;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // 캔버스 반환
  const getCanvas = () => {
    const canvas = canvasRef.current;

    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const newContext = newCanvas.getContext("2d");

    newContext.fillStyle = "white";
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
    newContext.drawImage(canvas, 0, 0);

    return newCanvas;
  };

  // 이미지 url 반환
  const getImageUrl = async () => {
    const canvas = getCanvas();

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error("Blob 생성 실패"));
        },
        "image/jpeg",
        0.7
      );
    });

    const formData = new FormData();
    formData.append("file", blob, "drawing.jpeg");

    // http 요청으로 이미지의 url을 반환받는다.
    try {
      const imageUrl = await imageUploadAPI(formData);
      return imageUrl.message;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return {
    canvasRef,
    isDrawing,
    startDrawing,
    drawing,
    stopDrawing,
    penActive,
    eraserActive,
    togglePen,
    toggleEraser,
    handleClearCanvas,
    getImageUrl,
    isDrawingDisabled,
    setIsDrawingDisabled,
    strokeStyle,
    setStrokeStyle,
  };
};

export default useCanvas;
