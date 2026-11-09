# NUMED Experience 360° V0.9 — evaluación funcional + simulación interna

Esta es una revisión incremental de la V0.8.1 entregada. No sustituye ni contiene las credenciales existentes de Supabase.

## Publicación

1. Copia `index.html`, `logo-numed-original.jpg` y `numed-experimental-engine.js` juntos en el sitio.
2. Conserva tu `supabase-config.js` funcional del despliegue anterior, en la misma carpeta (nunca incluyas secretos `service_role`). El archivo `supabase-config.example.js` incluido es solo un ejemplo.
3. Abre el sistema y accede con una cuenta de personal de pruebas autorizada. Para el simulador ficticio usa un admin.
4. Ejecuta `node test_engine.js` para pruebas del motor y `node test_v09.js` para controles adicionales.

No uses datos de pacientes reales hasta revisión clínica, de privacidad y pruebas institucionales. El simulador experimental NO emite edad biológica validada y NO debe compartirse como diagnóstico.

Lee `REVISION_CIENTIFICA_V09.md` para fuentes, limitaciones y pendientes.
