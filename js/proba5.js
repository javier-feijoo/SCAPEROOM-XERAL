// js/proba5.js — Adaptado para intercambio por selección e clic con mensaxes de erro visibles

export function iniciarProba5() {
    let preguntas = [];
    let indice = 0;
    let letrasDescubertas = [];
    let seleccionada = null;
  
    const xogo = document.getElementById("xogo");
    const btnComprobar = document.getElementById("btnComprobar");
    const pantallaInicio = document.getElementById("pantallaInicio");
    const letrasContedor = document.getElementById("letrasDescubertas");
    const claveFinal = document.getElementById("claveFinal");
  
    pantallaInicio.style.display = "none";
    xogo.style.display = "block";
    btnComprobar.style.display = "inline-block";
  
    fetch("data/proba5.json")
      .then(res => res.json())
      .then(data => {
        preguntas = data.sort(() => Math.random() - 0.5);
        mostrarPregunta();
      });
  
    function mostrarPregunta() {
      seleccionada = null; // Reset da selección ao cargar nova pregunta
      const p = preguntas[indice];
      xogo.innerHTML = `
        <div class='pregunta-box'>
          <h5>${p.pregunta}</h5>
          <ul class='feitos' id='listaFeitos'>
            ${p.feitos.sort(() => Math.random() - 0.5).map(f => `<li>${f}</li>`).join("")}
          </ul>
          <div id='mensaxeErro' class='erro-mensaxe'></div>
        </div>
      `;
  
      const items = document.querySelectorAll('#listaFeitos li');
      items.forEach(item => {
        item.addEventListener('click', () => seleccionarCarta(item));
      });
    }
  
    function seleccionarCarta(carta) {
      if (!seleccionada) {
        seleccionada = carta;
        carta.classList.add("seleccionada");
      } else {
        const temp = seleccionada.textContent;
        seleccionada.textContent = carta.textContent;
        carta.textContent = temp;
  
        seleccionada.classList.remove("seleccionada");
        seleccionada = null;
      }
    }
  
    btnComprobar.onclick = comprobarOrde;
  
    function comprobarOrde() {
      const p = preguntas[indice];
      const itens = document.querySelectorAll('#listaFeitos li');
      let ben = true;
      let intentos = parseInt(itens[0].getAttribute('data-intentos') || '0');
      intentos++;
      itens.forEach(el => el.setAttribute('data-intentos', intentos));
  
      const mensaxeErro = document.getElementById('mensaxeErro');
      mensaxeErro.textContent = "";
  
      // Comprobar orde sempre
      itens.forEach((el, i) => {
        if (el.textContent !== p.ordeCorrecta[i]) {
          ben = false;
        }
      });
  
      if (ben) {
        itens.forEach(el => {
          el.classList.remove("erro");
          el.classList.add("correcto");
        });
        reproducirSon("successSound");
        letrasDescubertas.push(atob(p.letraCodificada));
        indice++;
        actualizarLetrasDescubertas();
        if (indice < preguntas.length) {
          setTimeout(mostrarPregunta, 2000);
        } else {
          setTimeout(() => {
            xogo.innerHTML = "✅ Completaches todas as ordes!";
            claveFinal.textContent = "🔐 Clave descuberta: " + letrasDescubertas.join("");
            letrasContedor.textContent = "🔎 Letras atopadas: " + letrasDescubertas.join(" ");
          }, 2000);
        }
      } else {
        if (intentos <= 2) {
          mensaxeErro.textContent = "❌ Non é correcto, inténtao de novo.";
        } else {
          itens.forEach((el, i) => {
            if (el.textContent === p.ordeCorrecta[i]) {
              el.classList.remove("erro");
              el.classList.add("correcto");
            } else {
              el.classList.remove("correcto");
              el.classList.add("erro");
            }
          });
          mensaxeErro.textContent = "❌ Non é correcto, revisa as posicións marcadas.";
        }
      }
    }
  
    function actualizarLetrasDescubertas() {
      letrasContedor.textContent = "🔎 Letras atopadas: " + letrasDescubertas.join(" ");
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
  