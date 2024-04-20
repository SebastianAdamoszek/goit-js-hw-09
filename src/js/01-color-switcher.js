function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.getElementById('data-start');
const stopButton = document.getElementById('data-stop');
const container = document.querySelector('.container');
let intervalId;

window.addEventListener('load', () => {
  container.style.borderColor = 'gray';
  container.style.borderStyle = 'groove';
  container.style.borderWidth = '50px';
});

// Kod do zadania generujacy losowy kolor
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    container.style.backgroundColor = randomColor;
    container.style.borderColor = randomColor;
  }, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  stopButton.disabled = true;
  container.style.borderColor = 'gray'; // Po zatrzymaniu bordrer pojawia się
  clearInterval(intervalId);
});
