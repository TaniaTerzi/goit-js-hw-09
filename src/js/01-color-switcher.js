
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

 //підключитися на кнопки
  const startButton = document.querySelector('button[data-start]')
  console.log(startButton);

  const stopButton = document.querySelector('button[data-stop]')
  console.log(stopButton);


//слухач на кнопку
//функція, яка змінює колір боді
//підключити функцію зміни кольору до кнопки старт з інтервалом 1 сек.
let timerId = null;

  startButton.addEventListener("click", () => {
    timerId = setInterval(() => {
      console.log(`interval start`);
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButton.disabled = true;
  });
  
  //кнопка стоп повинна зупиняти зміни кольорів
  
  stopButton.addEventListener("click", () => {
    clearInterval(timerId);
    console.log(`interval stop`);
    startButton.disabled = false;
  });
