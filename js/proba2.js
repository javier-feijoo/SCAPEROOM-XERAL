export function iniciarTrivial() {
    let preguntas = [];
    let actual = 0;
    let codigo = [];
  
    fetch("data/proba2.json")
      .then(res => res.json())
      .then(data => {
        preguntas = data.sort(() => Math.random() - 0.5);
        mostrarPregunta();
      });
  
    function mostrarPregunta() {
      const p = preguntas[actual];
      document.getElementById("pregunta").textContent = p.pregunta;
  
      const contedor = document.getElementById("opciones");
      contedor.innerHTML = "";
  
      p.opciones.forEach((opcion, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcion;
        btn.classList.add("opcion-btn");
        btn.onclick = () => verificar(index);
        contedor.appendChild(btn);
      });
    }
  
    function verificar(seleccionada) {
      const correcta = preguntas[actual].correcta;
      const resultado = document.getElementById("resultado");
  
      if (seleccionada === correcta) {
        const letra = atob(preguntas[actual].letraCodificada);
        codigo.push(letra);
        resultado.textContent = "✅ Correcto!";
        resultado.style.color = "green";
        actual++;
  
        if (actual < preguntas.length) {
          setTimeout(() => {
            resultado.textContent = "";
            mostrarPregunta();
          }, 800);
        } else {
          document.getElementById("pregunta").textContent = "🎉 Trivial completado!";
          document.getElementById("opciones").innerHTML = "<p>Agora tenta descifrar o código secreto formado polas letras desordenadas.</p>";
        }
  
        document.getElementById("secreta").textContent = codigo.join("");
      } else {
        resultado.textContent = "❌ Incorrecto. Inténtao de novo.";
        resultado.style.color = "red";
      }
    }
  }
  