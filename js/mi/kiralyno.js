const n = 8;
 
function isSafe(board, row, col){
    for (let x = 0; x < col; x++)
        if (board[row][x] == 1)
            return false;
    for (let x = row, y = col; x >= 0 && y >= 0; x--, y--)
        if (board[x][y] == 1)
            return false;
    for (let x = row, y = col; x < n && y >= 0; x++, y--)
        if (board[x][y] == 1)
            return false;
    return true;
}

function solveNQueens(board, col){
    steps.push({
        b: JSON.parse(JSON.stringify(board)),
        type: "first",
        aktSor: 0,
        aktOszlop: col
    });
    if (col == n) {
        steps.push({
            b: JSON.parse(JSON.stringify(board)),
            type: "second"
        });
        return true;
    }
    for (let i = 0; i < n; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            steps.push({
                b: JSON.parse(JSON.stringify(board)),
                aktSor: i,
                aktOszlop: col,
                type: "third"
            });
            if (solveNQueens(board, col + 1))
                return true;
            board[i][col] = 0;
        } else {
            board[i][col] = 1;
            steps.push({
                b: JSON.parse(JSON.stringify(board)),
                aktSor: i,
                aktOszlop: col,
                type: "fourth"
            });
            board[i][col] = 0;
        }
    }
    return false;
}

//let boards = [];
//let count = 0;
function NyolcKiralynoStart() {
    pause();
    $('#sakktabla').removeClass('rossz');
    $('#sakktabla').removeClass('jo');
    let board = [];
    for (let i = 0; i < 8; i++){
        let row = [];
        for (let j = 0; j < 8; j++){
            row.push(0);
        }
        board.push(row);
    }

    solveNQueens(board, 0);
    actStep = 0;
    display(steps[actStep], actStep);
    barValtoztatasaNew(actStep, steps.length);
    playNew();
    $("#eredmenyek").removeClass("hidden");
}

function display(b) {
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (b.b[i][j] === 1) {
                $("." + String(i) + String(j)).addClass('kiralyno');
            } else {
                $("." + String(i) + String(j)).removeClass('kiralyno');
            }
        }
    }

    $('.aktualis').removeClass('aktualis');
    $('.kijelolt').removeClass('kijelolt');
    if (b.aktSor !== undefined && b.aktOszlop !== undefined) {
        $("." + String(b.aktSor) + String(b.aktOszlop)).addClass('aktualis');
        $(".o-" + (b.aktOszlop + 1)).addClass('kijelolt');
        $(".s-" + (b.aktSor + 1)).addClass('kijelolt');
    }

    /*setTimeout(() => {
        count++;
        sakkTablaMegjelenites(boards[count]);
    }, 500);*/
}

$("#sakktabla").on('click', userInput);

function userInput(e) {
    let td = e.target;
    //let tdClass;
    if ($(td).hasClass('kiralyno')) {
        $(td).removeClass('kiralyno');
        //tdClass = $(td).attr('class');
    } else {
        //tdClass = $(td).attr('class');
        $(td).addClass('kiralyno');
    }

    let { board, numb } = getBoard();
    if (isGood(board)) {
        $('#sakktabla').removeClass('rossz');
        if (numb === 8) {
            $('#sakktabla').addClass('jo');
        }
    } else {
        $('#sakktabla').addClass('rossz');
    }
}

function isGoodQueen(board, s, o) {
    let sSum = 0, oSum = 0;
    for (let i = 0; i < n; i++) {
        sSum += board[s][i];
        oSum += board[i][o];
    }
    if (sSum > 1 || oSum > 1) {
        return false;
    }

    let atlo = 0;
    let i, j;
    i = s; j = o;
    while (i >= 0 && j >= 0) {
        atlo += board[i][j];
        i--; j--;
    }
    i = s; j = o;
    while (i < 8 && j < 8) {
        atlo += board[i][j];
        i++; j++;
    }
    if (atlo > 2) {
        return false;
    }


    atlo = 0;
    i = s; j = o;
    while (i < 8 && j >= 0) {
        atlo += board[i][j];
        i++; j--;
    }
    i = s; j = o;
    while (i >= 0 && j < 8) {
        atlo += board[i][j];
        i--; j++;
    }
    if (atlo > 2) {
        return false;
    }

    return true;
}

function isGood(board) {
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (!isGoodQueen(board, i, j)) {
                return false;
            }
        }
    }
    return true;
}

function getBoard() {
    let board = [];
    let numb = 0;
    for (let i = 0; i < 8; i++){
        let row = [];
        for (let j = 0; j < 8; j++){
            if ($("." + String(i) + String(j)).hasClass('kiralyno')) {
                row.push(1);
                numb++
            } else {
                row.push(0);
            }
        }
        board.push(row);
    }
    return {
        board: board,
        numb: numb
    };
}