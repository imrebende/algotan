let init;
$("#bemenet-puzzle").val("[[1, 2, 3], [0, 4, 6], [7, 5, 8]]")
let state = [[1, 2, 3], [0, 4, 6], [7, 5, 8]];

function winCheck() {
    if (h(state) === 0) {
        $("#message").html("Nyertél!");
    } else {
        $("#message").html("");
    }
}

initFunc();
function initFunc() {
    init = JSON.parse($("#bemenet-puzzle").val());
    state = JSON.parse($("#bemenet-puzzle").val());
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            $("#" + String(i) + String(j)).html(state[i][j] !== 0 ? state[i][j] : "");
        }
    }
}

$(".game td").on('click', gameStep);

function gameStep(e) {
    let id = {
        x: String($(e.target).attr('id'))[0],
        y: String($(e.target).attr('id'))[1]
    };
    let nullPos = posOfNull(state);
    if ((nullPos.x == id.x && nullPos.y + 1 == id.y)
        || (nullPos.x == id.x && nullPos.y - 1 == id.y)
        || (nullPos.x - 1 == id.x && nullPos.y == id.y)
        || (nullPos.x + 1 == id.x && nullPos.y == id.y)) {
        state[nullPos.x][nullPos.y] = state[id.x][id.y];
        state[id.x][id.y] = 0;
        $("#" + String(id.x) + String(id.y)).html("");
        $("#" + String(nullPos.x) + String(nullPos.y)).html(state[nullPos.x][nullPos.y]);
    }
    winCheck();
}

function h(state) {
    let h = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] !== 0 && state[i][j] !== 3 * i + j + 1) {
                h++;
            } 
        }
    }
    return h;
}

function posOfNull(state) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(state[i][j] === 0) {
                return {
                    x: i,
                    y: j
                };
            }
        }
    }
}

function displayOptions(options, level, best) {
    let round = "";
    round += `<div class="round"><span class="round-number">${level}.</span>`;
    options.forEach((option, i) => {
        round += "<table class='game " + (i === best ? "best" : "") + "'>";
        for (let i = 0; i < 3; i++) {
            round += "<tr>";
            for (let j = 0; j < 3; j++) {
                round += "<td>" + (option.state[i][j] !== 0 ? option.state[i][j] : "") + "</td>";
            }
            round += "</tr>";
        }
        round += "</table>";
        round += `<span>h = ${option.h}</span>`;
    });
    $(".decisions").append(round + "</div>");
}

function sort() {
    let level = 0;
    state = JSON.parse($("#bemenet-puzzle").val());
    let options = [{
        state: state,
        h: h(state)
    }];
    displayOptions(options, level, 0);
    while (h(state) != 0) {
        let options = [];
        level++;
        let nullPos = posOfNull(state);
        //bal
        if (nullPos.x > 0) {
            let stateBal = JSON.parse(JSON.stringify(state));
            stateBal[nullPos.x][nullPos.y] = stateBal[nullPos.x - 1][nullPos.y];
            stateBal[nullPos.x - 1][nullPos.y] = 0;
            options.push({
                state: stateBal,
                h: h(stateBal)
            });
        }
        //jobb
        if (nullPos.x < 2) {
            let stateJobb = JSON.parse(JSON.stringify(state));
            stateJobb[nullPos.x][nullPos.y] = stateJobb[nullPos.x + 1][nullPos.y];
            stateJobb[nullPos.x + 1][nullPos.y] = 0;
            options.push({
                state: stateJobb,
                h: h(stateJobb)
            });
        }
        //fel
        if (nullPos.y > 0) {
            let stateFel = JSON.parse(JSON.stringify(state));
            stateFel[nullPos.x][nullPos.y] = stateFel[nullPos.x][nullPos.y - 1];
            stateFel[nullPos.x][nullPos.y - 1] = 0;
            options.push({
                state: stateFel,
                h: h(stateFel)
            });
        }
        //le
        if (nullPos.y < 2) {
            let stateLe = JSON.parse(JSON.stringify(state));
            stateLe[nullPos.x][nullPos.y] = stateLe[nullPos.x][nullPos.y + 1];
            stateLe[nullPos.x][nullPos.y + 1] = 0;
            options.push({
                state: stateLe,
                h: h(stateLe)
            });
        }
        console.log(options);

        let minh = 8;
        let mini = 0;
        let minState;
        options.forEach((option, i) => {
            if (minh > option.h) {
                minh = option.h;
                mini = i;
                minState = option;
            }
        })
        displayOptions(options, level, mini);
        state = minState.state;
    }
}


