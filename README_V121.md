# NUMED Experience 360° V0.12.1 — revisión de auditoría
Este paquete actualiza V0.12 con correcciones de consistencia del formulario y el guardado. No cambia el modelo científico ni crea edad biológica clínica.

## Instalación
Use el `supabase-config.js` de la instalación existente (solo clave pública). No viene en este ZIP. Servir desde HTTPS. No exponer ninguna service_role/secret key en frontend.

## Pruebas offline
`node test_engine.js`
`node test_v09.js`
`node test_v12.js`
`node test_audit_v121.js`

Consulte `AUDITORIA_V0121.md` antes de usar la aplicación. Los scripts históricos `test_v10.js` y `test_v11.js` conservan aserciones de versión obsoletas. Uso exclusivamente experimental y con datos ficticios hasta completar revisión clínica y seguridad.
