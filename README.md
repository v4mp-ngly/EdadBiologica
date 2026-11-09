# NUMED Experience 360° V0.12 — demostración matemática de edad hipotética

Se añade un botón en **Revisión médica** (solo administrador) para proyectar en pantalla completa el resultado numérico de una simulación **con datos ficticios ingresados manualmente en el simulador**. El número corresponde a edad cronológica ficticia + puntuación experimental. **No es edad biológica validada**. El resultado no toma los datos del paciente real, no se guarda en Supabase, no se exporta y no se comparte por QR.

## Cómo verlo
1. Configurar `supabase-config.js` desde la instalación existente (solo clave pública) y abrir aplicación alojada en HTTPS.
2. Iniciar sesión con cuenta administradora autorizada.
3. Elegir **Revisión médica**, completar el escenario ficticio y las diez respuestas.
4. Pulsar **Ver edad hipotética en pantalla**. Si faltan datos, el motor muestra el motivo del bloqueo.
5. Volver a Revisión médica para ensayar otros casos.

## Importante
- No presentar la cifra a participantes ni atribuir valor clínico. La experiencia de participante sigue mostrando únicamente indicadores funcionales.
- `biological_age_years` permanece NULL.
- La fórmula `1 punto = 1 año` exige desarrollo y validación antes de constituir una medida biológica en años.
- No hay cambios en SQL, tablas, RLS ni credenciales.

## Pruebas
Ejecutar `node test_engine.js`, `node test_v09.js`, `node test_v11.js`, `node test_v12.js`. Validar de forma manual la interfaz y la conexión real a Supabase antes de uso supervisado.
