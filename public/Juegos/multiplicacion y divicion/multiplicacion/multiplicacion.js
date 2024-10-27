let ovnis = [];
let respuestasCorrectas = [];
let puntuacion = 0;
let intervalId;
let tiempoRestante = 45; // Tiempo total ajustado a 45 segundos
let ovnisAtrapados = 0; // Contador de OVNIs atrapados
let cronometroIntervalId;
let intentosFallidos = 0; // Contador de intentos fallidos
const maxIntentosFallidos = 5; // Límite de 5 intentos fallidos

// Generar OVNIs y respuestas
function generarJuego() {
    ovnis = [];
    respuestasCorrectas = [];
    puntuacion = 0;
    ovnisAtrapados = 0;
    intentosFallidos = 0; // Reiniciar los intentos fallidos
    tiempoRestante = 45;
    document.getElementById('mensaje').textContent = "";
    document.getElementById('ovni-counter').textContent = ovnisAtrapados;
    document.getElementById('cronometro').textContent = tiempoRestante;

    const gameArea = document.getElementById('game-area');
    const opcionesDiv = document.getElementById('opciones');
    gameArea.innerHTML = '';
    opcionesDiv.innerHTML = '';

    // Generamos 3 multiplicaciones
    for (let i = 0; i < 3; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const resultado = num1 * num2;

        // Crear el OVNI
        const ovniDiv = document.createElement('div');
        ovniDiv.classList.add('ovni');
        ovniDiv.textContent = `${num1} x ${num2}`;
        ovniDiv.style.left = `${Math.random() * 80}%`; // Posición horizontal aleatoria
        ovniDiv.style.top = '0px';
        gameArea.appendChild(ovniDiv);

        // Guardamos el OVNI y la respuesta correcta
        ovnis.push(ovniDiv);
        respuestasCorrectas.push(resultado);
    }

    // Crear opciones de respuesta aleatorias
    const opciones = [];
    while (opciones.length < 6) { // 3 correctas + 3 incorrectas
        const valor = Math.floor(Math.random() * 100) + 1;
        if (!opciones.includes(valor)) {
            opciones.push(valor);
        }
    }

    // Mezclar las respuestas correctas con las incorrectas
    respuestasCorrectas.forEach(respuesta => {
        opciones.push(respuesta);
    });
    opciones.sort(() => Math.random() - 0.5);

    // Mostrar las opciones de respuesta
    opciones.forEach(opcion => {
        const button = document.createElement('button');
        button.classList.add('opcion');
        button.textContent = opcion;
        button.onclick = () => verificarRespuesta(opcion);
        opcionesDiv.appendChild(button);
    });

    // Iniciar el movimiento de los OVNIs y el cronómetro
    intervalId = setInterval(moverOvnis, 1500); // Mover cada 1.5 segundos
    cronometroIntervalId = setInterval(actualizarCronometro, 1000); // Cronómetro de 1 segundo
}

// Mover los OVNIs hacia abajo
function moverOvnis() {
    ovnis.forEach((ovni, index) => {
        let top = parseInt(ovni.style.top);
        if (top < 380) {
            ovni.style.top = `${top + 40}px`;
        } else {
            ovni.remove(); // OVNI desaparece cuando llega al suelo
            clearInterval(intervalId);
            clearInterval(cronometroIntervalId);
            document.getElementById('mensaje').textContent = "¡Perdiste! Un OVNI llegó a la Tierra.";
        }
    });
}

// Verificar si la respuesta es correcta
function verificarRespuesta(opcion) {
    const index = respuestasCorrectas.indexOf(opcion);
    if (index !== -1) {
        ovnis[index].remove(); // Quitar el OVNI si acierta
        respuestasCorrectas[index] = -1; // Marcar como resuelto
        puntuacion++;
        ovnisAtrapados++;
        document.getElementById('ovni-counter').textContent = ovnisAtrapados;
        if (puntuacion === 3) {
            clearInterval(intervalId);
            clearInterval(cronometroIntervalId);
            document.getElementById('mensaje').textContent = "¡Ganaste! Atrapaste todos los OVNIs.";
        }
    } else {
        intentosFallidos++;
        document.getElementById('mensaje').textContent = `Respuesta incorrecta, te quedan ${maxIntentosFallidos - intentosFallidos} intentos.`;
        if (intentosFallidos >= maxIntentosFallidos) {
            clearInterval(intervalId);
            clearInterval(cronometroIntervalId);
            document.getElementById('mensaje').textContent = "¡Perdiste! Has alcanzado el límite de intentos fallidos.";
        }
    }
}

// Actualizar el cronómetro
function actualizarCronometro() {
    tiempoRestante--;
    document.getElementById('cronometro').textContent = tiempoRestante;
    if (tiempoRestante <= 0) {
        clearInterval(intervalId);
        clearInterval(cronometroIntervalId);
        document.getElementById('mensaje').textContent = "¡Tiempo agotado! No atrapaste todos los OVNIs.";
    }
}

// Reiniciar el juego
function reiniciarJuego() {
    clearInterval(intervalId);
    clearInterval(cronometroIntervalId);
    generarJuego();
}

// Iniciar el juego al cargar la página
window.onload = () => {
    generarJuego();
};
