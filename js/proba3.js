export function iniciarMemoria() {
    const numCartas = 8;
    const imaxes = Array.from({ length: numCartas }, (_, i) => `assets/proba3/imagen${i + 1}.png`);
    const pares = [...imaxes, ...imaxes];
    const taboleiro = document.getElementById('taboleiro');
    let seleccionadas = [];
    let descubertas = 0;
    const claveCodificada = [76, 79, 86, 69, 76, 65, 67, 69]; // ASCII de LOVELACE
    let claveActual = [];
  
    mesturar(pares);
    crearTaboleiro();
  
    function mesturar(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    function crearTaboleiro() {
      taboleiro.innerHTML = "";
      pares.forEach((src, index) => {
        const div = document.createElement('div');
        div.classList.add('carta');
        div.dataset.imaxe = src;
        div.dataset.index = index;
  
        const img = document.createElement('img');
        img.src = src;
        div.appendChild(img);
  
        div.onclick = () => seleccionar(div);
        taboleiro.appendChild(div);
      });
    }
  
    function seleccionar(carta) {
      if (carta.classList.contains('revelada') || seleccionadas.length === 2) return;
  
      carta.classList.add('revelada');
      seleccionadas.push(carta);
  
      if (seleccionadas.length === 2) {
        const [c1, c2] = seleccionadas;
        if (c1.dataset.imaxe === c2.dataset.imaxe && c1 !== c2) {
          descubertas++;
          reproducirSon("acerto-sound");
  
          if (descubertas <= claveCodificada.length) {
            const letra = String.fromCharCode(claveCodificada[descubertas - 1]);
            claveActual.push(letra);
            document.getElementById('secreto').textContent = '🔐 Código parcial: ' + claveActual.join('');
          }
          if (descubertas === numCartas) {
            document.getElementById('secreto').textContent = '🎉 Código completo: ' + claveActual.join('');
          }
          seleccionadas = [];
        } else {
          setTimeout(() => {
            seleccionadas.forEach(c => c.classList.remove('revelada'));
            seleccionadas = [];
          }, 700);
        }
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
  }
  