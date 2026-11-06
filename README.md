# NUMED Experience 360 — V0.8 experimental (revisión médica)

Esta versión conserva el flujo asistencial y Supabase de V0.7. Añade un **simulador exclusivamente administrador** accesible desde `Revisión médica` al iniciar sesión como admin. El simulador toma datos ficticios manuales. NO influye en las evaluaciones de pacientes, no escribe su cálculo en Supabase y no cambia los PDF.

## Reglas
- Fuente de puntuaciones: `NUMED_Propuesta_Puntuacion_Edad_Biologica.xlsx` (propuesta NO validada).
- Fuerza: fuerte -3; normal 0; débil +3, usando solo intervalos no ambiguos de la tabla adjunta. Edad 18-19, >=65 y mujer 50-54 quedan bloqueadas por incertidumbres del archivo fuente.
- IMC: <18.5 +2; 18.5-<25 -1; 25-<30 +1; 30-<35 +2; >=35 +3.
- Cintura/talla: <0.40 0; 0.40-<0.50 -1; 0.50-<0.60 +1; >=0.60 +3.
- Hábitos: suma de las 10 respuestas actuales, después <=-2 => -3; -1..3 => 0; 4..7 => +2; >=8 => +3. Los valores de las opciones son los del HTML V0.7.
- Total: suma de cuatro componentes. `edad cronológica + total` se expone solo como **hipótesis matemática interna no validada**. Nunca se identifica como edad biológica clínica.

## Uso
1. Publicar juntos `index.html`, `logo-numed-original.jpg`, `numed-experimental-engine.js` y el `supabase-config.js` existente en tu repositorio. NO reemplazar el archivo de configuración funcional por el ejemplo incluido en el ZIP. Para una instalación nueva, copiar `supabase-config.example.js` a `supabase-config.js` y sustituir únicamente la clave pública anon.
2. Iniciar sesión con un usuario existente `numed_staff.role=admin`.
3. Abrir **Revisión médica**. No introducir datos de pacientes reales. Probar escenarios ficticios y pulsar **Ejecutar pruebas automáticas**.
4. No aprobar puntos como equivalencias de años sin un estudio de validación apropiado y la revisión clínica.

## Seguridad y límites
- En el código actual, la restricción del botón del simulador es de interfaz, no control de acceso robusto a los archivos JS, que están publicados. El simulador **no incluye datos clínicos** ni conecta con datos pacientes.
- La aplicación V0.7 utiliza sesiones de Supabase en memoria (requiere iniciar sesión al recargar).
- El motor bloquea intervalos de handgrip ambiguos en lugar de inventar datos. Las referencias pueden no ser intercambiables con el dinamómetro digital de NUMED ni con una sola medición.
- `biological_age_years` y `biological_age_method` siguen NULL. No es necesaria una migración SQL.

## Estado de pruebas
- Ejecutar `node test_engine.js` para probar la lógica. Revisar también el navegador con datos ficticios y Supabase con credenciales administrativas de pruebas.
