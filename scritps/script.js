document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("button-jugar").addEventListener("click", jugar);
    document.querySelector(".ganador").addEventListener("click", atras);
    document.getElementById("j1-ficha-color").addEventListener("click", cambiarColor);
    document.getElementById("j2-ficha-color").addEventListener("click", cambiarColor);
    document.getElementById("j1-nombre").addEventListener("change", hayEscrito);
    document.getElementById("j2-nombre").addEventListener("change", hayEscrito);

    document.querySelectorAll("area.color-ficha").forEach((elem) => {
        elem.addEventListener("click", clickCelda);
    });
});

function atras() {
    document.querySelector(".ganador").style.display = "none";
    document.querySelector(".tablero").style.display = "none";
    document.querySelector(".turno").style.display = "none";
    document.querySelector(".jugadores").style.display = "block";
}

function clickCelda(e) {
    e.preventDefault();
    if (!hayGanador) {
        if (colocarFicha(e.target.id)) {
            cambiarTurno();
        }
    }
}

function colocarFicha(celda) {
    // console.log("celda ", celda)
    let columna = celda[2];
    // console.log("columna ", columna)
    if (hayEspacio(columna - 1)) {
        let y_libre;
        for (let y = 0; y < 7; y++) {
            y_libre = y;
            if (tablero[columna - 1][y] != 0) {
                y_libre = y - 1;
                break;
            }
        }
        // console.log(y_libre)
        // console.log(document.getElementById(`c-${columna}-${y_libre + 1}`))
        tablero[columna - 1][y_libre] = num_jug_turno;
        document.getElementById(`c-${columna}-${y_libre + 1}`).style.cssText = `
        display:block;
        background-color:${color_actual};
        top:-50px;
        left:${left_columnas[columna - 1]}px;`;
        setTimeout(() => {
            document.getElementById(`c-${columna}-${y_libre + 1}`).style.top = `${top_filas[y_libre]}px`;
        }, 250);

        if (comprobarVictoria(columna - 1, y_libre)) {
            return false;
        }
        // console.log(tablero)
        return true;
    } else {
        return false;
    }

}

function comprobarVictoria(columna, fila) {
    console.log("columna: ", columna, " fila: ", fila);
    console.log(tablero)
    if (hayVictoriaVertical(columna) || hayVictoriaHorizontal(fila) || hayVictoriaDiagonal(columna, fila)) {
        document.querySelector(".turno").innerHTML = "Ganador: " + turno;
        hayGanador = true;
        document.querySelector(".ganador").style.display = "block";
        return true;
    } else {
        return false;
    }
}

function hayGanadorArray(array) {
    console.log(array)
    if (array.filter((e) => e != 0).length >= 4) {
        let cont = 0;
        let ant = 0;
        for (let y = 0; y < 7; y++) {
            if (array[y] != 0) {
                if (array[y] != ant) {
                    cont = 1;
                } else {
                    cont = cont + 1;
                }
                if (cont == 4) {
                    return true;
                }
            }
            ant = array[y];
        }
    } else {
        return false;
    }
}

function hayVictoriaVertical(columna) {
    return hayGanadorArray(tablero[columna]);
}

function hayVictoriaHorizontal(fila) {
    let array = [];
    for (let x = 0; x < tablero.length; x++) {
        array.push(tablero[x][fila]);
    }
    return hayGanadorArray(array);
}

function hayVictoriaDiagonal(columna, fila) {
    let array1 = [];
    for (let x = 0; x < tablero.length; x++) {
        if (Math.abs(fila - columna + x) < 7) {
            array1.push(tablero[x][Math.abs(fila - columna + x)]);
        }
    }

    let array2 = [];
    for (let x = 0; x < tablero.length; x++) {
        if (fila + (columna - x) < 7 && fila + (columna - x) >= 0) {
            array2.push(tablero[x][fila + (columna - x)]);
        }
    }
    return (hayGanadorArray(array1) || hayGanadorArray(array2));
}

function hayEspacio(columna) {
    // console.log("hayespacio: ", columna)
    return tablero[columna][0] == 0;
}

function cambiarTurno() {
    turno == j1_nombre ? turno = j2_nombre : turno = j1_nombre;
    color_actual == colores[j1_color] ? color_actual = colores[j2_color] : color_actual = colores[j1_color];
    num_jug_turno == 1 ? num_jug_turno = 2 : num_jug_turno = 1;
    cambiarColorFicha(color_actual);
    document.querySelector(".turno").innerHTML = "Es el turno de " + turno;
}

const colores = ["red", "green", "yellow", "black", "purple", "pink"];
const left_columnas = [79, 193, 305, 421, 534, 648];
const top_filas = [39, 114, 189, 264, 339, 414, 488];
let hayGanador = false;
let j1_color, j2_color;
var j1_nombre, j2_nombre;
let turno, num_jug_turno;
let color_actual;
let tablero = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

function jugar() {
    console.log("jugar")
    if (comprobarJugadores()) {
        document.querySelector(".jugadores").style.display = "none";
        document.querySelector(".turno").style.display = "block";
        document.querySelector(".tablero").style.display = "block";
        iniciarTurnos();
    }
}

function iniciarTurnos() {
    document.querySelectorAll(".celda").forEach((e) => {
        e.style.backgroundColor = "transparent";
        e.style.top = "-50px";
    })
    tablero = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
    hayGanador = false;
    turno = j1_nombre;
    num_jug_turno = 1;
    document.querySelector(".turno").innerHTML = "Es el turno de " + turno;
    cambiarColorFicha(colores[j1_color]);
}

function cambiarColorFicha(color) {
    color_actual = color;
    // Getting the stylesheet
    const stylesheet = document.styleSheets[1];
    let elementRules;

    // looping through all its rules and getting your rule
    for (let i = 0; i < stylesheet.cssRules.length; i++) {
        if (stylesheet.cssRules[i].selectorText === '.color-ficha') {
            elementRules = stylesheet.cssRules[i];
        }
    }

    // modifying the rule in the stylesheet
    elementRules.style.setProperty('cursor', `url('../../assets/img/ficha-${color}.png') 36 36,auto`);
}

function comprobarJugadores() {

    const j1_nombre = document.getElementById("j1-nombre");
    const j2_nombre = document.getElementById("j2-nombre");
    const j1_ficha_color = document.getElementById("j1-ficha-color");
    const j2_ficha_color = document.getElementById("j2-ficha-color");

    window.j1_nombre = j1_nombre.value;
    window.j2_nombre = j2_nombre.value;

    if (j1_nombre.value != "" && j2_nombre.value != "" && j1_color != undefined && j2_color != undefined && window.j1_nombre != window.j2_nombre) {
        return true;
    } else {
        if (j1_nombre.value == "") { j1_nombre.classList.add("error"); }
        if (j2_nombre.value == "") { j2_nombre.classList.add("error"); }
        if (j1_color == undefined) { j1_ficha_color.classList.add("error"); }
        if (j2_color == undefined) { j2_ficha_color.classList.add("error"); }
        return false;
    }
}

function hayEscrito() {

    if (this.value == "") {
        this.classList.add("error");
    } else {
        let jugador = this.id.slice(0, 2) + "_nombre";
        eval(`${jugador} = this.value`);

        if (j1_nombre != undefined && j2_nombre != undefined && j1_nombre == j2_nombre) {
            this.classList.add("error");
        } else {
            this.classList.remove("error");
        }
    }
}

function cambiarColor() {
    const num_jugador = this.id.slice(0, 2);
    eval(`if(${num_jugador}_color==undefined){${num_jugador}_color=0;}else{${num_jugador}_color = (${num_jugador}_color + 1)%6;}`);
    if (j1_color == j2_color) {
        eval(`${num_jugador}_color = (${num_jugador}_color + 1)%6;`);
    }
    this.style.backgroundColor = colores[eval(`${num_jugador}_color`)]
}