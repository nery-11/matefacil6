// Variables globales para el conteo de respuestas correctas e incorrectas
let correctas = 0;
let incorrectas = 0;

// Colores en el orden del arcoíris fijos para cada número
const coloresArcoiris = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF', '#FF1493', '#00CED1'
];

// Función para iniciar el juego de conteo y rompecabezas
window.onload = function () {
    iniciarJuegoConteo();
};

function iniciarJuegoConteo() {
    const contenidoJuego = document.getElementById('contenidoJuego');
    contenidoJuego.innerHTML = ''; // Limpiar el contenido anterior

    // Generar una serie de números del 1 al 9
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Mezclar los números para crear el rompecabezas
    const numerosMezclados = [...numeros].sort(() => Math.random() - 0.5);

    const contenedorRompecabezas = document.createElement('div');
    contenedorRompecabezas.className = 'puzzle-container';

    numerosMezclados.forEach((numero, index) => {
        const pieza = document.createElement('div');
        pieza.className = 'puzzle-piece';
        pieza.textContent = numero;
        pieza.style.backgroundColor = coloresArcoiris[numero - 1];
        pieza.draggable = true;
        pieza.dataset.index = index;

        pieza.ondragstart = (event) => {
            event.dataTransfer.setData('text/plain', event.target.dataset.index);
        };

        pieza.ondragover = (event) => {
            event.preventDefault();
        };

        pieza.ondrop = (event) => {
            event.preventDefault();
            const origenIndex = event.dataTransfer.getData('text/plain');
            const destinoIndex = event.target.dataset.index;

            intercambiarPiezasConteo(origenIndex, destinoIndex);
        };

        contenedorRompecabezas.appendChild(pieza);
    });

    contenidoJuego.appendChild(contenedorRompecabezas);
}

// Función para intercambiar piezas en el juego de conteo
function intercambiarPiezasConteo(origenIndex, destinoIndex) {
    const contenedorRompecabezas = document.querySelector('.puzzle-container');
    const piezas = Array.from(contenedorRompecabezas.children);

    const origenElemento = piezas[origenIndex];
    const destinoElemento = piezas[destinoIndex];

    if (!origenElemento || !destinoElemento) return; // Verificar existencia

    // Intercambiar posiciones en el DOM
    if (origenIndex > destinoIndex) {
        contenedorRompecabezas.insertBefore(origenElemento, destinoElemento);
    } else {
        contenedorRompecabezas.insertBefore(origenElemento, destinoElemento.nextSibling);
    }

    // Actualizar dataset.index de las piezas
    actualizarIndicesPiezas();

    // Verificar si el rompecabezas está resuelto
    verificarRompecabezasConteo();
}

// Actualizar índices de piezas
function actualizarIndicesPiezas() {
    const piezas = document.querySelectorAll('.puzzle-piece');
    piezas.forEach((pieza, index) => {
        pieza.dataset.index = index;
    });
}

// Verificar si el rompecabezas está resuelto
function verificarRompecabezasConteo() {
    const piezas = document.querySelectorAll('.puzzle-piece');
    let correcto = true;

    piezas.forEach((pieza, index) => {
        const numero = parseInt(pieza.textContent);
        if (numero !== index + 1) {
            correcto = false;
        }
    });

    if (correcto) {
        correctas++;
        actualizarPuntuacion();
        alert('¡Excelente! Has ordenado los números correctamente. 🎉');
        otorgarMedalla(correctas); // Otorgar medalla según los aciertos
        guardarMedallas(); // Guardar las medallas en el localStorage
    }
}

// Función para actualizar la puntuación
function actualizarPuntuacion() {
    const puntuacionElemento = document.getElementById('puntuacion');
    puntuacionElemento.textContent = `Correctas: ${correctas} | Incorrectas: ${incorrectas}`;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    correctas = 0; // Restablecer las puntuaciones si lo deseas
    incorrectas = 0;
    actualizarPuntuacion(); // Actualizar la pantalla con el reset
    iniciarJuegoConteo(); // Reiniciar el juego correctamente
}

// Función para otorgar medallas
function otorgarMedalla(aciertos) {
    if (aciertos >= 20) {
        const medallasGanadasOro = Math.floor(aciertos / 20); // 1 medalla de oro por cada 20 aciertos
        medallasOro += medallasGanadasOro;
        alert(`¡Felicidades! Has ganado ${medallasGanadasOro} Corona(s) de Oro 👑`);
    }
    
    if (aciertos >= 10) {
        const medallasGanadasPlata = Math.floor(aciertos / 10); // 1 medalla de plata por cada 10 aciertos
        medallasPlata += medallasGanadasPlata;
        alert(`¡Muy bien! Has ganado ${medallasGanadasPlata} Trofeo(s) de Plata 🏆`);
    }
    
    if (aciertos >= 5) {
        const medallasGanadasBronce = Math.floor(aciertos / 5); // 1 medalla de bronce por cada 5 aciertos
        medallasBronce += medallasGanadasBronce;
        alert(`¡Lo hiciste bien! Has ganado ${medallasGanadasBronce} Estrella(s) de Bronce ⭐️`);
    }
    
    actualizarRecompensas();
}

// Función para guardar medallas en el localStorage
function guardarMedallas() {
    localStorage.setItem('medallasOro', medallasOro);
    localStorage.setItem('medallasPlata', medallasPlata);
    localStorage.setItem('medallasBronce', medallasBronce);
}
