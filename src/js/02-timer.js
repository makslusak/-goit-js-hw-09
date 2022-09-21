import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let dateFromInput = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateFromInput = selectedDates[0].getTime();
    console.log(dateFromInput);
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      btnRef.disabled = true;
      Notify.failure('Please choose a date in the future');
      //   alert('Please choose a date in the future');
    } else {
      btnRef.disabled = false;
    }
  },
};
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const btnRef = document.querySelector('[data-start]');
btnRef.disabled = true;
const fp = flatpickr('#datetime-picker', options);

btnRef.addEventListener('click', startTimer);

function startTimer(evt) {
  const currentDate = new Date().getTime();
  let timeOut = dateFromInput - currentDate;
  let timerId = null;
  let timeLeft = null;
  timerId = setInterval(() => {
    if (timeOut < 1999) {
      clearInterval(timerId);
      btnRef.disabled = false;
    }
    timeOut = timeOut - 1000;
    timeLeft = convertMs(timeOut);
    console.log(timeLeft);
    const { days, hours, minutes, seconds } = timeLeft;
    createMarkup(days, hours, minutes, seconds);
  }, 1000);
  btnRef.disabled = true;
}
function createMarkup(days, hours, minutes, seconds) {
  daysRef.textContent = addLeadingZero(`${days}`);
  hoursRef.textContent = addLeadingZero(`${hours}`);
  minutesRef.textContent = addLeadingZero(`${minutes}`);
  secondsRef.textContent = addLeadingZero(`${seconds}`);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.padStart(2, '0');
}
