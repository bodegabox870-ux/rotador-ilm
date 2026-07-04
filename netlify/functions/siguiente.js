// ─── GRUPOS DE ASESORES ───────────────────────────────────────────────
const asesores = [
  { nombre: 'Yirley',    url: 'https://chat.whatsapp.com/KOp3TGxKX8XFiusi28WqAy' },
  { nombre: 'Andrew',    url: 'https://chat.whatsapp.com/KJGJclKbLpNAEJcUKocJ58' },
  { nombre: 'Valentina', url: 'https://chat.whatsapp.com/Ejc6Sdds9P3BvOZ7l8FbZu' },
  { nombre: 'Yuliana',   url: 'https://chat.whatsapp.com/JCdfFqG7J29FgW8nsUo1XH' },
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
