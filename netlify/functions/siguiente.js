const { getStore } = require('@netlify/blobs');

// ─── GRUPOS DE ASESORES ───────────────────────────────────────────────
const grupos = [
  { nombre: 'Bayron',        url: 'https://chat.whatsapp.com/J0ByT3OtyFCKVWCuBOQ1qU' },
  { nombre: 'Yirley',        url: 'https://chat.whatsapp.com/KOp3TGxKX8XFiusi28WqAy' },
  { nombre: 'María Paula',   url: 'https://chat.whatsapp.com/Kn47PD9YVovGVT6BiRDYsl' },
  { nombre: 'Stiven M',      url: 'https://chat.whatsapp.com/JVkm1hCVIbHJwMdes10k6t' },
  { nombre: 'Marvin',        url: 'https://chat.whatsapp.com/EegeI3pNHMvJ2soBw7asM6' },
  { nombre: 'Stefany',       url: 'https://chat.whatsapp.com/FoIKbYL79TvL6pmWCralx5' },
  { nombre: 'Erika Vásquez', url: 'https://chat.whatsapp.com/HA4CUZP1uJcHTsj3FIexlr' },
  { nombre: 'Roxana',        url: 'https://chat.whatsapp.com/DeO8HRKAkFmHqC1Vwj12LU' },
  { nombre: 'Angie',         url: 'https://chat.whatsapp.com/Fc4eSG7tdUCIrar0arAcRR' },
  { nombre: 'Valentina',     url: 'https://chat.whatsapp.com/Ejc6Sdds9P3BvOZ7l8FbZu' },
  { nombre: 'Evelyn',        url: 'https://chat.whatsapp.com/GuLy0M7aqak6Jg35UF4C7P' },
  { nombre: 'Cristian',      url: 'https://chat.whatsapp.com/KM9d3OGUbgJL29Fu2fmuz4' },
  { nombre: 'Andrew',        url: 'https://chat.whatsapp.com/KJGJclKbLpNAEJcUKocJ58' },
  { nombre: 'Yuliana',       url: 'https://chat.whatsapp.com/JCdfFqG7J29FgW8nsUo1XH' },
  { nombre: 'Juan Andrés',   url: 'https://chat.whatsapp.com/EVzcCxTtOYJ68oNEgsGV4t' },
  { nombre: 'Valeria',       url: 'https://chat.whatsapp.com/HsDlixITf5t3zeCCRQRG8j' },
  { nombre: 'Natalia',       url: 'https://chat.whatsapp.com/CXJ5VNp2nAj2qp8GpgqyKm' },
];

exports.handler = async function (event) {
  try {
    const store = getStore('rotador-ilm');

    let idx = await store.get('contador', { type: 'json' });
    if (idx === null || idx === undefined || typeof idx !== 'number') {
      idx = 0;
    }

    const grupo = grupos[idx % grupos.length];

    const siguienteIdx = (idx + 1) % grupos.length;
    await store.setJSON('contador', siguienteIdx);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        nombre: grupo.nombre,
        url: grupo.url,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        nombre: grupos[0].nombre,
        url: grupos[0].url,
        error: String(err),
      }),
    };
  }
};
