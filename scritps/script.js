document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("button-jugar").addEventListener("click", jugar);
    document.getElementById("j1-ficha-color").addEventListener("click", cambiarColor);
    document.getElementById("j2-ficha-color").addEventListener("click", cambiarColor);
    document.getElementById("j1-nombre").addEventListener("change", hayEscrito);
    document.getElementById("j2-nombre").addEventListener("change", hayEscrito);
    // document.querySelector(".img-tablero").addEventListener("click", (e) => {
    //     console.log(e.offsetX, e.offsetY)
    // });
    // document.querySelector(".img-tablero").addEventListener("mouseover", (e) => {
    //     e.target.style.cursor = "url('../assets/img/ficha-black.png') 36 36,auto";
    // });

    // document.querySelectorAll(".area-ficha").forEach((elem) => {
    //     elem.addEventListener("mouseover", (e) => {
    //         e.target.style.cursor = "url('../assets/img/ficha-black.png') 36 36,auto";
    //     })
    // });

    document.querySelectorAll(".color-ficha").forEach((elem) => {
        elem.addEventListener("click", (e) => {
            e.preventDefault(e.target);
            console.log(e.target.id);
            colocarFicha(e.target.id)
            cambiarTurno();
        })
    });

});

function colocarFicha(celda) {

}

function cambiarTurno() {
    turno == j1_nombre ? turno = j2_nombre : turno = j1_nombre;
    color_actual == colores[j1_color] ? color_actual = colores[j2_color] : color_actual = colores[j1_color];
    cambiarColorFicha(color_actual);
    document.querySelector(".turno").innerHTML = "Es el turno de " + turno;
}

const colores = ["red", "green", "yellow", "black", "purple", "pink"];
let j1_color, j2_color;
var j1_nombre, j2_nombre;
let turno;
let color_actual;
let tablero = [];

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
    turno = j1_nombre;
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