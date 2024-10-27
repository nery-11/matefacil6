let tiempoRestante = 30;
let timerInterval;
let aciertos = 0;
let fallos = 0;
const limiteFallos = 5; // Límite máximo de fallos
const desplazamiento = 40; // Movimiento más lento
const maxAciertos = 10; // Termina al llegar a 10 aciertos

const operaciones = [
    { pregunta: "¿Cuánto es 6 ÷ 2?", opciones: [3, 4, 2], respuesta: 3 },
    { pregunta: "¿Cuánto es 5 x 2?", opciones: [10, 12, 15], respuesta: 10 },
    { pregunta: "¿Cuánto es 12 ÷ 4?", opciones: [2, 3, 4], respuesta: 3 },
    { pregunta: "¿Cuánto es 3 x 3?", opciones: [6, 9, 12], respuesta: 9 },
    { pregunta: "¿Cuánto es 9 ÷ 3?", opciones: [2, 3, 5], respuesta: 3 },
    { pregunta: "¿Cuánto es 8 x 4?", opciones: [32, 24, 30], respuesta: 32 },
    { pregunta: "¿Cuánto es 15 ÷ 3?", opciones: [5, 6, 7], respuesta: 5 },
    { pregunta: "¿Cuánto es 7 x 6?", opciones: [42, 36, 48], respuesta: 42 },
    { pregunta: "¿Cuánto es 20 ÷ 5?", opciones: [3, 4, 5], respuesta: 4 },
    { pregunta: "¿Cuánto es 9 x 9?", opciones: [81, 72, 90], respuesta: 81 },
    { pregunta: "¿Cuánto es 16 ÷ 4?", opciones: [4, 5, 6], respuesta: 4 },
    { pregunta: "¿Cuánto es 11 x 3?", opciones: [33, 36, 30], respuesta: 33 },
    { pregunta: "¿Cuánto es 18 ÷ 6?", opciones: [2, 3, 4], respuesta: 3 },
    { pregunta: "¿Cuánto es 14 x 5?", opciones: [70, 65, 75], respuesta: 70 },
    { pregunta: "¿Cuánto es 25 ÷ 5?", opciones: [4, 5, 6], respuesta: 5 },
    { pregunta: "¿Cuánto es 12 x 12?", opciones: [144, 120, 132], respuesta: 144 }
];

function iniciarJuego() {
    document.getElementById('comenzar').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    aciertos = 0;
    fallos = 0;
    tiempoRestante = 30;
    document.getElementById('cronometro').textContent = `Tiempo: ${tiempoRestante}s`;

    // Reiniciar la posición del Lamborghini al inicio del juego
    const imgPersonaje = document.getElementById('imgPersonaje');
    imgPersonaje.style.left = '0px'; // Volver a la posición inicial

    generarPregunta();

    timerInterval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('cronometro').textContent = `Tiempo: ${tiempoRestante}s`;
        if (tiempoRestante === 0) {
            clearInterval(timerInterval);
            finalizarJuego();
        }
    }, 1000);
}

function generarPregunta() {
    if (fallos >= limiteFallos || aciertos >= maxAciertos) {
        finalizarJuego();
        return;
    }

    const operacionAleatoria = operaciones[Math.floor(Math.random() * operaciones.length)];
    const preguntaDiv = document.getElementById('pregunta');
    preguntaDiv.innerHTML = `<h2>${operacionAleatoria.pregunta}</h2>`;

    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = '';

    operacionAleatoria.opciones.forEach(opcion => {
        const opcionBtn = document.createElement('div');
        opcionBtn.classList.add('opcion');
        opcionBtn.textContent = opcion;
        opcionBtn.onclick = () => verificarRespuesta(opcion, operacionAleatoria.respuesta);
        opcionesDiv.appendChild(opcionBtn);
    });
}

function verificarRespuesta(opcion, respuestaCorrecta) {
    if (opcion === respuestaCorrecta) {
        aciertos++;
        moverPersonaje();
        document.getElementById('feedback').textContent = '¡Correcto! 🎉';
    } else {
        fallos++;
        document.getElementById('feedback').textContent = '¡Incorrecto! ❌';
        if (fallos >= limiteFallos) {
            finalizarJuego();
            return;
        }
    }
    generarPregunta();
}

function moverPersonaje() {
    const imgPersonaje = document.getElementById('imgPersonaje');
    const posicionActual = parseInt(imgPersonaje.style.left) || 0;
    imgPersonaje.style.left = `${posicionActual + desplazamiento}px`;

    if (aciertos === maxAciertos) {
        document.getElementById('feedback').textContent = '¡Has llegado a la meta! 🎉🚗💨';
    }
}

function finalizarJuego() {
    clearInterval(timerInterval);

    document.getElementById('pregunta').innerHTML = '';
    document.getElementById('opciones').innerHTML = '';
    document.getElementById('feedback').textContent = '';

    let mensaje = '';
    if (fallos >= limiteFallos) {
        mensaje = 'Has alcanzado el límite de fallos. 😔 ¡Inténtalo de nuevo!';
    } else if (aciertos >= maxAciertos) {
        mensaje = '¡Felicidades! Has llegado a la meta con 10 aciertos. 🚗🎉';
    } else if (aciertos > 10) {
        mensaje = '¡Eres genial! 🎉';
    } else if (aciertos >= 5 && aciertos <= 10) {
        mensaje = '¡Lo hiciste muy bien! 😊';
    } else {
        mensaje = 'Estuvo bien, pero debes mejorar. 👍';
    }

    document.getElementById('resultado').textContent = `${mensaje} Aciertos: ${aciertos}, Fallos: ${fallos}.`;
    document.getElementById('comenzar').style.display = 'block';
}
