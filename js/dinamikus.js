$("#bemenet-dinamikus").val('[{"v": 2, "w": 3}, {"v": 2, "w": 1}, {"v": 4, "w": 3}, {"v": 5, "w": 4}, {"v": 3, "w": 2}]');
$("#kapacitas").val(7);

function dinamikusStart() {
    pause();
    generateStepsForBackpack();
    //console.log(steps);
    
    display(steps[actStep], actStep);
    barValtoztatasaNew(actStep, steps.length);
    playNew();

    $("#eredmenyek").removeClass("hidden");
    $("#algoritmus-reszletek-new").removeClass("hidden");
}

function generateStepsForBackpack() {
    let values = JSON.parse($("#bemenet-dinamikus").val());
    let maxSuly = parseInt($("#kapacitas").val());
    let t = [];
    for (let x = 0; x < values.length; x++) {
        let row = [];
        for (let y = 0; y <= maxSuly; y++) {
            row.push('');
        }
        t.push(row);
    }

    for (let j = 0; j <= maxSuly; j++) t[0][j]=0;
    steps.push({
        values: values,
        maxSuly: maxSuly,
        t: JSON.parse(JSON.stringify(t)),
        act: null,
        type: "first"
    });
    for (let i = 1; i < values.length; i++) {
        for (let j = 0; j <= maxSuly; j++) {
            if (values[i].w > j) {
                t[i][j] = t[i - 1][j];
                steps.push({
                    values: values,
                    maxSuly: maxSuly,
                    t: JSON.parse(JSON.stringify(t)),
                    act: [String(i), String(i - 1) + String(j), String(i) + String(j)],
                    type: "next"
                });
            } else {
                t[i][j] = Math.max(t[i - 1][j], t[i - 1][j - values[i].w] + values[i].v);
                steps.push({
                    values: values,
                    maxSuly: maxSuly,
                    t: JSON.parse(JSON.stringify(t)),
                    act: [String(i), String(i - 1) + String(j), String(i - 1) + String(j - values[i].w), String(i) + String(j)],
                    type: "next"
                });
            }
        }
    }

    /*setTimeout(() => {
        display(steps[0], 0);
    }, 400);*/
}

function display(step, i) {
    let {values, maxSuly, t} = step;
    let table = "<table><tr><td>(v,w)</td>";
    for (let i = 0; i <= maxSuly; i++) {
        table += `<td>${i}</td>`;
    }
    table += "</tr>";
    for (let i = 0; i < values.length; i++) {
        table += `<tr><td id="${i}">(${values[i].v},${values[i].w})</td>`;
        for (let j = 0; j <= maxSuly; j++) {
            table += `<td id="${i}${j}">${t[i][j]}</td>`;
        }
        table += "</tr>";
    }

    table += "</table>";
    $(".game").html(table);

    if (step.act) {
        step.act.forEach((element, eInd) => {
            if (eInd === step.act.length - 1 && i === steps.length - 1) $("#" + element).addClass("solution");
            $("#" + element).addClass("act");
        });
    }

    /*setTimeout(() => {
        if (i + 1 < steps.length) {
            display(steps[i + 1], i + 1);
        }
    }, 400);*/
}