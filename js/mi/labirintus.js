let felfedezettLabirintus = [];
let n = 10, m = 10;
let lepesek = [];
let lepesekSzama;

function kezdes(a, b, poz) {
	n = a;
	m = b;
	
	jatekos = poz;
	lepesek[0] = jatekos;
	lepesekSzama = 1;
	
	for (let i = 0; i < n; i++) {
		let t = [];
		for (let j = 0; j < n; j++) {
			t.push([]);
		}
		felfedezettLabirintus.push(t);
	}
}

function h(pos) {
    return Math.abs(pos.x - cel.x) + Math.abs(pos.y - cel.y);
}

function lepes(jatekos, lehetsegesIranyok) {	
	if (felfedezettLabirintus[jatekos.x][jatekos.y].length == lehetsegesIranyok.length) {
		return lepesek[--lepesekSzama];
	}
	
    let options = [];
	if (lehetsegesIranyok.includes("NY") && !felfedezettLabirintus[jatekos.x][jatekos.y].includes("NY")) {
        options.push({
			x: jatekos.x,
			y: jatekos.y - 1,
            ellentetIrany: "K",
            irany: "NY",
            h: h({
                x: jatekos.x,
                y: jatekos.y - 1
            })
		});
	}
    if (lehetsegesIranyok.includes("É") && !felfedezettLabirintus[jatekos.x][jatekos.y].includes("É")) {
        options.push({
			x: jatekos.x - 1,
			y: jatekos.y,
            ellentetIrany: "D",
            irany: "É",
            h: h({
                x: jatekos.x - 1,
                y: jatekos.y
            })
		});
	} 
    if (lehetsegesIranyok.includes("K") && !felfedezettLabirintus[jatekos.x][jatekos.y].includes("K")) {
        options.push({
			x: jatekos.x,
			y: jatekos.y + 1,
            ellentetIrany: "NY",
            irany: "K",
            h: h({
                x: jatekos.x,
                y: jatekos.y + 1
            })
		});
	} 
    if (lehetsegesIranyok.includes("D") && !felfedezettLabirintus[jatekos.x][jatekos.y].includes("D")) {
        options.push({
			x: jatekos.x + 1,
			y: jatekos.y,
            ellentetIrany: "É",
            irany: "D",
            h: h({
                x: jatekos.x + 1,
                y: jatekos.y
            })
		});
	}
    let bestOption = options[0];
    for (let i = 1; i < options.length; i++) {
        if (h(bestOption) > h(options[i])) {
            bestOption = options[i];
        }
    }

    felfedezettLabirintus[jatekos.x][jatekos.y].push(bestOption.irany);
	lepesek[++lepesekSzama] = bestOption;
	felfedezettLabirintus[bestOption.x][bestOption.y].push(bestOption.ellentetIrany);
	return {...bestOption, lepesek: lepesek.length};
}

let jatekos = {
	x: -1, 
	y: -1
};
let cel = {
	x: 9, 
	y: 5
};
let voltEMar = [];
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
	voltEMar[ujPozicio.x][ujPozicio.y] = true;
	
	$("#" + (ujPozicio.x) + "-" + (ujPozicio.y)).removeClass("megnemvolt");
    $("#" + (ujPozicio.x) + "-" + (ujPozicio.y) + " span").attr('title', `dist: ${ujPozicio.lepesek - 2}, hv: ${ujPozicio.h}`);
	$("#" + (ujPozicio.x) + "-" + (ujPozicio.y) + " span").attr('data-toggle', 'tooltip');
	$("#" + (ujPozicio.x) + "-" + (ujPozicio.y) + " span").attr('data-placement', 'right');
    $('[data-toggle="tooltip"]').tooltip();
	
	jatekos = ujPozicio;
}

function lepesVizsgalat(poz) {
	if (poz.x - jatekos.x == 1) {
		return labirintus[jatekos.x][jatekos.y].includes("D");
	}
	if (poz.x - jatekos.x == -1) {
		return labirintus[jatekos.x][jatekos.y].includes("É");
	}
	if (poz.y - jatekos.y == 1) {
		return labirintus[jatekos.x][jatekos.y].includes("K");
	}
	if (poz.y - jatekos.y == -1) {
		return labirintus[jatekos.x][jatekos.y].includes("NY");
	}
	return false;
}

let interval;
function jatekInditasa() {
	palyaLetrehozasa();
	
	for (let i = 0; i < n; i++) {
		let t = [];
		for (let j = 0; j < m; j++) {
			t.push(false);
		}
		voltEMar.push(t);
	}
	
	jatekosMozgatasa({x: 0, y: 4});
	
	kezdes(n, m, jatekos);
	
	interval = setInterval(function(){ 
		if (!jatekVege()) {
			let ujPozicio = lepes(jatekos, labirintus[jatekos.x][jatekos.y]);
			if (lepesVizsgalat(ujPozicio)) {
				jatekosMozgatasa(ujPozicio);
			} else {
				//alert("Rossz pozicio!");
				clearInterval(interval);
			}
		} else {
			//alert("Megtaláltad a kincset!");
			clearInterval(interval);
		}
	}, 500)
}

function jatekVege() {
	return cel.x === jatekos.x && cel.y === jatekos.y;
}

$( document ).ready(function() {
    palyaLetrehozasa();
	
	for (let i = 0; i < n; i++) {
		let t = [];
		for (let j = 0; j < m; j++) {
			t.push(false);
		}
		voltEMar.push(t);
	}
	
	jatekosMozgatasa({x: 0, y: 4});
});