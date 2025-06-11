// main.js - router principal da SPA

// Importar scripts específicos de cada proba
definirRutas();

function definirRutas() {
  const rutas = {
    'portada': {
      plantilla: 'vistas/portada.html'    
    },
    'portada-proba1': {
      plantilla: 'vistas/portada-proba1.html',
      despoisDeCargar: () => {
        document.getElementById("btnComezar").onclick = () => navegar("proba1");
      }
    },
    'proba1': {
      plantilla: 'vistas/proba1.html',
      css: 'css/proba1.css',
      despoisDeCargar: async () => {
        cargarEstiloVista("css/proba1.css");
        const modulo = await import("./proba1.js");
        modulo.iniciarXogoOrdenarLetras();
      }
    },
    'portada-proba2': {
      plantilla: 'vistas/portada-proba2.html',
      despoisDeCargar: () => {
        document.getElementById("btnComezar").onclick = () => navegar("proba2");
      }
    },
    'proba2': {
      plantilla: 'vistas/proba2.html',
      css: 'css/proba2.css',
      despoisDeCargar: async () => {
        cargarEstiloVista("css/proba2.css");
        const modulo = await import("./proba2.js");
        modulo.iniciarTrivial();
      }
    },
    'portada-proba3': {
      plantilla: 'vistas/portada-proba3.html',
      despoisDeCargar: () => {
        document.getElementById("btnComezar").onclick = () => navegar("proba3");
      }
    },
    'proba3': {
      plantilla: 'vistas/proba3.html',
      css: 'css/proba3.css',
      despoisDeCargar: async () => {
        cargarEstiloVista("css/proba3.css");
        const modulo = await import("./proba3.js");
        modulo.iniciarMemoria();
      }
    },
    'portada-proba4': {
      plantilla: 'vistas/portada-proba4.html',
      despoisDeCargar: () => {
        document.getElementById("btnComezar").onclick = () => navegar("proba4");
      }
    },
    'proba4': {
      plantilla: 'vistas/proba4.html',
      css: 'css/proba4.css',
      despoisDeCargar: async () => {
        cargarEstiloVista("css/proba4.css");
        const modulo = await import("./proba4.js");
        modulo.iniciarProba4();
      }
    },
    'portada-proba5': {
      plantilla: 'vistas/portada-proba5.html',
      despoisDeCargar: () => {
        document.getElementById("btnComezar").onclick = () => navegar("proba5");
      }
    },
    'proba5': {
      plantilla: 'vistas/proba5.html',
      css: 'css/proba5.css',
      despoisDeCargar: async () => {
        cargarEstiloVista("css/proba5.css");
        const modulo = await import("./proba5.js");
        modulo.iniciarProba5();
      }
    },
    'portada-proba6': {
      plantilla: 'vistas/portada-proba6.html',
      despoisDeCargar: () => {
        document.getElementById("btnComezar").onclick = () => navegar("proba6");
      }
    },
    'proba6': {
      plantilla: 'vistas/proba6.html',
      css: 'css/proba6.css',
      despoisDeCargar: async () => {
        cargarEstiloVista("css/proba6.css");
        const modulo = await import("./proba6.js");
        modulo.iniciarProba6();
      }
    },
    'portada-proba7': {
      plantilla: 'vistas/portada-proba7.html',
      despoisDeCargar: () => {
        document.getElementById("btnComezar").onclick = () => navegar("proba7");
      }
    },
    'proba7': {
      plantilla: 'vistas/proba7.html',
      css: 'css/proba7.css',
      despoisDeCargar: async () => {
        cargarEstiloVista("css/proba7.css");
        const modulo = await import("./proba7.js");
        modulo.iniciarProba7();
      }
    }
  };

  window.router = { rutas };
}

function obterVista() {
  const params = new URLSearchParams(window.location.search);
  return params.get("vista") || "portada";
}

function navegar(vista) {
  history.pushState({}, "", `?vista=${vista}`);
  cargarVista(vista);
}

async function cargarVista(vista) {
  const app = document.getElementById("app");
  const ruta = window.router.rutas[vista];

  if (!ruta) {
    app.innerHTML = `<p>Vista non atopada: ${vista}</p>`;
    return;
  }

  try {
    const resposta = await fetch(ruta.plantilla);
    const html = await resposta.text();
    app.innerHTML = html;
    if (ruta.despoisDeCargar) ruta.despoisDeCargar();
  } catch (erro) {
    app.innerHTML = `<p>Erro ao cargar a vista: ${vista}</p>`;
  }
}

function cargarEstiloVista(cssPath) {
  const linkId = "estilo-vista";
  let antigo = document.getElementById(linkId);
  if (antigo) antigo.remove();

  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = cssPath;
  document.head.appendChild(link);
}

window.addEventListener("popstate", () => {
  cargarVista(obterVista());
});

document.addEventListener("DOMContentLoaded", () => {
  cargarVista(obterVista());
});