let tiempoRestante = 30; // 30 segundos
let timerInterval;
let aciertos = 0;
let fallos = 0; // Contador de errores
const limiteFallos = 5; // Limite máximo de fallos

const imagenes = {
    pez: 'https://thumbs.dreamstime.com/z/vector-de-clipart-pez-payaso-dibujos-animados-cartograf%C3%ADa-payasos-portador-aislado-en-fondo-blanco-273981119.jpg?w=768',
    ovni: 'https://img.freepik.com/vector-premium/ovni-nave-espacial-extraterrestre-dibujos-animados-nave-cosmica-forma-platillo_184733-79.jpg?w=740'
};

function iniciarPrueba() {
    document.getElementById('comenzar').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    aciertos = 0;
    fallos = 0;
    tiempoRestante = 30;
    document.getElementById('cronometro').textContent = `Tiempo: ${tiempoRestante}s`;

    generarObjeto(); // Generar la primera pregunta

    timerInterval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('cronometro').textContent = `Tiempo: ${tiempoRestante}s`;
        if (tiempoRestante === 0) {
            clearInterval(timerInterval);
            finalizarPrueba();
        }
    }, 1000);
}

function generarObjeto() {
    if (fallos >= limiteFallos) {
        finalizarPrueba(); // Terminar el juego si se alcanza el límite de fallos
        return;
    }

    const imagenDiv = document.getElementById('imagen');
    imagenDiv.innerHTML = ''; // Limpiar objetos anteriores

    const cantidadPeces = Math.floor(Math.random() * 5) + 1;
    const cantidadOvnis = Math.floor(Math.random() * 5) + 1;

    // Lista de posiciones ya ocupadas
    const posicionesOcupadas = [];

    // Función para verificar si la posición es válida
    function esPosicionValida(nuevaPos) {
        for (let pos of posicionesOcupadas) {
            const distancia = Math.sqrt(Math.pow(nuevaPos.left - pos.left, 2) + Math.pow(nuevaPos.top - pos.top, 2));
            if (distancia < 60) { // Asegurarse que haya una distancia mínima de 60px
                return false;
            }
        }
        return true;
    }

    // Función para generar posiciones aleatorias no superpuestas
    function generarPosicionAleatoria() {
        let left, top, nuevaPos;
        do {
            left = Math.random() * 300; // Espacio dentro del cuadro
            top = Math.random() * 200;
            nuevaPos = { left, top };
        } while (!esPosicionValida(nuevaPos));
        posicionesOcupadas.push(nuevaPos); // Añadir posición a la lista de ocupadas
        return nuevaPos;
    }

    // Generar peces
    for (let i = 0; i < cantidadPeces; i++) {
        const pez = document.createElement('div');
        pez.classList.add('objeto');
        pez.style.backgroundImage = `url(${imagenes.pez})`;
        const posicion = generarPosicionAleatoria();
        pez.style.left = `${posicion.left}px`;
        pez.style.top = `${posicion.top}px`;
        imagenDiv.appendChild(pez);
    }

    // Generar ovnis
    for (let i = 0; i < cantidadOvnis; i++) {
        const ovni = document.createElement('div');
        ovni.classList.add('objeto');
        ovni.style.backgroundImage = `url(${imagenes.ovni})`;
        const posicion = generarPosicionAleatoria();
        ovni.style.left = `${posicion.left}px`;
        ovni.style.top = `${posicion.top}px`;
        imagenDiv.appendChild(ovni);
    }

    // Generar opciones (dos incorrectas y una correcta)
    const totalObjetos = cantidadPeces + cantidadOvnis;
    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = ''; // Limpiar opciones anteriores

    const opciones = [
        totalObjetos,
        totalObjetos + Math.floor(Math.random() * 2) + 1,
        totalObjetos - Math.floor(Math.random() * 2) - 1
    ].sort(() => Math.random() - 0.5); // Mezclar opciones

    opciones.forEach(opcion => {
        const opcionBtn = document.createElement('div');
        opcionBtn.classList.add('opcion');
        opcionBtn.textContent = opcion;
        opcionBtn.onclick = () => verificarRespuesta(opcion, totalObjetos);
        opcionesDiv.appendChild(opcionBtn);
    });
}

function verificarRespuesta(opcion, totalObjetos) {
    if (opcion === totalObjetos) {
        aciertos++;
        document.getElementById('feedback').textContent = '¡Correcto! 🎉';
    } else {
        fallos++;
        document.getElementById('feedback').textContent = '¡Incorrecto! ❌';

        // Terminar si se alcanza el límite de fallos
        if (fallos >= limiteFallos) {
            finalizarPrueba();
            return;
        }
    }
    generarObjeto(); // Generar el siguiente conjunto de objetos
}

function finalizarPrueba() {
    clearInterval(timerInterval); // Detener el cronómetro

    document.getElementById('imagen').innerHTML = '';
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
