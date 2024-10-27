function mostrarFraseMotivacional() {
    const frases = [
        "¡Cada paso te acerca a ser más genial!",
        "¡Sigue adelante, estás haciendo un gran trabajo!",
        "¡No te rindas, lo estás logrando!",
        "¡Tu esfuerzo te llevará lejos!",
        "¡Eres una estrella en crecimiento!"
    ];

    const indice = Math.floor(Math.random() * frases.length);
    document.getElementById("fraseMotivacional").textContent = frases[indice];
}

function mostrarHistorias() {
    const historias = [
        "Historia 1: Érase una vez un número llamado 5, que siempre soñaba con ser el más grande de todos...",
        "Historia 2: El número 8 siempre estaba ocupado haciendo vueltas infinitas, hasta que conoció al 0...",
        "Historia 3: El número 9 quería ser perfecto como el 10, hasta que descubrió que ser él mismo era lo mejor."
    ];

    mostrarContenidoExtra(historias, '📖 Historias de Números');
}

function mostrarChistes() {
    const chistes = [
        "Chiste 1: ¿Por qué el 6 tiene miedo del 7? Porque 7, 8, 9. 😂",
        "Chiste 2: ¿Qué le dijo el 0 al 8? ¡Bonito cinturón! 😆",
        "Chiste 3: ¿Qué hace una calculadora en la fiesta? ¡Sumando diversión! 🎉"
    ];

    mostrarContenidoExtra(chistes, '😂 Chistes de Números');
}

function mostrarCantos() {
    const cantos = [
        {
            titulo: "Canto 1: Un elefante se balanceaba 🎶",
            archivo: "cantos/elefante.mp3" // Ruta de tu archivo
        },
        {
            titulo: "Canto 2: Uno, dos, tres, cuatro, cinco 🎵",
            archivo: "cantos/uno_dos_tres.mp3" // Ruta de tu archivo
        }
    ];

    const contenidoDiv = document.getElementById("contenidoExtra");
    contenidoDiv.style.display = "block";
    contenidoDiv.innerHTML = "<h2>🎶 Cantos con Números</h2>";

    cantos.forEach((canto) => {
        contenidoDiv.innerHTML += `
            <p>${canto.titulo}</p>
            <audio controls>
                <source src="${canto.archivo}" type="audio/mp3">
                Tu navegador no soporta la reproducción de audio.
            </audio>
        `;
    });
}


function mostrarContenidoExtra(arrayContenido, titulo) {
    const contenidoDiv = document.getElementById("contenidoExtra");
    contenidoDiv.style.display = "block";
    contenidoDiv.innerHTML = `<h2>${titulo}</h2>`;
    arrayContenido.forEach((item) => {
        contenidoDiv.innerHTML += `<p>${item}</p>`;
    });
}

function volverInicio() {
    window.location.href = 'index.html'; // Cambia esto según tu estructura de proyecto
}

window.onload = mostrarFraseMotivacional;

