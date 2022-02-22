const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
// canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.lineWidth = 2.5; 
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
// ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

// const startPainting = (e) =>{
//     if(filling === false){
//         painting = ture
//     }
// };

function  onMouseMove(e){
    let x = e.offsetX;
    let y = e.offsetY;
    if(!painting){
        ctx.beginPath();
        // ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseEnter(e){
    x = e.offsetX;
    y = e.offsetY;
    ctx.moveTo(x,y);
}

function handleColorClick(e){
    // console.log(e.target.style)
    let color = e.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    document.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("click", handleCanvasClick);
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    } else {
        filling  = true;
        mode.innerText = "paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

if(clear){
    clear.addEventListener("click", () => 
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    );
}

// console.log(Array.from(colors));
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);


if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}