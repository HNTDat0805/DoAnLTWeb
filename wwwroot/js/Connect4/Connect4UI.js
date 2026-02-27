function createBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${r}-${c}`;
            cell.onclick = () => playerClick(c);
            boardDiv.appendChild(cell);
        }
    }
}

function playerClick(col) {
    if (gameOver) return;

    if (currentPlayer !== myRole) return; // chặn sai lượt

    sendMove(col);
}

function dropPiece(row, col, player) {
    let cell = document.getElementById(`cell-${row}-${col}`);

    let piece = document.createElement("div");
    piece.classList.add("piece", player);
    piece.style.top = "-400px";

    cell.appendChild(piece);

    setTimeout(() => {
        piece.style.transition = "top 0.8s ease";
        piece.style.top = "0px";
    }, 10);
}

window.handleReceiveMove = function (move) {

    if (gameOver) return;

    let row = makeMove(move.col, move.player);

    if (row !== -1) {
        dropPiece(row, move.col, move.player);
    }

    currentPlayer = move.player === "red" ? "yellow" : "red";
};


initBoard();
createBoard();
initRealtime("/connect4hub");
