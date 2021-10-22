let minVal;
let maxVal;
let minp = 0;
let maxp = 256;
let prevMax = 0;
let prevMin = 200000;
let scale;
let btn1 = document.getElementsByClassName("btn-1");
let btn2 = document.getElementsByClassName("btn-2");
let btn3 = document.getElementsByClassName("btn-3");
let btn4 = document.getElementsByClassName("btn-4");


function mapDraw() {

    switch (window.click){
        case 'job':
            btn2[0].className += " active";
            btn1[0].className = "btn btn-1";
            btn3[0].className = "btn btn-3";
            btn4[0].className = "btn btn-4";
            break;
        case 'day':
            btn3[0].className += " active";
            btn1[0].className = "btn btn-1";
            btn2[0].className = "btn btn-2";
            btn4[0].className = "btn btn-4";
            break;
        case 'move':
            btn4[0].className += " active";
            btn1[0].className = "btn btn-1";
            btn2[0].className = "btn btn-2";
            btn3[0].className = "btn btn-3";
            break;
        default:
            btn1[0].className += " active";
            btn2[0].className = "btn btn-2";
            btn3[0].className = "btn btn-3";
            btn4[0].className = "btn btn-4";
            break;
    }

    let canvas = document.createElement('canvas');
    document.getElementById("container").appendChild(canvas);
    canvas.style.position = 'absolute';

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, parseInt(window.getComputedStyle(canvas).width), parseInt(window.getComputedStyle(canvas).height));

    canvas.setAttribute("width", parseInt(window.getComputedStyle(canvas.parentElement).width));
    canvas.setAttribute("height", parseInt(window.getComputedStyle(canvas.parentElement).height));
    let sc = Math.min(canvas.width / 1920, canvas.height / 1080);

    let json = "./src/fishnet2021.geojson";
    let tablJSON = "./src/tabl.json";

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    ctx.fillStyle = "wheat";
    readTextFile(json, function (text) {
        window.jsonMap = JSON.parse(text);

        for (let p = 0; p < window.jsonTabl.size; p++) {
            let d = window.jsonTabl.get(p.toString());
            if (d != undefined && d["Location_" + window.click] != "" && d["Location_" + window.click] != 0) {
                let item = d["Location_" + window.click];
                maxVal = Math.log(Math.max(prevMax, item));
                minVal = isNaN(Math.log(Math.min(prevMin, item))) == true || minVal == 0 ? 1 : Math.log(Math.min(prevMin, item));
                prevMin = minVal;
                prevMax = maxVal;
            }
            scale = (maxVal - minVal) / (maxp - minp)
        }



        for (let i = 0; i < window.jsonMap.features.length; i++) {
            ctx.beginPath();
            let square = window.jsonMap.features[i]["geometry"]["coordinates"][0];
            //ctx.moveTo(((square[0][0] - 30) * 300 - (canvas.width*0.8)) * sc, canvas.height - ((square[0][1] - 50) * 300 - canvas.height) * sc);
            ctx.moveTo((square[0][0] - 30), canvas.height - (square[0][1] - 50));
            //console.log(square[0][0], square[0][1])

            for (let j = 0; j < square.length; j++) {
                //ctx.lineTo(((square[j][0] - 30) * 300 - (canvas.width*0.8)) * sc, canvas.height - ((square[j][1] - 50) * 300 - canvas.height) * sc);
                ctx.lineTo((square[j][0] - 30) * (canvas.width / 6) - canvas.width * 0.75, canvas.height - (square[j][1] - 50) * (canvas.height / 3) + (canvas.height + canvas.height * 0.35));
                //console.log(square[j][0], square[j][1])
            }

            let mapCz = window.jsonMap.features[i].properties.cell_zid;
            let tablLoc = window.jsonTabl.get(mapCz.toString())["Location_" + window.click];

            if (tablLoc != "" && tablLoc != 0 && tablLoc.length > 0) {
                let color = minVal + scale * (tablLoc - minp);
                ctx.fillStyle = "rgb(205," + color + "," + color + ")";                
            } else {
                ctx.fillStyle = "rgb(245, 222, 179)";
            }
            ctx.fill();
        }

    });

    readTextFile(tablJSON, function (text) {
        window.jsonTabl = json2map(JSON.parse(text));
    });

    function json2map(jsn) {
        let map = new Map();
        for (let i in jsn) {
            if (jsn[i].cell_zid == null) continue;
            map.set(jsn[i].cell_zid, jsn[i]);
        }
        return map;
    }

}

randomColor = function () {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function admDraw() {

    let canvas = document.createElement('canvas');
    document.getElementById("container").appendChild(canvas);
    canvas.style.position = 'absolute';

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, parseInt(window.getComputedStyle(canvas).width), parseInt(window.getComputedStyle(canvas).height));

    canvas.setAttribute("width", parseInt(window.getComputedStyle(canvas.parentElement).width));
    canvas.setAttribute("height", parseInt(window.getComputedStyle(canvas.parentElement).height));
    let sc = Math.min(canvas.width / 1920, canvas.height / 1080);

    let json = "src/admzones2021.geojson";

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    readTextFile(json, function (text) {
        window.jsonMap = JSON.parse(text);

        ctx.strokeStyle = "transparent";
        for (let i = 0; i < window.jsonMap.features.length; i++) { //Все зоны
            ctx.beginPath();
            let zonesCoord = window.jsonMap.features[i]["geometry"]["coordinates"][0];
            //ctx.moveTo(((zonesCoord[0][0] - 30) * 300 - (canvas.width*0.8)) * sc, canvas.height - ((zonesCoord[0][1] - 50) * 300 - canvas.height ) * sc);
            //ctx.moveTo((zonesCoord[0][0] - 30), canvas.height - (zonesCoord[0][1] - 50));
            ctx.moveTo((zonesCoord[0][0] - 30) * (canvas.width / 6) - canvas.width * 0.75, canvas.height - (zonesCoord[0][1] - 50) * (canvas.height / 3) + (canvas.height + canvas.height * 0.35));

            for (let j = 0; j < zonesCoord.length; j++) { // I-тая зона

                //ctx.lineTo(((zonesCoord[j][0] - 30) * 300 - (canvas.width*0.8)) * sc, canvas.height - ((zonesCoord[j][1] - 50) * 300 - canvas.height) * sc);
                ctx.lineTo((zonesCoord[j][0] - 30) * (canvas.width / 6) - canvas.width * 0.75, canvas.height - (zonesCoord[j][1] - 50) * (canvas.height / 3) + (canvas.height + canvas.height * 0.35));
                // console.log(canvas.height,"|||",zonesCoord[j][1],"|||",canvas.width - ((zonesCoord[j][0] - 30) * 300 - canvas.width) );
            }
            ctx.strokeStyle = "darkgoldenrod";
            ctx.stroke();
        }
    });
    

}