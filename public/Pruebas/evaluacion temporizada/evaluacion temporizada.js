let tiempoRestante = 30; // 30 segundos
let timerInterval;
let aciertos = 0;
let fallos = 0; // Contador de errores
const limiteFallos = 5; // Limite máximo de fallos

const preguntas = [
    { pregunta: "¿Cuánto es 2 + 2?", opciones: [3, 4, 5], respuesta: 4 },
    { pregunta: "¿Cuánto es 5 - 3?", opciones: [1, 2, 3], respuesta: 2 },
    { pregunta: "¿Cuánto es 10 + 10?", opciones: [20, 21, 22], respuesta: 20 },
    { pregunta: "¿Cuánto es 7 + 3?", opciones: [8, 9, 10], respuesta: 10 },
    { pregunta: "¿Cuánto es 6 - 4?", opciones: [1, 2, 3], respuesta: 2 }
];

function iniciarEvaluacion() {
    document.getElementById('comenzar').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    aciertos = 0;
    fallos = 0;
    tiempoRestante = 30;
    document.getElementById('cronometro').textContent = `Tiempo: ${tiempoRestante}s`;

    generarPregunta(); // Generar la primera pregunta

    timerInterval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('cronometro').textContent = `Tiempo: ${tiempoRestante}s`;
        if (tiempoRestante === 0) {
            clearInterval(timerInterval);
            finalizarEvaluacion();
        }
    }, 1000);
}

function generarPregunta() {
    if (fallos >= limiteFallos) {
        finalizarEvaluacion(); // Terminar el juego si se alcanza el límite de fallos
        return;
    }

    const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
    const preguntaDiv = document.getElementById('pregunta');
    preguntaDiv.innerHTML = `<h2>${preguntaAleatoria.pregunta}</h2>`;

    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = ''; // Limpiar opciones anteriores

    preguntaAleatoria.opciones.forEach(opcion => {
        const opcionBtn = document.createElement('div');
        opcionBtn.classList.add('opcion');
        opcionBtn.textContent = opcion;
        opcionBtn.onclick = () => verificarRespuesta(opcion, preguntaAleatoria.respuesta);
        opcionesDiv.appendChild(opcionBtn);
    });
}

function verificarRespuesta(opcion, respuestaCorrecta) {
    if (opcion === respuestaCorrecta) {
        aciertos++;
        document.getElementById('feedback').textContent = '¡Correcto! 🎉';
    } else {
        fallos++;
        document.getElementById('feedback').textContent = '¡Incorrecto! ❌';

        // Terminar si se alcanza el límite de fallos
        if (fallos >= limiteFallos) {
            finalizarEvaluacion();
            return;
        }
    }
    generarPregunta(); // Generar la siguiente pregunta
}

function finalizarEvaluacion() {
    clearInterval(timerInterval); // Detener el cronómetro

    document.getElementById('pregunta').innerHTML = '';
    document.getElementById('opciones').innerHTML = '';
    document.getElementById('feedback').textContent = '';

    // Mostrar mensaje personalizado según los aciertos y fallos
    let mensaje = '';
    if (fallos >= limiteFallos) {
        mensaje = 'Has alcanzado el límite de fallos. 😔 ¡Inténtalo de nuevo!';
    } else if (aciertos > 10) {
        mensaje = '¡Eres genial! 🎉';
    } else if (aciertos >= 5 && aciertos <= 10) {
        mensaje = '¡Lo hiciste muy bien! 😊';
    } else {
        mensaje = 'Estuvo bien, pero debes mejorar. 👍';
    }

    // Agregar recomendaciones si hay muchos fallos
    let recomendaciones = '';
    if (fallos > 5) {
        recomendaciones = ' Sigue practicando para mejorar tu conteo y observa con atención. ¡Puedes hacerlo!';
    } else if (fallos > 0) {
        recomendaciones = ' Solo unos pocos errores, ¡sigue mejorando! ';
    }

    document.getElementById('resultado').textContent = `${mensaje} Aciertos: ${aciertos}, Fallos: ${fallos}. ${recomendaciones}`;
    document.getElementById('comenzar').style.display = 'block';
}
