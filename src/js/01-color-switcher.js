const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

startBtnRef.addEventListener('click', startChangeColor);
stopBtnRef.addEventListener('click', stopChangeColor);

function btnDisabling(btnOff, btnOn) {
  btnOff.disabled = true;
  btnOn.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// setInterval========================================
// let timerId = null;
// function startChangeColor(evt) {
//   //   if (startBtnRef.disabled) {
//   //     return;
//   //   }
//   btnDisabling(startBtnRef, stopBtnRef);
//   let randomColor = getRandomHexColor();
//   bodyRef.style.backgroundColor = randomColor;
//   timerId = setInterval(() => {
//     let randomColor = getRandomHexColor();
//     bodyRef.style.backgroundColor = randomColor;
//   }, 1000);
// }

// function stopChangeColor(evt) {
//   btnDisabling(stopBtnRef, startBtnRef);
//   clearInterval(timerId);
// }

//recursion======================================
let timerId = null;
function startChangeColor(evt) {
  btnDisabling(startBtnRef, stopBtnRef);
  let randomColor = getRandomHexColor();
  bodyRef.style.backgroundColor = randomColor;
  timerId = setTimeout(() => {
    startChangeColor();
  }, 1000);
}

function stopChangeColor(evt) {
  btnDisabling(stopBtnRef, startBtnRef);
  clearTimeout(timerId);
}
