let n = 10, m = 10;

function h(pos) {
    return Math.abs(pos.x - cel.x) + Math.abs(pos.y - cel.y);
}

let jatekos = {
	x: -1, 
	y: -1
};
let cel = {
	x: 9, 
	y: 5
};

let labirintus = [
	[["K"], ["NY", "D"], ["K", "D"], ["K", "NY"], ["K", "NY"], ["NY", "D"], ["D", "K"], ["NY"], ["D", "K"], ["NY", "D"]],
	[["K", "D"], ["É", "NY", "D"], ["É", "K"], ["NY", "D"], ["D", "K"], ["É", "NY", "D"], ["É", "K", "D"], ["NY", "D"], ["É", "D"], ["É", "D"]],
	[["É", "D"], ["É"], ["K", "D"], ["É", "NY"], ["É", "D"], ["É", "D"], ["É", "D"], ["É", "K"], ["É", "NY"], ["É", "D"]],
	[["É", "D", "K"], ["NY", "D"], ["É", "K"], ["NY", "D"], ["É", "D"], ["É", "K"], ["É", "NY"], ["K"], ["K", "NY", "D"], ["É", "NY"]],
	[["É", "D"], ["É", "K"], ["NY"], ["É", "D"], ["É", "K"], ["NY", "D"], ["D"], ["D", "K"], ["É", "D", "K", "NY"], ["NY"]],
	[["É", "K"], ["K", "NY", "D"], ["K", "NY", "D"], ["É", "NY"], ["D"], ["É", "D"], ["É", "D"], ["É", "D"], ["É", "K"], ["NY", "D"]],
	[["K"], ["NY", "É"], ["É", "D"], ["K", "D"], ["É", "NY"], ["É", "D"], ["É", "K"], ["É", "NY"], ["D"], ["É", "D"]],
	[["K", "D"], ["NY", "K"], ["É", "NY"], ["É", "D"], ["D"], ["É", "D", "K"], ["K", "NY"], ["NY", "D"], ["É", "D"], ["É", "D"]],
	[["É", "D"], ["D", "K"], ["NY", "D"], ["É", "K"], ["É", "NY", "D"], ["É", "K"], ["NY"], ["É", "D"], ["É", "D"], ["É", "D"]],
	[["É", "K"], ["É", "NY"], ["É", "K"], ["K", "NY"], ["É", "NY"], ["K"], ["K", "NY"], ["É", "NY"], ["É", "K"], ["É", "NY"]]
];

function palyaLetrehozasa() {
	let tabla = "<table>";
	for(let i = 0; i < n; i++) {
		tabla += "<tr>";
		for(let j = 0; j < m; j++) {
			let style = 'style="'; 
			
			style += "border-top: ";
			if (labirintus[i][j].includes("É")) {
				style += "none;";
			} else {
				style += "1px solid black;"
			}
			
			style += "border-right: ";
			if (labirintus[i][j].includes("K")) {
				style += "none;";
			} else {
				style += "1px solid black;"
			}
			
			style += "border-left: ";
			if (labirintus[i][j].includes("NY")) {
				style += "none;";
			} else {
				style += "1px solid black;"
			}
			
			style += "border-bottom: ";
			if (labirintus[i][j].includes("D")) {
				style += "none;";
			} else {
				style += "1px solid black;"
			}

			style += '"';
			
			if (i == cel.x && j == cel.y) {
				tabla += '<td class="megnemvolt" id="' + i + '-' + j + '" ' + style + '><span class="glyphicon glyphicon-gift" aria-hidden="true" style="top: 3.5px;"></span></td>';
			} else {
				tabla += '<td class="megnemvolt" id="' + i + '-' + j + '" ' + style + '><span>&nbsp</span></td>';
			}
		}
		tabla += "</tr>";
	}
	tabla += "</table>";
	
	$("#jatek-ter").html("");
	$("#jatek-ter").append(tabla);
}

function jatekosMozgatasa(ujPozicio) {
    if (!ujPozicio.h) {
        ujPozicio.h = h(ujPozicio);
        ujPozicio.lepesek = 2;
    }
	$("#" + jatekos.x + "-" + jatekos.y + " span").html("&nbsp;");
	$("#" + ujPozicio.x + "-" + ujPozicio.y + " span").html('<span class="glyphicon glyphicon-user" aria-hidden="true" style="top: 3.5px;"></span>');
	
	$("#" + (ujPozicio.x) + "-" + (ujPozicio.y)).removeClass("megnemvolt");
    $("#" + (ujPozicio.x) + "-" + (ujPozicio.y) + " span").attr('title', `dist: ${ujPozicio.lepesek - 2}, hv: ${ujPozicio.h}`);
	$("#" + (ujPozicio.x) + "-" + (ujPozicio.y) + " span").attr('data-toggle', 'tooltip');
	$("#" + (ujPozicio.x) + "-" + (ujPozicio.y) + " span").attr('data-placement', 'right');
    $('[data-toggle="tooltip"]').tooltip();
	
	jatekos = ujPozicio;
}


$( document ).ready(function() {
    palyaLetrehozasa();
	
	jatekosMozgatasa({x: 0, y: 4});
});

function szomszedok(pos) {
	let arr = [];
	if (labirintus[pos.x][pos.y].includes("D")) {
		arr.push({
			x: pos.x + 1,
			y: pos.y
		});
	}
	if (labirintus[pos.x][pos.y].includes("É")) {
		arr.push({
			x: pos.x - 1,
			y: pos.y
		});
	}
	if (labirintus[pos.x][pos.y].includes("K")) {
		arr.push({
			x: pos.x,
			y: pos.y + 1
		});
	}
	if (labirintus[pos.x][pos.y].includes("NY")) {
		arr.push({
			x: pos.x,
			y: pos.y - 1
		});
	}
	return arr;
}

let start = {x: 0, y: 4};
let goal = {x: 9, y: 5};

function startFc() {
	pause();
    aStar();

	actStep = 0;
    display(steps[actStep], actStep);
    barValtoztatasaNew(actStep, steps.length);
    playNew();

	$("#eredmenyek").removeClass("hidden");
    $("#algoritmus-reszletek-new").removeClass("hidden");
}

function display(step, stepCount) {
	palyaLetrehozasa();
	$("#" + step.pos.x + "-" + step.pos.y + " span").html('<span class="glyphicon glyphicon-user" aria-hidden="true" style="top: 3.5px;"></span>');
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (step.visited[i][j]) {
				$("#" + (i) + "-" + (j)).removeClass("megnemvolt");

				$("#" + (i) + "-" + (j) + " span").attr('title', `dist: ${step.distances[i][j]}, hv: ${h({x: i, y: j})}`);
				$("#" + (i) + "-" + (j) + " span").attr('data-toggle', 'tooltip');
				$("#" + (i) + "-" + (j) + " span").attr('data-placement', 'right');
				$('[data-toggle="tooltip"]').tooltip();
			}
		}
	}
}

function aStar() {
    let distances = [];
    for (let i = 0; i < 10; i++) {
		distances[i] = [];
		for (let j = 0; j < 10; j++) 
			distances[i][j] = Number.MAX_VALUE;
	}
		
    distances[start.x][start.y] = 0;

    let priorities = [];
    for (let i = 0; i < 10; i++) {
		priorities[i] = [];
		for (let j = 0; j < 10; j++) 
			priorities[i][j] = Number.MAX_VALUE;
	}
    priorities[start.x][start.y] = h(start);

    let visited = [];
	for (let i = 0; i < 10; i++) 
		visited[i] = [];

		steps.push({
			pos: {x: start.x, y: start.y},
			visited: JSON.parse(JSON.stringify(visited)),
			distances: JSON.parse(JSON.stringify(distances)),
			type: "first"
		});

    while (true) {
        let lowestPriority = Number.MAX_VALUE;
        let lowestPriorityIndex = -1;
		let lowestPriorityIndexJ = -1;
        for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (priorities[i][j] < lowestPriority && !visited[i][j]) {
					lowestPriority = priorities[i][j];
					lowestPriorityIndex = i;
					lowestPriorityIndexJ = j;
				}
			}
        }

		steps.push({
			pos: {x: lowestPriorityIndex, y: lowestPriorityIndexJ},
			visited: JSON.parse(JSON.stringify(visited)),
			distances: JSON.parse(JSON.stringify(distances)),
			type: "second"
		});

        if (lowestPriorityIndex === -1 || lowestPriorityIndexJ === -1) {
            return -1;
        } else if (lowestPriorityIndex === goal.x && lowestPriorityIndexJ === goal.y) {
			steps.push({
				pos: {x: lowestPriorityIndex, y: lowestPriorityIndexJ},
				visited: JSON.parse(JSON.stringify(visited)),
				distances: JSON.parse(JSON.stringify(distances)),
				type: "third"
			});
            return distances[lowestPriorityIndex][lowestPriorityIndexJ];
        }

		let szomArray = szomszedok({x: lowestPriorityIndex, y: lowestPriorityIndexJ});
        for (let i = 0; i < szomArray.length; i++) {
            if (!visited[szomArray[i].x][szomArray[i].y]) {
                if (distances[lowestPriorityIndex][lowestPriorityIndexJ] + 1 < distances[szomArray[i].x][szomArray[i].y]) {
                    distances[szomArray[i].x][szomArray[i].y] = distances[lowestPriorityIndex][lowestPriorityIndexJ] + 1;
                    priorities[szomArray[i].x][szomArray[i].y] = distances[szomArray[i].x][szomArray[i].y] + h(szomArray[i]);
                }
            }
        }

        visited[lowestPriorityIndex][lowestPriorityIndexJ] = true;
    }
}