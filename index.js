const horses = [
  "Secretariat",
  "Eclipse",
  "West Australian",
  "Flying Fox",
  "Seabiscuit",
];

const startBtn = document.querySelector(".js-start-race");
const winnerField = document.querySelector(".js-winner");
const progressField = document.querySelector(".js-progress");
const table = document.querySelector(".js-results-table > tbody");

let raceCounter = 0;

startBtn.addEventListener("click", () => {
    raceCounter += 1;
    const promises = horses.map((horse) => run(horse));

    winnerField.textContent = '';

    progressField.textContent =  "🤖 Заїзд розпочався, ставки не приймаються!";

    Promise.race(promises).then(({ horse, time }) => {
        winnerField.textContent = `🎉 Переможець ${horse}, финишував за ${time}часу`; 

        updateTable({horse, time});

      });

      Promise.all(promises).then((result) => {
        progressField.textContent = "📝 Заїзд закінчено, приймаються ставки.";
      });
})


function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function run(horse) {
  return new Promise((resolve) => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}


function updateTable({horse, time}) {
     const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`

     table.insertAdjacentHTML("beforeend", tr);
}






