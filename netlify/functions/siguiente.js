// ─── GRUPOS DE ASESORES ───────────────────────────────────────────────
const asesores = [
  { nombre: 'Natalia',     url: 'https://chat.whatsapp.com/CXJ5VNp2nAj2qp8GpgqyKm' },
  { nombre: 'Juan Andrés', url: 'https://chat.whatsapp.com/EVzcCxTtOYJ68oNEgsGV4t' },
  { nombre: 'Angie',       url: 'https://chat.whatsapp.com/Fc4eSG7tdUCIrar0arAcRR' },
  { nombre: 'Evelyn',      url: 'https://chat.whatsapp.com/GuLy0M7aqak6Jg35UF4C7P' },
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
