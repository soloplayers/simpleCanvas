let canvas = document.querySelector(".myCanvas");
let ctx = canvas.getContext("2d");
let lineWidth = document.querySelector(".lineWidth");
let input_lineWidth = document.querySelector("#width");
let input_lineColor = document.querySelector("#color");
let choose_color_nav = document.querySelector(".colorNav");
let brush_rect = document.querySelector(".brush").querySelector(".rect");
let brush_circle = document.querySelector(".brush").querySelector(".circle");
let display_rect = document.querySelector(".rectangle");
let display_circle = document.querySelector(".main").querySelector(".circle");
let body = document.body;

//正确获取鼠标在画板canvas的位置
function getCanvas_x_y(e) {
  let arr = new Array(2);
  arr[0] = e.clientX - canvas.offsetLeft;
  arr[1] = e.clientY - canvas.offsetTop;
  return arr;
}

//设置canvas画板的宽高，没有单位；
canvas.width = 1152;
canvas.height = 518;


//设置线条样式
ctx.lineCap = "round";
ctx.lineWidth = 1;
ctx.lineJoin = "round";
ctx.strokeStyle = "black";

//画画模式
let flag_painting = false;  //设置变量表示是否在画画中


//清除线条粗细组类名的函数
function clearSelected() {
  const children = Array.from(lineWidth.children);
  for (let i = 0; i < 4; i++) {
    if (children[i].classList.contains("selected")) {
      children[i].classList.remove("selected");
    }
  }
}

//监听线条粗细变化事件
lineWidth.addEventListener("click", (e) => {
  const t = e.target;
  if (t.className.includes("line")) {
    clearSelected();
    t.classList.add("selected");
  }
  //必须在每次选择线条粗细后重新beginPath,不然线条全部都会变成一个粗细
  ctx.beginPath();
  ctx.lineWidth = parseInt(t.dataset.width);
  ctx.closePath();
});

// 画画模式
canvas.addEventListener("mousedown", (e1) => {
  flag_painting = true;
  let [x, y] = getCanvas_x_y(e1);
  ctx.moveTo(x, y);
  canvas.addEventListener("mousemove", (e2) => {
    if (flag_painting) {
      let [x, y] = getCanvas_x_y(e2);
      ctx.strokeStyle=input_lineColor.value;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });
  canvas.addEventListener("mouseup", () => {
    flag_painting = false;
  });
});

//监听表单线条粗细输入事件
input_lineWidth.addEventListener("blur", (e) => {
  const t = e.target;
  const value=t.value;
  if (value < 0 || value > 50) {
    window.alert("为了绘画体验，线条粗细范围：1-50(px)");
    t.value = 1;
    return;
  }
  clearSelected();
  ctx.beginPath();
  ctx.lineWidth = t.value;
  ctx.closePath();
});

//监听表单的颜色输入事件
input_lineColor.addEventListener("blur", (e) => {
  const t = e.target;
  ctx.beginPath();
  ctx.strokeStyle = t.value;
  ctx.closePath();
});

//监听直接选择颜色的事件
choose_color_nav.addEventListener("click", (e) => {
  const t = e.target;
  input_lineColor.value = t.outerHTML.substring(30, 37);
  ctx.beginPath();
  ctx.strokeStyle = input_lineColor.value;
  ctx.closePath();
});

//橡皮擦功能
function eraser_rect(event) {
  let [x, y] = getCanvas_x_y(event);
  ctx.beginPath();
  ctx.lineWidth=1;
  ctx.clearRect(x, y, 20, 20);
  ctx.closePath();
}

function eraser_cir(event) {
  let [x, y] = getCanvas_x_y(event);
  ctx.globalCompositeOperation='destination-out';
  ctx.beginPath();
  ctx.lineWidth=1;
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.strokeStyle = "#fff";
  ctx.fill();
  ctx.globalCompositeOperation='source-over';
  ctx.closePath();
}

let inWipeMode_rect = false, inWipeMode_cir = false;
brush_rect.onclick = () => {
  inWipeMode_rect = true;
  inWipeMode_cir = false;
  flag_painting=false;
  display_rect.style.display = "block";
  display_circle.style.display = "none";
};

brush_circle.onclick = () => {
  inWipeMode_cir = true;
  inWipeMode_rect = false;
  display_circle.style.display = "block";
  display_rect.style.display = "none";
};

lineWidth.onclick = () => {
  inWipeMode_cir = false;
  inWipeMode_rect = false;
  display_rect.style.display = "none";
  display_circle.style.display = "none";
};

brush_rect.addEventListener("click", () => {
  canvas.addEventListener("mousemove", (e) => {
    display_rect.style.left = e.clientX + "px";
    display_rect.style.top = e.clientY + "px";
    if (inWipeMode_rect) {
      eraser_rect(e);
    }
  });
});

brush_circle.addEventListener("click", () => {
  canvas.addEventListener("mousemove", (e) => {
    display_circle.style.left = e.clientX + "px";
    display_circle.style.top = e.clientY + "px";
    if (inWipeMode_cir) {
      eraser_cir(e);
    }
  });
});



