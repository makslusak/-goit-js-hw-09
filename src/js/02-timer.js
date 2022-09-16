import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnRef = document.querySelector('[data-start]');
const fp = flatpickr('#datetime-picker', {});

btnRef.addEventListener('click', startTimer);

function startTimer(evt) {}
