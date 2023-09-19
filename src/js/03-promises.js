import Notiflix from 'notiflix';
// Inicjalizacja Notiflix
Notiflix.Notify.init();

// Obsługa formularza
const form = document.querySelector('.form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const currentDelay = delay + (i - 1) * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`); //Opcjonalnie
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`); //Opcjonalnie
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3; //Prawdopodobieństwo sukcesu
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill - sukces
      } else {
        reject({ position, delay });
        // Reject - niepowodzenie
      }
    }, delay);
  });
}
