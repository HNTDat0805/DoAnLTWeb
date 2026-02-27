const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = "red";
let gameOver = false;

function initBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function makeMove(col, player) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = player;

            if (checkWin(row, col, player)) {
                alert(player + " wins!");
                gameOver = true;
            }

            return row;
        }
    }
    return -1;
}

function checkWin(r, c, player) {

    function count(dr, dc) {
        let cnt = 0;
        let row = r + dr;
        let col = c + dc;

        while (
            row >= 0 && row < ROWS &&
            col >= 0 && col < COLS &&
            board[row][col] === player
        ) {
            cnt++;
            row += dr;
            col += dc;
        }
        return cnt;
    }

    return (
        count(0, 1) + count(0, -1) >= 3 ||
        count(1, 0) >= 3 ||
        count(1, 1) + count(-1, -1) >= 3 ||
        count(1, -1) + count(-1, 1) >= 3
    );
}

