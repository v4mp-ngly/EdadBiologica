# Auditoría técnica y clínica — NUMED Experience 360° V0.12.1
Fecha: 9 noviembre 2026

## Alcance inspeccionado
`index.html`, motor experimental JS, reglas JSON, libro de propuesta XLSX, pruebas JS, README. Revisión estática y pruebas Node de lógica; no se probó la conexión del proyecto a Supabase ni el flujo de pantalla táctil con usuario real. `supabase-config.js` no viene en el ZIP (debe aportarse en la instalación).

## Correcciones implementadas en V0.12.1
1. La edición de nombre o teléfono invalida la autorización local para mostrar resultados guardados (antes solo se ocultaba un panel).
2. Las respuestas del cuestionario quedan capturadas al preparar la evaluación y se insertan desde esa copia, evitando depender de un estado global mutable durante operaciones asíncronas.
3. Se deshabilitan los botones del cuestionario durante el proceso de guardado y la función de guardado del cuestionario rechaza llamadas si hay persistencia en curso.
4. El acceso al simulador médico revisa además la disponibilidad del motor experimental; salir de revisión médica cierra también la proyección hipotética.
5. El campo `assessment_version` identifica la versión V0.12.1.
6. Se agregan 9 comprobaciones específicas en `test_audit_v121.js`.

## Verificaciones ejecutadas
- `node test_engine.js`: 7 OK
- `node test_v09.js`: 11 OK
- `node test_v12.js`: 8 OK
- `node test_audit_v121.js`: 9 OK
- Sintaxis de los 5 bloques JavaScript en línea del HTML: OK
- `test_v10.js` y `test_v11.js`: fallan en una comparación exacta de cadena de versión (pruebas heredadas obsoletas, no implica que todas sus otras aserciones pasen). Deben adaptarse antes de usarse como regresión completa.

## Riesgos pendientes (no resueltos)
### Alta prioridad
- No existe una estimación de edad biológica científicamente validada para las participantes. Solo hay `edad cronológica + puntos` en simulador FICTICIO con aviso NO VALIDADO. No usar el valor como diagnóstico o edad biológica.
- Las referencias de fuerza de agarre tienen segmentos ambiguos, especialmente 18-19, mujeres 50-54, 65+ y mediciones decimales entre franjas. El motor experimental bloquea esos casos.
- No se verificaron las políticas RLS, grants, esquema o permisos de Supabase en el proyecto conectado. La ocultación de botones de administrador del lado del cliente NO constituye control de seguridad del servidor.
- No se ha hecho prueba extremo a extremo real: inicio de sesión, inserción, recuperación, pérdida de red, PDF, QR, pantalla táctil y cierre de sesión.
### Media prioridad
- El historial consulta los primeros 500 registros por orden ascendente; cuando haya más de 500, omite los recientes. Requiere paginación o consulta descendente.
- Un mismo participante podría duplicarse bajo inserciones simultáneas; conviene evaluar unicidad/transacción en base de datos según política clínica.
- `saveEvaluation` puede crear un paciente y después fallar al insertar la evaluación; ese paciente queda registrado sin evaluación. Se requiere un procedimiento atómico del lado servidor para corregirlo de raíz.
- Las salidas PDF históricas contienen mediciones, pero no reconstruyen todas las recomendaciones originales.
- El QR contiene texto de mediciones de salud; aunque no tenga nombre ni teléfono, puede ser fotografiado por terceros. Mostrarlo solo con consentimiento explícito y control del operador.
- Validar que las librerías externas cargan con la red prevista para el evento y probar modo degradado sin conexión.
- El cuestionario es una puntuación interna sin validación clínica. No corresponde a un índice de riesgo certificado.

## Referencias científicas citadas en el documento de base
- NICE NG246: https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity
- Revisión de sarcopenia y fuerza: https://pmc.ncbi.nlm.nih.gov/articles/PMC11310033/
Las referencias bibliográficas se incluyen para revisión por el equipo clínico, no validan la fórmula de años.

## Antes de puesta en producción
1. Revisión y firma del protocolo clínico, consentimiento e interpretación.
2. Validación de métodos si se desea edad biológica en años.
3. Auditoría de RLS, usuarios y tablas contra Supabase real.
4. Prueba integral en pantalla táctil y teléfonos con datos ficticios.
5. Revisar QR y PDF con autorización y política de manejo de datos personales.
