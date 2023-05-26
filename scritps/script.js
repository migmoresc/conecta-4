document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("button-jugar").addEventListener("click", jugar);
    document.getElementById("j1-ficha-color").addEventListener("click", cambiarColor);
    document.getElementById("j2-ficha-color").addEventListener("click", cambiarColor);
    document.getElementById("j1-nombre").addEventListener("change", hayEscrito);
    document.getElementById("j2-nombre").addEventListener("change", hayEscrito);
    // document.querySelector(".img-tablero").addEventListener("click", (e) => {
    //     console.log(e.offsetX, e.offsetY)
    // });
    document.querySelector(".img-tablero").addEventListener("mouseover", (e) => {
        e.target.style.cursor = "url('../assets/img/ficha-black.png') 36 36,auto";
    });

    document.querySelectorAll(".area-ficha").forEach((elem) => {
        elem.addEventListener("mouseover", (e) => {
            e.target.style.cursor = "url('../assets/img/ficha-black.png') 36 36,auto";
        })
    });

    document.querySelectorAll(".area-ficha").forEach((elem) => {
        elem.addEventListener("click", (e) => {
            e.preventDefault(e.target);
            console.log(e.target.id);
        })
    });

});

const colores = ["red", "green", "yellow", "black", "purple", "pink"];
let j1_color, j2_color;
let j1_nombre, j2_nombre;
let turno;

function jugar() {
    console.log("jugar")
    if (comprobarJugadores()) {
        document.querySelector(".jugadores").style.display = "none";
        document.querySelector(".turno").style.display = "block";
        document.querySelector(".tablero").style.display = "block";
    }
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