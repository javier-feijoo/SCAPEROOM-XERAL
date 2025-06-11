// js/proba6.js — Detecta os cambios, usando estrutura fixa de HTML

export function iniciarProba6() {
    let preguntas = [];
    let indice = 0;
    let letrasDescubertas = [];
    let contadorInterval = null;
  
    fetch("data/proba6.json")
      .then(res => res.json())
      .then(data => {
        preguntas = data.sort(() => Math.random() - 0.5);
        mostrarPregunta();
      });
  
    function mostrarPregunta() {
      resetPantallas();
      iniciarObservacion();
    }
  
    function iniciarObservacion() {
      let tempo = 7;
      const contador = document.getElementById("contadorTempo");
      contador.textContent = tempo;
  
      const faseObservacion = document.getElementById("faseObservacion");
      const imaxeObservacion = document.getElementById("imaxeObservacion");
      imaxeObservacion.src = "assets/proba6/imagen_original.png";
  
      const pregunta = preguntas[indice];
  
      faseObservacion.style.display = "block";
  
      contadorInterval = setInterval(() => {
        tempo--;
        contador.textContent = tempo;
        if (tempo <= 0) {
          clearInterval(contadorInterval);
          iniciarCambio(pregunta);
        }
      }, 1000);
    }
  
    function iniciarCambio(pregunta) {
      document.getElementById("faseObservacion").style.display = "none";
      document.getElementById("pantallaNegra").style.display = "block";
  
      setTimeout(() => {
        document.getElementById("pantallaNegra").style.display = "none";
        document.getElementById("faseResposta").style.display = "block";
  
        const imaxeCambio = document.getElementById("imaxeCambio");
        imaxeCambio.src = "assets/proba6/" + pregunta.imagen; // Cambio correspondente
  
        cargarOpcionCambios(pregunta.opciones, atob(pregunta.letraCodificada), pregunta.respuesta);
      }, 1500);
    }
  
    function cargarOpcionCambios(opciones, letra, respostaCorrecta) {
      const opcionCambios = document.getElementById("opcionCambios");
      opcionCambios.innerHTML = "";
  
      opciones.forEach(opcion => {
        const btn = document.createElement("button");
        btn.classList.add("opcion-cambio-btn");
        btn.textContent = opcion;
        btn.onclick = () => validarResposta(opcion, letra, respostaCorrecta);
        opcionCambios.appendChild(btn);
      });
    }
  
    function validarResposta(opcionSeleccionada, letra, respostaCorrecta) {
      if (opcionSeleccionada === respostaCorrecta) {
        reproducirSon("successSound");
        letrasDescubertas.push(letra);
        actualizarLetras();
        indice++;
        if (indice < preguntas.length) {
          setTimeout(mostrarPregunta, 1500);
        } else {
          finalizarXogo();
        }
      } else {
        alert("❌ Non é correcto, proba outra vez!");
      }
    }
  
    function actualizarLetras() {
      document.getElementById("letrasDescubertas").textContent = "🔎 Letras atopadas: " + letrasDescubertas.join(" ");
    }
  
    function finalizarXogo() {
      document.getElementById("faseObservacion").style.display = "none";
      document.getElementById("pantallaNegra").style.display = "none";
      document.getElementById("faseResposta").style.display = "none";
      document.getElementById("claveFinal").textContent = "🔐 Clave descuberta: " + letrasDescubertas.join("");
    }
  
    function resetPantallas() {
      document.getElementById("faseObservacion").style.display = "none";
      document.getElementById("pantallaNegra").style.display = "none";
      document.getElementById("faseResposta").style.display = "none";
    }
  
    function reproducirSon(id) {
      const son = document.getElementById(id);
      if (son && typeof son.play === "function") {
        try {
          son.play().catch(() => {});
        } catch (e) {}
      }
    }
  }
  