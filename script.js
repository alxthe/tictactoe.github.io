document.addEventListener("DOMContentLoaded", () => {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const resetButton = document.getElementById("reset-button");
  const modeButtons = document.querySelectorAll(".mode-button");

  let currentPlayer;
  let gameMode;

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      gameMode = button.dataset.mode;
      currentPlayer = "X";
      document.getElementById("mode-selection").style.display = "none";
      document.getElementById("game-container").style.display = "grid";
      document.getElementById("current-player").textContent = currentPlayer;
    });
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      makeMove(cell);
    });
  });

  resetButton.addEventListener("click", () => {
    resetGame();
  });

  function makeMove(cell) {
    if (!cell.textContent) {
      cell.textContent = currentPlayer;
      checkGameStatus();
      if (gameMode === "singleplayer" && currentPlayer === "X") {
        setTimeout(makeAIMove, 800);
      }
      togglePlayer();
    }
  }

  function makeAIMove() {
    const availableCells = cells.filter((cell) => !cell.textContent);
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCell = availableCells[randomIndex];
    selectedCell.textContent = currentPlayer;
    checkGameStatus();
    togglePlayer();
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("current-player").textContent = currentPlayer;
  }

  function checkGameStatus() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isGameWon = winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer
      );
    });

    const isGameDrawn = cells.every((cell) => cell.textContent);

    if (isGameWon) {
      cells.forEach((cell) => {
        cell.classList.add("animate-mark");
      });
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      }, 500);
    } else if (isGameDrawn) {
      setTimeout(() => {
        alert("It's a draw!");
        resetGame();
      }, 500);
    }
  }

  function resetGame() {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("animate-mark");
    });
    document.getElementById("mode-selection").style.display = "flex";
    document.getElementById("game-container").style.display = "none";
  }
});
