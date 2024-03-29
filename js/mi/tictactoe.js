let HUMAN = -1;
let COMP = +1;

let board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

let scoreBoard = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

function evalute(state) {
	let score = 0;

	if (gameOver(state, COMP)) {
		score = +1;
	}
	else if (gameOver(state, HUMAN)) {
		score = -1;
	} else {
		score = 0;
	}

	return score;
}

function gameOver(state, player) {
	let win_state = [
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	];

	for (let i = 0; i < 8; i++) {
		let line = win_state[i];
		let filled = 0;
		for (let j = 0; j < 3; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 3)
			return true;
	}
	return false;
}

function gameOverAll(state) {
	return gameOver(state, HUMAN) || gameOver(state, COMP);
}

function emptyCells(state) {
	let cells = [];
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			if (state[x][y] == 0)
				cells.push([x, y]);
		}
	}

	return cells;
}

function minimax(state, depth, player, scoreBoard) {
	let best;

	if (player == COMP) {
		best = [-1, -1, -1000];
	}
	else {
		best = [-1, -1, +1000];
	}

	if (depth == 0 || gameOverAll(state)) {
		let score = evalute(state);
		return [-1, -1, score];
	}

	emptyCells(state).forEach(function (cell) {
		let x = cell[0];
		let y = cell[1];
		state[x][y] = player;
		let score = minimax(state, depth - 1, -player, scoreBoard);
		state[x][y] = 0;
		score[0] = x;
		score[1] = y;

		if (player == COMP) {
			if (score[2] > best[2])
				best = score;
		}
		else {
			if (score[2] < best[2])
				best = score;
		}
		if (scoreBoard && mainDepth == depth) {
			if (scoreBoard[x][y] === '' || 
				(scoreBoard[x][y] > score[2] && player == COMP) ||
				(scoreBoard[x][y] < score[2] && player != COMP)) {
				scoreBoard[x][y] = score[2];
			}
		}
	});

	return best;
}

function validMove(x, y) {
	try {
		if (board[x][y] == 0) {
			return true;
		}
		else {
			return false;
		}
	} catch (e) {
		return false;
	}
}
function validMoveWithPara(board, x, y) {
	try {
		if (board[x][y] == 0) {
			return true;
		}
		else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

function setMove(x, y, player) {
	if (validMove(x, y)) {
		board[x][y] = player;
		return true;
	}
	else {
		return false;
	}
}

function setMoveWithPara(board, x, y, player) {
	if (validMoveWithPara(board, x, y)) {
		board[x][y] = player;
		return true;
	}
	else {
		return false;
	}
}

$(".game td").on('click', clickedCell);

function clickedCell() {
    let cell = this;
	let conditionToContinue = gameOverAll(board) == false && emptyCells(board).length > 0;

	if (conditionToContinue == true) {
		let x = cell.id.split("")[0];
		let y = cell.id.split("")[1];
		let move = setMove(x, y, HUMAN);
		if (move == true) {
			cell.innerHTML = "X";
			if (conditionToContinue)
				aiTurn();
		}
	}
	if (gameOver(board, COMP)) {
		let lines;

		if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)
			lines = [[0, 0], [0, 1], [0, 2]];
		else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)
			lines = [[1, 0], [1, 1], [1, 2]];
		else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)
			lines = [[2, 0], [2, 1], [2, 2]];
		else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)
			lines = [[0, 0], [1, 0], [2, 0]];
		else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)
			lines = [[0, 1], [1, 1], [2, 1]];
		else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)
			lines = [[0, 2], [1, 2], [2, 2]];
		else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)
			lines = [[0, 0], [1, 1], [2, 2]];
		else if (board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)
			lines = [[2, 0], [1, 1], [0, 2]];

		for (let i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}

		document.getElementById("message").innerHTML = "Vesztettél!";
	}
	if (emptyCells(board).length == 0 && !gameOverAll(board)) {
		document.getElementById("message").innerHTML = "Döntetlen!";
	}
}

function aiTurn() {
	let x, y;
	let move;
	let cell;

	if (emptyCells(board).length == 10) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		move = minimax(board, emptyCells(board).length, COMP);
		x = move[0];
		y = move[1];
	}

	if (setMove(x, y, COMP)) {
		cell = document.getElementById(String(x) + String(y));
		cell.innerHTML = "O";
	}
}

function generateSteps(actBoard, nextPlayer) {
	steps = [];
    $(".round .game").html("");
	$('#algoritmus-reszletek-base').show();
    let board = JSON.parse(JSON.stringify(actBoard));
    if (!board) {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    }
    let stepNumber = 1;
    let roundNumber = 1;
    while (emptyCells(board).length > 0 && !gameOverAll(board)) {
		let scoreBoard = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		];
		mainDepth = emptyCells(board).length;
        let move = minimax(board, emptyCells(board).length, nextPlayer, scoreBoard);
		
        setMoveWithPara(board, move[0], move[1], nextPlayer);
        displayStep(board, move[0], move[1], nextPlayer, roundNumber, scoreBoard);
        nextPlayer *= -1;
        stepNumber++;
        if (stepNumber % 2 == 1) roundNumber++;
    }

	pause();
	actStep = 0;
    display(steps[actStep], actStep);
	barValtoztatasaNew(actStep, steps.length);
    playNew();

	$("#eredmenyek").removeClass("hidden");
    $("#algoritmus-reszletek-new").removeClass("hidden");
}
let mainDepth;

function display(step, index) {
	$(".round .game").html("");
	$('.round').hide();
	for (let i = 0; i <= index; i++) {
		$('#' + steps[i].stepNumber + 'R').show();
		if (steps[i].nextPlayer === -1) {
			$("#" + steps[i].stepNumber + "P").html(steps[i].table);
		} else {
			$("#" + steps[i].stepNumber + "C").html(steps[i].table);
		}
	}
}

function displayStep(board, x, y, nextPlayer, stepNumber, scoreBoard) {
    //console.log(board, x, y, nextPlayer, stepNumber, scoreBoard);
	let table = "";
    for (let i = 0; i < 3; i++) {
        table += "<tr>";
        for (let j = 0; j < 3; j++) {
            let icon = board[i][j] === -1 ? "X" : board[i][j] === 1 ? "O" : "";
			let sb = "";
			if (scoreBoard[i][j] !== '') {
				sb = scoreBoard[i][j];
			}
            if (i === x && j === y) {
                table += `<td class="new"><span class="icon">${icon}</span><span class="sb hidden">${sb}</span></td>`;
            } else {
                table += `<td><span class="icon">${icon}</span><span class="sb hidden">${sb}</span></td>`;
            }
        }
        table += "</tr>";
    }
    if (nextPlayer === -1) {
        //$("#" + stepNumber + "P").html(table);
		steps.push({
			table: table,
			id: "#" + stepNumber + "P",
			nextPlayer: nextPlayer,
			stepNumber: stepNumber
		});
    } else {
        //$("#" + stepNumber + "C").html(table);
		steps.push({
			table: table,
			id: "#" + stepNumber + "C",
			stepNumber: stepNumber,
			nextPlayer: nextPlayer,
		});
    }
}

function showValues() {
	$(".sb").toggleClass("hidden");
	$(".icon").toggleClass("hidden");
}

function newGame() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
	scoreBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    $(".gametable .game td").html("");
    $(".gametable .game td").css("color", "black");
	document.getElementById("message").innerHTML = "";
}

$("#ttt-code").val("moveForCode(0,0)\nconsole.log(board);");
function moveForCode(x, y) {
	$("#" + String(x) + String(y)).click();
}

function genCode() {
	let code = $("#ttt-code").val();
	eval(code);
}