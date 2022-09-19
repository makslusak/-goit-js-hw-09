import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');
const btnRef = document.querySelector('[type="submit"]');

btnRef.addEventListener('click', onFormSubmit);
let promisPosition = 0;

function onFormSubmit(evt) {
  evt.preventDefault();
  setTimeout(() => {
    console.log(11111111111111111111111111)
    for (let i = 0; i < amountRef.valueAsNumber; i+=1) {
      promisPosition = i + 1;
       setTimeout(() => {
         createPromise(promisPosition, stepRef.valueAsNumber)

          .then(({ position, delay }) => {
            Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notify.failure(`Rejected promise ${position} in ${delay}ms`);
          });
      }
        ,stepRef.valueAsNumber)
    }
    console.log(22222222222222222222222222)
  }
    , delayRef.valueAsNumber
  );

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
       
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
  });
}


