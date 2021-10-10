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

    render();

    const jugdement = isFinished(gameState);

    if (jugdement === X) {
      alert("X won!");
    }

    if (jugdement === O) {
      alert("O won!");
    }

    if (jugdement === 0) {
      activePlayer = 3 - activePlayer;
    }

    if (jugdement === 3) {
      alert("Draw!");
    }
  }
});

// Event delegation

function rowWithSameValue(gameState, rowIndex, value) {
  return gameState[rowIndex].every((x) => x === value);
}

function columnWithSameValue(gameState, colIndex, value) {
  return gameState.every((row) => row[colIndex] === value);
}

function anyDiagWithSameValue(gameState, value) {
  const diag1 = [gameState[0][0], gameState[1][1], gameState[2][2]];
  const diag2 = [gameState[0][2], gameState[1][1], gameState[2][0]];

  return diag1.every((x) => x === value) || diag2.every((x) => x === value);
}

function anyRowWithSameValue(gameState, value) {
  return [0, 1, 2].some((rowIndex) =>
    rowWithSameValue(gameState, rowIndex, value)
  );
}

function anyColWithSameValue(gameState, value) {
  return [0, 1, 2].some((colIndex) =>
    columnWithSameValue(gameState, colIndex, value)
  );
}

function anyLineWithValue(gameState, value) {
  return (
    anyRowWithSameValue(gameState, value) ||
    anyColWithSameValue(gameState, value) ||
    anyDiagWithSameValue(gameState, value)
  );
}

function full(gameState) {
  return gameState.every((row) => row.every((cell) => cell !== 0));
}

function isFinished(gameState) {
  if (anyLineWithValue(gameState, X)) {
    return 1;
  }

  if (anyLineWithValue(gameState, O)) {
    return 2;
  }

  if (full(gameState)) {
    return 3;
  }

  return 0;
}

console.assert(
  anyLineWithValue(
    [
      [1, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
    ],
    1
  ),
  "has 1 row x"
);
