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
    winCheck();
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

/*function displayOptions(options, level, best) {
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
}*/

/*function sort() {
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
}*/

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

let edges = [];

function isSameState(f, s) {
    let db = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (f[i][j] === s[i][j]) db++;
        }
    }
    return db === 9;
}

function g(state) {
    edges.forEach(e => {
        if (isSameState(state, e.gameState)) return e.distance;
    });
    return Number.MAX_VALUE;
}

function visited(state) {
    edges.forEach((e, i) => {
        if (isSameState(state, e.gameState)) return { 
            v: true,
            i: i
        };
    });
    return { 
        v: false,
        i: -1
    };
}

let defaultState = [[1, 2, 3], [0, 4, 6], [7, 5, 8]];

function minOpen() {
    let lowestPriority = Number.MAX_VALUE;
    let lowestPriorityIndex = -1;
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].f < lowestPriority && edges[i].isInOpened) {
                lowestPriority = edges[i].f;
                lowestPriorityIndex = i;
        }
    }
    return {
        lowestPriority: lowestPriority,
        lowestPriorityIndex: lowestPriorityIndex
    };
}

function function4Moves(lowestPriorityIndex, state, actualRound) {
    let foundState = visited(state);
    if (!foundState.v) {
        let act = {
            gameState: state,
            g: edges[lowestPriorityIndex].g + 1,
            h: h(state),
            f: edges[lowestPriorityIndex].g + 1 + h(state),
            isInOpened: true,
            isInClosed: false,
            parent: lowestPriorityIndex
        };
        edges.push(act);
        actualRound.push(act);
    } else if (!edges[visited(state).i].isInClosed) {
        edges[foundState.i].g = edges[lowestPriorityIndex].g + 1;
        edges[foundState.i].h = h(state)
        edges[foundState.i].f = edges[lowestPriorityIndex].g + 1 + h(state);
        edges[foundState.i].parent = lowestPriorityIndex;
        actualRound.push(edges[foundState.i]);
    }
}

function display(step, actStep) {
    let round = "";
    let itext = "Aktuális helyzet";
    if (step.type === "last" || step.type === "first") itext = "Kezdő állapot";
    round += `<div class="round"><div class="round-number">${itext}</div>`;
    round += "<table class='game best'>";
    for (let i = 0; i < 3; i++) {
        round += "<tr>";
        for (let j = 0; j < 3; j++) {
            round += "<td>" + (step.parent.gameState[i][j] !== 0 ? step.parent.gameState[i][j] : "") + "</td>";
        }
        round += "</tr>";
    }
    round += "</table>";
    round += `<span>h = ${step.parent.h}</span>`;
    if (step.children) {
        let text = "Lehetséges lépések"
        if (step.type === "last") text = "Lépések";
        round += `<div class="round"><div class="round-number">${text}</div>`;
        step.children.forEach(child => {
            //round += "<table class='game " + (i === best ? "best" : "") + "'>";
            round += "<table class='game'>";
            for (let i = 0; i < 3; i++) {
                round += "<tr>";
                for (let j = 0; j < 3; j++) {
                    round += "<td>" + (child.gameState[i][j] !== 0 ? child.gameState[i][j] : "") + "</td>";
                }
                round += "</tr>";
            }
            round += "</table>";
            round += `<span>h = ${child.h}</span>`;
        });
    }
    $(".decisions").html(round + "</div>");
}

function startFc() {
	pause();
    defaultState = JSON.parse($("#bemenet-puzzle").val());
    steps = [];
    actStep = 0;
    AStar();

    display(steps[actStep], actStep);
    barValtoztatasaNew(actStep, steps.length);
    playNew();

	$("#eredmenyek").removeClass("hidden");
    $("#algoritmus-reszletek-new").removeClass("hidden");
}

function AStar() {
    let first = {
        gameState: defaultState,
        g: 0,
        h: h(defaultState),
        f: 0 + h(defaultState),
        isInOpened: true,
        isInClosed: false,
        parent: null
    };
    edges.push(first);
    steps.push({
        parent: first,
        children: null,
        type: "first"
    });
    let actualState = defaultState;

    while(true) {
        let { lowestPriority, lowestPriorityIndex } = minOpen();
        edges[lowestPriorityIndex].isInClosed = true;
        edges[lowestPriorityIndex].isInOpened = false;
        actualState = edges[lowestPriorityIndex];

        steps.push({
            parent: edges[lowestPriorityIndex],
            children: null,
            type: "act"
        });

        if (edges[lowestPriorityIndex].h === 0) {
            let children = [];
            while(lowestPriorityIndex !== 0) {
                children.unshift(edges[lowestPriorityIndex]);
                lowestPriorityIndex = edges[lowestPriorityIndex].parent;
            }
            steps.push({
                parent: edges[lowestPriorityIndex],
                children: children,
                type: "last"
            });
            return 0;
        }

        let nullPos = posOfNull(actualState.gameState);
        
        let actualRound = [];
        //bal->fel
        if (nullPos.x > 0) {
            let stateBal = JSON.parse(JSON.stringify(actualState.gameState));
            stateBal[nullPos.x][nullPos.y] = stateBal[nullPos.x - 1][nullPos.y];
            stateBal[nullPos.x - 1][nullPos.y] = 0;
            function4Moves(lowestPriorityIndex, stateBal, actualRound);
        }
        //jobb -> le
        if (nullPos.x < 2) {
            let stateJobb = JSON.parse(JSON.stringify(actualState.gameState));
            stateJobb[nullPos.x][nullPos.y] = stateJobb[nullPos.x + 1][nullPos.y];
            stateJobb[nullPos.x + 1][nullPos.y] = 0;
            function4Moves(lowestPriorityIndex, stateJobb, actualRound);
        }
        //fel
        if (nullPos.y > 0) {
            let stateFel = JSON.parse(JSON.stringify(actualState.gameState));
            stateFel[nullPos.x][nullPos.y] = stateFel[nullPos.x][nullPos.y - 1];
            stateFel[nullPos.x][nullPos.y - 1] = 0;
            function4Moves(lowestPriorityIndex, stateFel, actualRound);
        }
        //le
        if (nullPos.y < 2) {
            let stateLe = JSON.parse(JSON.stringify(actualState.gameState));
            stateLe[nullPos.x][nullPos.y] = stateLe[nullPos.x][nullPos.y + 1];
            stateLe[nullPos.x][nullPos.y + 1] = 0;
            function4Moves(lowestPriorityIndex, stateLe, actualRound);
        }

        steps.push({
            parent: edges[lowestPriorityIndex],
            children: actualRound,
            type: "actWithChildren"
        });
    }
}
