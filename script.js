console.log("hello");

const X = 1;
const O = 2;

// 0: empty
// 1: X
// 2: O

const gameState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let activePlayer = X;

function renderStatus(activePlayer) {
  if (activePlayer === X) {
    return `
      <div class="status">
        <div class="player active">X</div>
        <div class="player">O</div>
      </div>
    `;
  }

  return `
      <div class="status">
        <div class="player">X</div>
        <div class="player active">O</div>
      </div>
    `;
}

function renderCellHtml(cell, x, y) {
  console.log("cell", cell);
  return `<div class="cell" data-x="${x}" data-y="${y}">${
    cell === 0 ? "" : cell === 1 ? "X" : "O"
  }</div>`;
}

function renderBoardHtml(gameState) {
  const cellsHtml = gameState
    .flatMap((row, x) => row.map((cell, y) => renderCellHtml(cell, x, y)))
    .join("\n");

  return `
    <div class="board">
      ${cellsHtml}
    </div>
  `;
}

function render() {
  const statusHtml = renderStatus(activePlayer);

  const boardHtml = renderBoardHtml(gameState);

  const html = statusHtml + boardHtml;

  document.querySelector("body").innerHTML = html;
}

render();

document.querySelector("body").addEventListener("click", (event) => {
  if (event.target.className === "cell") {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    console.log("Click!", x, y);

    gameState[x][y] = activePlayer;
    activePlayer = 3 - activePlayer;

    render();
  }
});

// Event delegation
