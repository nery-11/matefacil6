let aciertos = 0;
let fallos = 0;
let intentosMaximos = 5;

const operaciones = [
    { operacion: '10 - 3', resultado: '7' },
    { operacion: '15 - 7', resultado: '8' },
    { operacion: '12 - 5', resultado: '7' },
    { operacion: '20 - 10', resultado: '10' },
    { operacion: '9 - 4', resultado: '5' }
];

let operacionActual = 0;

document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', checkAnswer);
});

function checkAnswer(e) {
    const answer = e.target.textContent;
    if (answer === operaciones[operacionActual].resultado) {
        aciertos++;
        cambiarOperacion();
    } else {
        fallos++;
    }

    actualizarPuntuacion();
    verificarFinDelJuego();
}

function cambiarOperacion() {
    operacionActual = Math.floor(Math.random() * operaciones.length);
    document.getElementById('operacion').textContent = operaciones[operacionActual].operacion;

    const opciones = document.querySelectorAll('.option');
    const respuestas = generarOpciones(operaciones[operacionActual].resultado);
    
    for (let i = 0; i < opciones.length; i++) {
        opciones[i].textContent = respuestas[i];
    }
}

function generarOpciones(respuestaCorrecta) {
    const respuestas = [respuestaCorrecta];
    while (respuestas.length < 3) {
        const numeroAleatorio = Math.floor(Math.random() * 15) + 1;
        if (!respuestas.includes(numeroAleatorio.toString())) {
            respuestas.push(numeroAleatorio.toString());
        }
    }
    return respuestas.sort(() => Math.random() - 0.5);
}

function actualizarPuntuacion() {
    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('fallos').textContent = fallos;
}

function verificarFinDelJuego() {
    if (fallos >= intentosMaximos) {
        alert('¡Has alcanzado el límite de intentos! El juego ha terminado.');
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    aciertos = 0;
    fallos = 0;
    actualizarPuntuacion();
    cambiarOperacion();
}
