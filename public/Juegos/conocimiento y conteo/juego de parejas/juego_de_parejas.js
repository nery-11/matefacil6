// Variables globales para el conteo de parejas encontradas, juegos ganados, intentos fallidos
let parejasEncontradas = 0;
let juegosGanados = 0;
let intentosFallidos = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Variables de medallas
let medallasOro = 0;
let medallasPlata = 0;
let medallasBronce = 0;

// Colores en el orden del arcoíris fijos para cada número
const coloresArcoiris = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF', '#FF1493', '#00CED1', '#FFD700',
    '#FF4500', '#FF69B4', '#7FFF00', '#8A2BE2', '#6495ED', '#FF6347', '#00FF7F', '#DC143C', '#48D1CC', '#FF00FF'
];

// Función para iniciar el juego de parejas
function iniciarJuegoParejas() {
    parejasEncontradas = 0;
    intentosFallidos = 0;
    actualizarPuntuacion();
    actualizarIntentosFallidos();

    const contenidoJuego = document.getElementById('contenidoJuego');
    contenidoJuego.innerHTML = ''; // Limpiar el contenido anterior

    // Generar 10 pares de números (del 1 al 10) y duplicarlos para llenar 5x4 (20 cartas en total)
    let numeros = Array.from({ length: 10 }, (_, i) => i + 1);
    let pares = [...numeros, ...numeros]; // 10 pares (20 cartas)
    pares = pares.sort(() => Math.random() - 0.5); // Mezclar las tarjetas

    // Crear las tarjetas
    pares.forEach((numero, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('memory-card');
        tarjeta.dataset.numero = numero;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        frontFace.style.backgroundColor = coloresArcoiris[(numero - 1) % coloresArcoiris.length];
        frontFace.textContent = numero;

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');

        tarjeta.appendChild(frontFace);
        tarjeta.appendChild(backFace);

        tarjeta.addEventListener('click', voltearTarjeta);

        contenidoJuego.appendChild(tarjeta);
    });
}

// Función para voltear una tarjeta
function voltearTarjeta() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip'); // Agregar clase flip para girar la tarjeta

    if (!hasFlippedCard) {
        // Primer clic
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segundo clic
    secondCard = this;

    verificarPareja();
}

// Verificar si las tarjetas coinciden
function verificarPareja() {
    let esPareja = firstCard.dataset.numero === secondCard.dataset.numero;

    if (esPareja) {
        desactivarTarjetas();
    } else {
        intentosFallidos++;
        actualizarIntentosFallidos();
        desvoltearTarjetas();
    }
}

// Desactivar tarjetas si son pareja
function desactivarTarjetas() {
    firstCard.removeEventListener('click', voltearTarjeta);
    secondCard.removeEventListener('click', voltearTarjeta);
    parejasEncontradas++;
    actualizarPuntuacion();
    resetearTablero();

    // Verificar si el juego ha terminado
    if (parejasEncontradas === 10) { // 10 pares en total
        juegosGanados++;
        actualizarJuegosGanados();
        otorgarMedalla(juegosGanados); // Otorgar medalla según los juegos ganados
        alert('¡Felicidades! Has ganado el juego. 🎉');
    }
}

// Desvoltear las tarjetas si no son pareja
function desvoltearTarjetas() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip'); // Eliminar la clase flip
        secondCard.classList.remove('flip'); // Eliminar la clase flip
        resetearTablero();
    }, 1000);
}

// Resetear el tablero para el siguiente intento
function resetearTablero() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Actualizar la puntuación de parejas encontradas
function actualizarPuntuacion() {
    const puntuacionElemento = document.getElementById('puntuacion');
    puntuacionElemento.textContent = `Parejas encontradas: ${parejasEncontradas}`;
}

// Actualizar los intentos fallidos
function actualizarIntentosFallidos() {
    const intentosElemento = document.getElementById('intentosFallidos');
    intentosElemento.textContent = `Intentos fallidos: ${intentosFallidos}`;
}

// Actualizar los juegos ganados
function actualizarJuegosGanados() {
    const juegosGanadosElemento = document.getElementById('juegosGanados');
    juegosGanadosElemento.textContent = `Juegos ganados: ${juegosGanados}`;
}

// Función para otorgar medallas según los juegos ganados
function otorgarMedalla(juegosGanados) {
    if (juegosGanados >= 20) {
        const medallasGanadasOro = Math.floor(juegosGanados / 20); // 1 medalla de oro por cada 20 juegos ganados
        medallasOro += medallasGanadasOro;
        alert(`¡Felicidades! Has ganado ${medallasGanadasOro} Corona(s) de Oro 👑`);
    }
    
    if (juegosGanados >= 10) {
        const medallasGanadasPlata = Math.floor(juegosGanados / 10); // 1 medalla de plata por cada 10 juegos ganados
        medallasPlata += medallasGanadasPlata;
        alert(`¡Muy bien! Has ganado ${medallasGanadasPlata} Trofeo(s) de Plata 🏆`);
    }
    
    if (juegosGanados >= 5) {
        const medallasGanadasBronce = Math.floor(juegosGanados / 5); // 1 medalla de bronce por cada 5 juegos ganados
        medallasBronce += medallasGanadasBronce;
        alert(`¡Lo hiciste bien! Has ganado ${medallasGanadasBronce} Estrella(s) de Bronce ⭐️`);
    }
    
    actualizarRecompensas();
}

// Función para actualizar las recompensas
function actualizarRecompensas() {
    document.getElementById('medallasOro').textContent = medallasOro;
    document.getElementById('medallasPlata').textContent = medallasPlata;
    document.getElementById('medallasBronce').textContent = medallasBronce;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    lockBoard = false; // Asegúrate de desbloquear el tablero
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
    iniciarJuegoParejas(); // Reiniciar el juego con una nueva mezcla
}
