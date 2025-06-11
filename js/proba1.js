// js/proba1.js

export function iniciarXogoOrdenarLetras() {
    let palabras = [];
    let palabraActual = 0;
    let secreta = "";
    let seleccionada = null;
    let dragSrc = null;
  
    const comprobarPalabraDebounced = debounce(comprobarPalabra, 300);
  
    fetch("data/proba1.json")
      .then(res => res.json())
      .then(data => {
        palabras = data;
        mostrarPalabra();
      });
  
    function mostrarPalabra() {
      const { definicion, palabra } = palabras[palabraActual];
      document.getElementById("definicion").textContent = definicion;
      const letrasContedor = document.getElementById("letras");
      const resultadoEl = document.getElementById("resultado");
  
      letrasContedor.innerHTML = "";
      resultadoEl.textContent = "";
      seleccionada = null;
  
      const letras = palabra.toUpperCase().split('').sort(() => Math.random() - 0.5);
      letras.forEach(letra => {
        const span = document.createElement("span");
        span.className = "letra";
        span.textContent = letra;
  
        if (isMobile()) {
          activarIntercambioToque(span);
        } else {
          span.draggable = true;
          span.addEventListener("dragstart", dragStart);
          span.addEventListener("dragover", dragOver);
          span.addEventListener("drop", drop);
        }
  
        letrasContedor.appendChild(span);
      });
  
      ajustarTamanoLetras(palabra);
    }
  
    function ajustarTamanoLetras(palabra) {
      const letras = document.querySelectorAll(".letra");
      const size = palabra.length >= 9 ? "1rem" : palabra.length >= 6 ? "1.3rem" : "1.6rem";
      letras.forEach(l => l.style.fontSize = size);
    }
  
    function activarIntercambioToque(el) {
      el.addEventListener("click", () => {
        if (!seleccionada) {
          seleccionada = el;
          el.classList.add("seleccionada");
        } else if (seleccionada === el) {
          el.classList.remove("seleccionada");
          seleccionada = null;
        } else {
          const temp = seleccionada.textContent;
          seleccionada.textContent = el.textContent;
          el.textContent = temp;
  
          seleccionada.classList.remove("seleccionada");
          el.classList.add("acierto");
          setTimeout(() => el.classList.remove("acierto"), 300);
  
          seleccionada = null;
          comprobarPalabraDebounced();
        }
      });
    }
  
    function dragStart(e) {
      dragSrc = e.target;
      e.dataTransfer.setData("text/plain", e.target.textContent);
      e.target.classList.add("dragging");
      reproducirSon("drag-sound");
    }
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function drop(e) {
      e.preventDefault();
      const el1 = dragSrc;
      const el2 = e.target;
      if (el1 !== el2) {
        [el1.textContent, el2.textContent] = [el2.textContent, el1.textContent];
        el2.classList.add("acierto");
        setTimeout(() => el2.classList.remove("acierto"), 300);
        reproducirSon("drag-sound");
        comprobarPalabraDebounced();
      }
      el1.classList.remove("dragging");
    }
  
    function comprobarPalabra() {
      const letras = document.querySelectorAll("#letras .letra");
      const resposta = Array.from(letras).map(el => el.textContent).join("");
      const correcta = palabras[palabraActual].palabra.toUpperCase();
  
      letras.forEach((letra, i) => {
        if (letra.textContent === correcta[i]) {
          letra.classList.add("correcta");
          letra.setAttribute("draggable", false);
        } else {
          letra.classList.remove("correcta");
          letra.setAttribute("draggable", true);
        }
      });
  
      if (resposta === correcta) {
        reproducirSon("success-sound");
        document.getElementById("resultado").textContent = "✅ Ben feito!";
        document.getElementById("letras").classList.add("acierto");
  
        const letra = correcta[0];
        secreta += letra;
        document.getElementById("secreta").textContent = secreta;
  
        setTimeout(() => {
          document.getElementById("letras").classList.remove("acierto");
          document.getElementById("resultado").textContent = "";
          palabraActual++;
          if (palabraActual < palabras.length) {
            mostrarPalabra();
          } else {
            document.getElementById("resultado").textContent = "🎉 Proba completada!";
          }
        }, 1000);
      }
    }
  
    function reproducirSon(id) {
      const son = document.getElementById(id);
      if (son && typeof son.play === "function") {
        try {
          son.play().catch(() => {});
        } catch (e) {}
      }
    }
  
    function debounce(func, delay = 200) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    }
  
    function isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
  }

