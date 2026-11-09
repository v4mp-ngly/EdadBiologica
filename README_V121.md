# NUMED Experience 360° — V0.13

## Qué cambió
- Se sustituyeron los largos textos de revisión técnica por textos breves y más claros.
- **En sesión de administrador**, tras guardar con éxito una evaluación, el resultado principal puede mostrar la estimación aritmética **experimental** (si la edad, referencias y diez respuestas son compatibles con el motor). Se muestra junto con la indicación visible de que el modelo no tiene validación clínica.
- La pantalla destinada a participantes sigue mostrando únicamente indicadores. Nunca comparte la cifra experimental mediante QR, PDF, CSV ni Supabase.
- Si falta una referencia o una respuesta válida, no se inventa un número; aparece el motivo en el panel de revisión médica.

## Importante
La fórmula NUMED (edad cronológica + puntuación) NO está científicamente validada como reloj biológico. Mostrarla en pantalla es únicamente una prueba de investigación para personal autorizado; su cifra **no debe usarse como resultado clínico**. `biological_age_years` permanece NULL. No compartir resultados experimentales con participantes del evento.

## Instalación
1. Descomprimir el ZIP completo.
2. Copiar la configuración existente como `supabase-config.js` según el archivo de ejemplo; no poner claves secretas/service_role en cliente.
3. Servir la carpeta por HTTPS o servidor local. Iniciar sesión con usuario `admin` de NUMED.
4. Para probar el número: completar datos de investigación compatibles (edades 20–64 con rangos disponibles), responder los diez campos, guardar la evaluación, revisar el panel principal y el panel de revisión médica.
5. Si las mediciones son ficticias, que el entorno de Supabase sea de pruebas; no ensuciar historiales clínicos con datos inventados.

## Pruebas
Se verificó sintaxis de JavaScript y pruebas del motor y de UI de investigación. **No** se ejecutaron pruebas E2E conectadas a Supabase ni se validó el modelo clínicamente.
