// ─── GRUPOS DE ASESORES ───────────────────────────────────────────────
const asesores = [
  { nombre: 'Valeria',       url: 'https://chat.whatsapp.com/HsDlixITf5t3zeCCRQRG8j' },
  { nombre: 'Cristian',      url: 'https://chat.whatsapp.com/KM9d3OGUbgJL29Fu2fmuz4' },
  { nombre: 'Erika Vásquez', url: 'https://chat.whatsapp.com/HA4CUZP1uJcHTsj3FIexlr' },
  { nombre: 'Stefany',       url: 'https://chat.whatsapp.com/FoIKbYL79TvL6pmWCralx5' },
];

exports.handler = async function (event, context) {
  let nombre, url, metodo;

  try {
    const { getStore } = require('@netlify/blobs');
    const store = getStore({ name: 'rotador-ilm', consistency: 'strong' });

    let idx = await store.get('contador', { type: 'json' });
    if (idx === null || idx === undefined || typeof idx !== 'number') idx = 0;

    const asesor = asesores[idx % asesores.length];
    await store.setJSON('contador', (idx + 1) % asesores.length);

    nombre = asesor.nombre;
    url = asesor.url;
    metodo = 'blobs';
  } catch (err) {
    const idx = Math.floor(Math.floor(Date.now() / 1000) / 3) % asesores.length;
    const asesor = asesores[idx];
    nombre = asesor.nombre;
    url = asesor.url;
    metodo = 'tiempo-fallback';
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ nombre, url, metodo }),
  };
};
