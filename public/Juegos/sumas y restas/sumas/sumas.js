// Variables globales
let posicionJugador = 0;
let totalDistancia = 300; // Distancia del recorrido
let respuestaCorrecta;
let tiempoRestante = 45; // Tiempo en segundos
let cronometro;
let acertados = 0;
let fallados = 0;
const maxFallos = 5; // Límite de fallos
const track = document.getElementById('track');
const player = document.getElementById('player');
const acertadosElem = document.getElementById('acertados');
const falladosElem = document.getElementById('fallados');
const botonJugarNuevo = document.getElementById('btn-jugar-nuevo');

// Generar una nueva suma
function generarSuma() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    respuestaCorrecta = num1 + num2;
    document.getElementById('operacion').textContent = `¿Cuánto es ${num1} + ${num2}?`;

    generarOpciones(respuestaCorrecta);
}

// Generar opciones de respuesta
function generarOpciones(correctAnswer) {
    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = ''; // Limpiar las opciones anteriores

    let opciones = [correctAnswer];

    // Generar dos respuestas incorrectas aleatorias
    while (opciones.length < 3) {
        let incorrecta = Math.floor(Math.random() * 20) + 1; // Números entre 1 y 20
        if (!opciones.includes(incorrecta)) {
            opciones.push(incorrecta);
        }
    }

    // Mezclar las opciones
    opciones = opciones.sort(() => Math.random() - 0.5);

    // Crear botones de opciones
    opciones.forEach(opcion => {
        const button = document.createElement('button');
        button.textContent = opcion;
        button.classList.add('opcion');
        button.onclick = () => verificarRespuesta(opcion); // Verificar al hacer clic
        opcionesDiv.appendChild(button);
    });
}

// Verificar la respuesta seleccionada
function verificarRespuesta(opcionSeleccionada) {
    if (opcionSeleccionada === respuestaCorrecta) {
        moverJugador(30); // Avanza 30px si es correcta
        acertados++;
        acertadosElem.textContent = acertados;
        document.getElementById('mensaje').textContent = "¡Correcto! Avanzas.";
    } else {
        detenerJugador(); // Se detiene si es incorrecta
        fallados++;
        falladosElem.textContent = fallados;
        document.getElementById('mensaje').textContent = "Incorrecto. Te detienes.";
        
        if (fallados >= maxFallos) {
            finalizarJuego('¡Has fallado 5 veces! Fin del juego.');
            return;
        }
    }
    generarSuma(); // Generar una nueva suma
}

// Mover el jugador
function moverJugador(distancia) {
    posicionJugador += distancia;
    player.style.left = posicionJugador + 'px';
    
    // Verificar si llegó a la meta
    if (posicionJugador >= totalDistancia) {
        finalizarJuego('¡Ganaste la carrera! 🎉');
    }
}

// Detener al jugador por unos segundos si se equivoca
function detenerJugador() {
    setTimeout(() => {
        document.getElementById('mensaje').textContent = "";
    }, 1000);
}

// Finalizar el juego cuando se alcanzan 5 fallos o se llega a la meta
function finalizarJuego(mensaje) {
    clearInterval(cronometro);
    document.getElementById('mensaje').textContent = mensaje;
    document.getElementById('opciones').innerHTML = ''; // Desactivar las opciones
    botonJugarNuevo.style.display = 'inline-block'; // Mostrar el botón de "Jugar de nuevo"
}

// Iniciar el cronómetro
function iniciarCronometro() {
    cronometro = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempoRestante').textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            finalizarJuego('¡Se acabó el tiempo! 😥');
        }
    }, 1000);
}

// Reiniciar el juego
function reiniciarJuego() {
    posicionJugador = 0;
    player.style.left = '0px';
    tiempoRestante = 45; // Tiempo reiniciado a 45 segundos
    document.getElementById('tiempoRestante').textContent = tiempoRestante;
    acertados = 0;
    fallados = 0;
    acertadosElem.textContent = acertados;
    falladosElem.textContent = fallados;
    document.getElementById('mensaje').textContent = "";
    clearInterval(cronometro);
    botonJugarNuevo.style.display = 'none'; // Ocultar el botón de "Jugar de nuevo"
    iniciarCronometro();
    generarSuma();
}

// Iniciar el juego al cargar la página
window.onload = () => {
    generarSuma();
    iniciarCronometro();
};
