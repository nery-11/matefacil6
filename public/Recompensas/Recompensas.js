let respuestas = [];
let operacionActual = {};
let pecesAtrapados = 0;
let erroresCometidos = 0;

// Variables globales para almacenar las medallas
let medallasOro = 0;
let medallasPlata = 0;
let medallasBronce = 0;

// Almacenar las medallas en el localStorage
function guardarMedallas() {
    localStorage.setItem('medallasOro', medallasOro);
    localStorage.setItem('medallasPlata', medallasPlata);
    localStorage.setItem('medallasBronce', medallasBronce);
}

// Recuperar las medallas del localStorage
function cargarMedallas() {
    medallasOro = parseInt(localStorage.getItem('medallasOro')) || 0;
    medallasPlata = parseInt(localStorage.getItem('medallasPlata')) || 0;
    medallasBronce = parseInt(localStorage.getItem('medallasBronce')) || 0;
}

// Actualizar el conteo de medallas en la página de recompensas
function actualizarRecompensas() {
    document.getElementById('medallasOro').textContent = medallasOro;
    document.getElementById('medallasPlata').textContent = medallasPlata;
    document.getElementById('medallasBronce').textContent = medallasBronce;
}

// Otorgar medallas en función de los aciertos
function otorgarMedalla(aciertos) {
    if (aciertos >= 20) {
        const medallasGanadasOro = Math.floor(aciertos / 20);
        medallasOro += medallasGanadasOro;
        alert(`¡Felicidades! Has ganado ${medallasGanadasOro} Corona(s) de Oro 👑`);
    }
    if (aciertos >= 10) {
        const medallasGanadasPlata = Math.floor(aciertos / 10);
        medallasPlata += medallasGanadasPlata;
        alert(`¡Muy bien! Has ganado ${medallasGanadasPlata} Trofeo(s) de Plata 🏆`);
    }
    if (aciertos >= 5) {
        const medallasGanadasBronce = Math.floor(aciertos / 5);
        medallasBronce += medallasGanadasBronce;
        alert(`¡Lo hiciste bien! Has ganado ${medallasGanadasBronce} Estrella(s) de Bronce ⭐️`);
    }

    guardarMedallas(); // Guardar las medallas en localStorage
    actualizarRecompensas(); // Actualizar la interfaz
}

function generarOperacion() {
    let num1, num2;
    do {
        num1 = Math.floor(Math.random() * 90) + 10;
        num2 = Math.floor(Math.random() * 9) + 1;
    } while (num1 % num2 !== 0);
    const resultado = Math.floor(num1 / num2);
    operacionActual = { num1, num2, resultado };
    document.getElementById('operacion').textContent = `${num1} ÷ ${num2}`;
    return resultado;
}

function generarJuego() {
    respuestas = [];
    pecesAtrapados = 0;
    erroresCometidos = 0;
    document.getElementById('mensaje').textContent = "";
    document.getElementById('pez-counter').textContent = `Peces atrapados: ${pecesAtrapados}`;
    document.getElementById('errores-counter').textContent = `Errores cometidos: ${erroresCometidos}`;

    generarPeces();
}

function generarPeces() {
    const resultadoCorrecto = generarOperacion();

    const cuadros = [
        document.getElementById('cuadro-1'),
        document.getElementById('cuadro-2'),
        document.getElementById('cuadro-3'),
        document.getElementById('cuadro-4')
    ];

    const posicionCorrecta = Math.floor(Math.random() * 4);

    cuadros.forEach((cuadro, index) => {
        let respuesta;
        if (index === posicionCorrecta) {
            respuesta = resultadoCorrecto;
        } else {
            do {
                respuesta = Math.floor(Math.random() * 100) + 1;
            } while (respuesta === resultadoCorrecto);
        }
        cuadro.textContent = respuesta;
        cuadro.onclick = () => verificarRespuesta(respuesta, cuadro);
    });
}

function verificarRespuesta(respuesta, cuadro) {
    if (respuesta === operacionActual.resultado) {
        pecesAtrapados++;
        document.getElementById('pez-counter').textContent = `Peces atrapados: ${pecesAtrapados}`;
        
        // Llamar a la función otorgarMedalla cuando se atrapan peces
        otorgarMedalla(pecesAtrapados);

        generarPeces();
    } else {
        erroresCometidos++;
        document.getElementById('errores-counter').textContent = `Errores cometidos: ${erroresCometidos}`;
        if (erroresCometidos >= 5) {
            document.getElementById('mensaje').textContent = "¡Perdiste! Demasiados errores.";
            desactivarCuadros();
        }
    }
}

function desactivarCuadros() {
    const cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
        cuadro.onclick = null;
    });
}

function reiniciarJuego() {
    generarJuego();
}

generarJuego();
