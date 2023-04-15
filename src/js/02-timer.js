import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const ourInput = document.querySelector('#datetime-picker');

const buttonStart = document.querySelector('button[data-start]');

const timerHtml = document.querySelector('.timer');

const daysValue = timerHtml.querySelector('[data-days]');

const hoursValue = timerHtml.querySelector('[data-hours]');

const minutesValue = timerHtml.querySelector('[data-minutes]');

const secondsValue = timerHtml.querySelector('[data-seconds]');

buttonStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        buttonStart.disabled = true;
      } else
     { buttonStart.disabled = false;}

    },
  };

  flatpickr(ourInput, options);

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
  };


  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  };


  buttonStart.addEventListener('click', () => {
    let timer = setInterval(() => {
      let countdown = new Date(ourInput.value) - new Date();
      buttonStart.disabled = true;
      if (countdown >= 0) {
        let timeObject = convertMs(countdown);
        daysValue.textContent = addLeadingZero(timeObject.days);
        hoursValue.textContent = addLeadingZero(timeObject.hours);
        minutesValue.textContent = addLeadingZero(timeObject.minutes);
        secondsValue.textContent = addLeadingZero(timeObject.seconds);
        if (countdown <= 10000) {
          timerHtml.style.backgroundColor = 'red';
        }
      }
        else {
        Notiflix.Notify.success('Countdown finished');
        timerHtml.style.backgroundColor = 'transparent';
        clearInterval(timer);
      }
    }, 1000);
  });
