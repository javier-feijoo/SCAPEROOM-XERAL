// js/proba4.js

export function iniciarProba4() {
  const codificadas = [
    293, // IMAN
    290, // LATA
    311  // SILO
  ];

  const progreso = [null, null, null];

  document.querySelectorAll(".comprobar").forEach(btn => {
    btn.addEventListener("click", () => {
      const n = parseInt(btn.dataset.indice);
      const campo = document.getElementById(`res${n}`);
      const resposta = limparTexto(campo.value);
      const msg = document.getElementById(`msg${n}`);
      const suma = codificar(resposta);

      if (suma === codificadas[n - 1]) {
        msg.textContent = `✅ Correcto: ${resposta}`;
        msg.className = "resultado correcto";
        campo.disabled = true;
        btn.disabled = true;
        progreso[n - 1] = resposta;

        if (n < 3) {
          document.getElementById(`xer${n + 1}`).style.display = "block";
        } else {
          mostrarClave();
        }
      } else {
        msg.textContent = "❌ Incorrecto, proba de novo.";
        msg.className = "resultado erro";
      }
    });
  });

  function mostrarClave() {
    const texto = progreso.map(p => p.toUpperCase()).join(" ");
    document.getElementById("claveTexto").textContent = texto;
    document.getElementById("claveFinal").style.display = "block";
  }

  function codificar(str) {
    return Array.from(str).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  }

  function limparTexto(input) {
    return input
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toUpperCase();
  }
}
