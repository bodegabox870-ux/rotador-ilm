# Rotador WhatsApp ILM — versión con contador en servidor

Esta versión arregla el problema de rotación desigual. En vez de que cada
celular lleve su propia cuenta (que falla en navegadores de Instagram/Facebook),
el contador vive en el servidor (Netlify Blobs) y es el MISMO para todos los
visitantes. Así sí queda: persona 1 → asesor 1, persona 2 → asesor 2, etc.

## Cómo subir esto a Netlify por GitHub (una sola vez)

1. Crea un repositorio nuevo en GitHub (ej: "rotador-ilm")
2. Sube TODOS los archivos de esta carpeta a ese repositorio
   (index.html, netlify.toml, package.json, y la carpeta netlify/functions/)
3. Ve a https://app.netlify.com
4. Clic en "Add new site" → "Import an existing project"
5. Elige "GitHub" y selecciona el repositorio que acabas de crear
6. Netlify detecta automáticamente la configuración (netlify.toml) — dale "Deploy"
7. Espera 1-2 minutos a que termine de construir
8. Te da una URL nueva, ej: https://nombre-random.netlify.app

## Cómo agregar o quitar asesores después

Edita el archivo `netlify/functions/siguiente.js`, en la lista `grupos`.
Sube el cambio a GitHub (commit + push) y Netlify lo despliega solo, automáticamente.

## Cómo probar que el contador funciona bien

Abre el link del sitio varias veces seguidas (puedes usar tu celular y el de
alguien más). Cada visita debe ir a un asesor diferente, en orden, sin
importar el dispositivo o navegador.
