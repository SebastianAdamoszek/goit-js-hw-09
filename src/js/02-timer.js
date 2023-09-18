import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// Inicjalizacja Notiflix
Notiflix.Notify.init();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

const datetimePicker = flatpickr("#datetime-picker", options);

const countdownElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const countdownMessage = document.getElementById("countdown-message");
const startButton = document.getElementById("start-button");

// Zmienna do przechowywania interwału
let intervalId;

//NOTIFY Funkcja wyświetlająca komunikat o wyborze daty
function showDateSelectionMessage() {
  Notiflix.Notify.success("Wybierz datę rozpoczęcia wydarzenia");
  return;
}

// Obsługa załadowania strony
window.onload = function () {
  showDateSelectionMessage();
};

// Obsługa wyboru daty
datetimePicker.config.onClose.push(selectedDates => {
  const selectedDate = selectedDates[0];
  
  // Sprawdzenie, czy wybrana data jest Z przyszłości
  if (selectedDate <= new Date()) {
    window.alert("Proszę wybrać datę z przyszłości.");// Komunikat z przeglądarki
    Notiflix.Notify.failure("Proszę wybrać datę z przyszłości.");// Komunikat z NOTIFY
    return;
  }
  
  // Aktywacja przycisku "Start" po wybraniu daty
  startButton.disabled = false;
});

// Obsługa kliknięcia przycisku "Start"
startButton.addEventListener('click', () => {
  // Pobranie wybranej daty z flatpickr
  const selectedDate = datetimePicker.selectedDates[0];
  
  if (!selectedDate) {
    // Jeśli data nie została jeszcze wybrana, nie rób nic
    return;
  }
  
  // Rozpoczęcie odliczania po kliknięciu "Start"
  startCountdown(selectedDate);
  
  // Dezaktywacja przycisku "Start" po jego kliknięciu
  startButton.disabled = true;
});

function startCountdown(targetDate) {
  clearInterval(intervalId); // Usunięcie ewentualnego istniejącego interwału

  countdownMessage.innerHTML = '<span style="color: darkorange">Odliczanie czasu...</span>';

  intervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      for (const key in countdownElements) {
        countdownElements[key].textContent = "00";
      }
      countdownMessage.innerHTML = '<span style="color: red">Wydarzenie już się zakończyło</span>';
      
      //NOTIFY  Wyświetlenie powiadomienia
      Notiflix.Notify.success("Wydarzenie już się zakończyło");
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownElements.days.textContent = formatNumber(days);
    countdownElements.hours.textContent = formatNumber(hours);
    countdownElements.minutes.textContent = formatNumber(minutes);
    countdownElements.seconds.textContent = formatNumber(seconds);
  }
}

function formatNumber(number) {
  return number.toString().padStart(2, "0");
}
