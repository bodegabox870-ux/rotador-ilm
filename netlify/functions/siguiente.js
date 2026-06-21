// ─── GRUPOS DE ASESORES (links cortos rebrand.ly) ──────────────────────
const grupos = [
  { nombre: 'Bayron',        url: 'https://rebrand.ly/grupobayron' },
  { nombre: 'Yirley',        url: 'https://rebrand.ly/yirley' },
  { nombre: 'María Paula',   url: 'https://rebrand.ly/mapaula' },
  { nombre: 'Stiven M',      url: 'https://rebrand.ly/stivenm' },
  { nombre: 'Marvin',        url: 'https://rebrand.ly/grupomarvin' },
  { nombre: 'Stefany',       url: 'https://rebrand.ly/grupostefany' },
  { nombre: 'Erika Vásquez', url: 'https://rebrand.ly/gruperika' },
  { nombre: 'Roxana',        url: 'https://rebrand.ly/roxanagrupo' },
  { nombre: 'Angie',         url: 'https://rebrand.ly/grupangie' },
  { nombre: 'Valentina',     url: 'https://rebrand.ly/grupovalentina' },
  { nombre: 'Evelyn',        url: 'https://rebrand.ly/grupevelyn' },
  { nombre: 'Cristian',      url: 'https://rebrand.ly/grupcristian' },
  { nombre: 'Andrew',        url: 'https://rebrand.ly/gruoandrew' },
  { nombre: 'Yuliana',       url: 'https://rebrand.ly/grupyuliana' },
  { nombre: 'Juan Andrés',   url: 'https://rebrand.ly/grupandres' },
  { nombre: 'Valeria',       url: 'https://rebrand.ly/grupvaleria' },
  { nombre: 'Natalia',       url: 'https://rebrand.ly/nataliagrup' },
];

exports.handler = async function (event, context) {
  let nombre, url, metodo;

  // ── Intento 1: contador real en Netlify Blobs (ideal: secuencial exacto) ──
  try {
    const { getStore } = require('@netlify/blobs');
    const store = getStore({
      name: 'rotador-ilm',
      consistency: 'strong',
    });

    let idx = await store.get('contador', { type: 'json' });
    if (idx === null || idx === undefined || typeof idx !== 'number') {
      idx = 0;
    }

    const grupo = grupos[idx % grupos.length];
    const siguienteIdx = (idx + 1) % grupos.length;
    await store.setJSON('contador', siguienteIdx);

    nombre = grupo.nombre;
    url = grupo.url;
    metodo = 'blobs';
  } catch (err) {
    // ── Fallback: rotación basada en el tiempo del servidor ──
    const segundosDesdeEpoch = Math.floor(Date.now() / 1000);
    const idx = Math.floor(segundosDesdeEpoch / 3) % grupos.length;
    const grupo = grupos[idx];

    nombre = grupo.nombre;
    url = grupo.url;
    metodo = 'tiempo-fallback:' + String(err.message || err);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify({ nombre, url, metodo }),
  };
};
