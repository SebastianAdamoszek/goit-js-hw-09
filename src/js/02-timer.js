import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
//Opjonalnie 
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    startCountdown(selectedDate);
  },
};

const datetimePicker = flatpickr("#datetime-picker", options);

const countdownElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const countdownMessage = document.getElementById("countdown-message");

function startCountdown(targetDate) {
  let intervalId;

  countdownMessage.innerHTML = '<span>Odliczanie czasu...</span>';

  intervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      for (const key in countdownElements) {
        countdownElements[key].textContent = "00";
      }
      countdownMessage.innerHTML = '<span>Wydarzenie już się zakończyło</span>';
      
       // Wyświetlenie powiadomienia za pomocą Notiflix
      Notify.success("Wydarzenie już się zakończyło");
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
