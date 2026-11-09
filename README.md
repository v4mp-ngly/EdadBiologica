# NUMED Experience 360° V0.10 — revisión funcional

**Fecha:** 9 noviembre 2026. **Estado:** prototipo de revisión clínica y técnica, no listo para pacientes reales ni presentación de edad biológica en años.

## Contenido
- `index.html`: aplicación de evaluación funcional.
- `numed-experimental-engine.js`, `numed-proposal-rules.json`: cálculo hipotético para casos ficticios, **no validado**.
- `logo-numed-original.jpg`: imagen de marca ya facilitada.
- `NUMED_Propuesta_Puntuacion_Edad_Biologica.xlsx`: propuesta original para discusión, **no validada**.
- `REVISION_CIENTIFICA_V09.md`: auditoría y fuentes científicas previas (siguen pendientes las referencias ambiguas).
- `test_engine.js`, `test_v09.js`, `test_v10.js`: verificaciones automatizadas.
- `supabase-config.example.js`: ejemplo sin claves reales.

## Cambios respecto a V0.9
1. Si cambian mediciones o alguna respuesta después de cerrar el cuestionario, se invalida y requiere reconfirmación.
2. Se recalcula el IMC desde peso/talla al guardar; no se usa un valor antiguo de la pantalla.
3. Mientras se envía el registro a Supabase, los campos quedan bloqueados; no se puede reiniciar ni cerrar sesión.
4. La exportación CSV y los PDF exigen una sesión de personal.
5. El PDF histórico incluye la fecha de la evaluación correspondiente, no la fecha de la pantalla actual.
6. Se elimina una extrapolación de fuerza para edades superiores a 99 años (queda sin referencia).
7. Se distingue el guardado exitoso del refresco posterior de historial.
8. Se registra la versión de evaluación `numed-functional-v0.10`.

## Instalación
1. Descomprime en una carpeta nueva, manteniendo los nombres de archivos.
2. Coloca tu `supabase-config.js` existente, **con una clave publicable o anon**, en esa carpeta. Nunca uses `service_role` en frontend.
3. Accede desde servidor HTTPS para el despliegue, con cuenta de prueba autorizada. No actives la estación desatendida con acceso de personal abierto.
4. En la carpeta ejecuta `node test_engine.js`, `node test_v09.js` y `node test_v10.js`.
5. Prueba con datos ficticios: login, cuestionario, corrección de medidas, guardado, PDF del registro, CSV, logout y error de red. Verifica las RLS de `numed_staff`, `numed_patients` y `numed_evaluations` **en el proyecto real**.

**Límites:** las verificaciones automatizadas son de motor/estructura; no sustituyen pruebas end-to-end en navegador, ni conexión real a Supabase, ni revisión médica y de protección de datos. El cálculo hipotético no debe divulgarse como edad biológica validada. El valor `biological_age_years` se mantiene `NULL`.
