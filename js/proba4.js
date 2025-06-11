// js/proba4.js — Nivel avanzado con subredes máis complexas

export function iniciarProba4() {
    const codificada = ['78', '69', '84', '69']; // ASCII de N-E-T-E
    let completadas = [false, false, false, false];
    let letras = ['', '', '', ''];
  
    window.verificarIP = function (n, red, cidr, hostNumber) {
      const input = document.getElementById('ip' + n);
      const result = document.getElementById('res' + n);
  
      const redInt = ipToInt(red);
      const totalHosts = Math.pow(2, 32 - cidr);
      const broadcastInt = redInt + totalHosts - 1;
  
      const respostaInt = redInt + hostNumber;
  
      if (respostaInt === redInt || respostaInt === broadcastInt) {
        result.innerHTML = '❌ Non podes usar nin a IP da rede nin a de broadcast.';
        return;
      }
  
      const respostaCorrecta = intToIp(respostaInt);
  
      if (input.value.trim() === respostaCorrecta) {
        const letra = String.fromCharCode(parseInt(codificada[n - 1]));
        letras[n - 1] = letra;
        result.innerHTML = `✔️ Correcto. Letra revelada: <strong>${letra}</strong>`;
        completadas[n - 1] = true;
        mostrarClave();
      } else {
        result.innerHTML = '❌ Incorrecto. Inténtao de novo.';
      }
    };
  
    function ipToInt(ip) {
      return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
    }
  
    function intToIp(int) {
      return [
        (int >> 24) & 255,
        (int >> 16) & 255,
        (int >> 8) & 255,
        int & 255
      ].join('.');
    }
  
    function mostrarClave() {
      if (completadas.every(x => x)) {
        const palabra = letras.join('');
        document.getElementById('clave').innerHTML = `🎉 Código secreto: <strong>${palabra}</strong>`;
      }
    }
  } 
  