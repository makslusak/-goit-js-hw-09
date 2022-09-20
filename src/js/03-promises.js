import Notiflix from 'notiflix';

const formEL = document.querySelector('.form');

function createPromise(position, delayEL) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delayEL });
      } else {
        reject({ position, delayEL });
      }
    }, delayEL);
  });
}

formEL.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const { amount, step, delay } = event.target.elements;
  let amountValue = Number(amount.value);
  let stepValue = Number(step.value);
  let delayValue = Number(delay.value);
  for (let i = 0; i < amountValue; i += 1) {
    let counter = i + 1;
    createPromise(counter, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
}
