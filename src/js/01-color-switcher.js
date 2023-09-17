function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const startButton = document.getElementById('data-start');
  const stopButton = document.getElementById('data-stop');
  const container = document.querySelector('.container');
  let intervalId;
  
// Funkcja opoźnia pokazanie bordera po odświeżeniu strony - połaczona ze stylem transition w pliku css 
  function showBorderWithDelay() {
    container.style.borderColor = 'black';
  }
  
  window.addEventListener('load', () => {
    setTimeout(showBorderWithDelay, 1500);
  });
  

// Kod do zadania generujacy losowy kolor
  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
  
    intervalId = setInterval(() => {
      const randomColor = getRandomHexColor();
      container.style.backgroundColor = randomColor;
      container.style.borderColor = 'transparent'; // Podczas zmiany kolorów border jest niewidoczny
    }, 1000);
  });
  
  stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    container.style.borderColor = 'black'; // Po zatrzymaniu bordrer pojawia się
    clearInterval(intervalId);
  });
  
