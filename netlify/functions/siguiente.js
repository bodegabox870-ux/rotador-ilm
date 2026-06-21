// ─── ASESORES (chat directo 1 a 1 con mensaje precargado) ─────────────
const mensaje = encodeURIComponent('Quiero emprender con tenis y perfumes.');

const asesores = [
  { nombre: 'Bayron',        numero: '573182245322' },
  { nombre: 'Yirley',        numero: '573205209764' },
  { nombre: 'María Paula',   numero: '573183718288' },
  { nombre: 'Stiven M',      numero: '573204806689' },
  { nombre: 'Marvin',        numero: '573218148879' },
  { nombre: 'Stefany',       numero: '573168859774' },
  { nombre: 'Erika Vásquez', numero: '573023853506' },
  { nombre: 'Roxana',        numero: '573169100926' },
  { nombre: 'Angie',         numero: '573159666579' },
  { nombre: 'Valentina',     numero: '573178811765' },
  { nombre: 'Evelyn',        numero: '573135233752' },
  { nombre: 'Cristian',      numero: '573169217805' },
  { nombre: 'Andrew',        numero: '573218190420' },
  { nombre: 'Yuliana',       numero: '573115946647' },
  { nombre: 'Juan Andrés',   numero: '573169990613' },
  { nombre: 'Valeria',       numero: '573137394278' },
  { nombre: 'Natalia',       numero: '573103907940' },
];

function construirUrl(numero) {
  return `https://wa.me/${numero}?text=${mensaje}`;
}

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

    const asesor = asesores[idx % asesores.length];
    const siguienteIdx = (idx + 1) % asesores.length;
    await store.setJSON('contador', siguienteIdx);

    nombre = asesor.nombre;
    url = construirUrl(asesor.numero);
    metodo = 'blobs';
  } catch (err) {
    // ── Fallback: rotación basada en el tiempo del servidor ──
    const segundosDesdeEpoch = Math.floor(Date.now() / 1000);
    const idx = Math.floor(segundosDesdeEpoch / 3) % asesores.length;
    const asesor = asesores[idx];

    nombre = asesor.nombre;
    url = construirUrl(asesor.numero);
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
