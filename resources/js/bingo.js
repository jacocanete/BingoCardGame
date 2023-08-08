let playcardToken = null;

document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.addEventListener("click", function () {
      this.classList.toggle("clicked");
    });
  });
});

function loadCard() {
  const cardIdInput = document.querySelector(".load-card-input");
  const bcode = cardIdInput.value;

  if (bcode) {
    fetch(`http://www.hyeumine.com/getcard.php?bcode=${bcode}`)
      .then(response => response.json())
      .then(data => {
        if (data === 0) {
          alert("Game Code not found");
        } else {
          playcardToken = data.playcard_token;
          updateBingoCard(data.card);
          console.log(data.card);   
          console.log(data.playcard_token);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
}

function updateBingoCard(cardData) {
  const bingoHeaders = ["B", "I", "N", "G", "O"];
  bingoHeaders.forEach(header => {
    const values = cardData[header];
    for (let i = 1; i <= 5; i++) {
      const dataLetter = `${header}${i}`;
      const cell = document.querySelector(`.cell[data-letter="${dataLetter}"]`);
      if (cell) {
        cell.textContent = values[i - 1];
      }
    }
  });
}

function checkCardWin() {
  if (!playcardToken) {
    alert("No Playcard Token available. Load a card first.");
    return;
  }

  fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playcardToken}`)
    .then(response => response.text())
    .then(data => {
      if (data === "0") {
        alert("Not a Winning Card");
      } else if (data === "1") {
        alert("Winning Card!");
      } else {
        alert("Error checking card win");
      }
    })
    .catch(error => {
      console.error("Error checking card win:", error);
    });
}