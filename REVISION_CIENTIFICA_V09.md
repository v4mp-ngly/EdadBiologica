# NUMED Experience 360° — auditoría V0.9 (9 noviembre 2026)

**Estado: entorno de revisión, NO autorizado para evaluación clínica de pacientes reales.**

## Hallazgos con respaldo

1. **IMC:** peso en kg/(talla en m)^2. Las franjas habituales de adultos son útiles para clasificación antropométrica, pero no permiten convertir una medición aislada en años biológicos. Interpretar con cautela en mayores de 65 años y alta masa muscular. Fuente: https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity
2. **Cintura/talla:** NICE NG246 define 0.40–0.49 como adiposidad central saludable, 0.50–0.59 aumentada y >=0.60 alta en adultos con IMC <35. Debajo de 0.40 no debe afirmarse automáticamente que el riesgo sea bajo. Fuentes: https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity y https://www.nice.org.uk/guidance/QS212/chapter/quality-statement-1-recording-bmi-and-waist-to-height-ratio-in-adults
3. **Fuerza de agarre:** EWGSOP2 usa <27 kg en hombres y <16 kg en mujeres como umbrales de fuerza baja en la evaluación de sarcopenia en adultos mayores. No son tablas de percentiles para toda edad ni sustituyen el protocolo instrumental. Fuente de discusión: https://pmc.ncbi.nlm.nih.gov/articles/PMC11310033/
4. **Relojes de edad biológica:** la validez clínica y predictiva de un modelo que emita años exige una validación apropiada. Un puntaje artesanal no equivale a años. Fuentes: https://www.nature.com/articles/s41514-023-00110-8 y https://www.nature.com/articles/s41591-023-02784-9

## Hallazgos del archivo NUMED

- La propuesta `NUMED_Propuesta_Puntuacion_Edad_Biologica.xlsx` es explícitamente NO VALIDADA. Los puntajes (-3..+3) y la equivalencia `1 punto = 1 año` son decisiones de diseño, no estimaciones médicas.
- En tabla de agarre NUMED: 18–19 sin origen confirmado, 65+ con solapamiento/duplicación; mujeres 50–54 sin referencia inequívoca. Se mantienen bloqueados los cálculos hipotéticos para esos segmentos.
- Las filas de agarre expresadas con números enteros crean intervalos sin categoría para mediciones decimales entre máximos y mínimos, p. ej. 36.5 kg cuando débil <=36 y normal >=37. El simulador los bloquea de forma explícita; **no se redondean** ni se inventan cortes.
- Los cuestionarios y puntos son internos; no constituyen una escala validada y deben presentarse como hábitos registrados.
- `Tablas de Referencia FHT.xlsx` es una referencia operativa de mediciones; no representa por sí sola la validación de un reloj biológico.

## Cambios V0.9

- La pantalla de resultados espera que Supabase confirme guardado exitoso antes de mostrarse o iniciar revelación.
- Cálculo hipotético con datos de paciente real deshabilitado: solo queda simulador admin **con datos ficticios**.
- Acceso operativo limitado a adultos de 18 a 110 años, coherente con el motor experimental; se añaden validaciones de peso/talla/cintura/agarre.
- Botón renombrado a `Guardar y ver perfil funcional`.
- Reinicio limpia las respuestas y cualquier panel experimental previo.
- `biological_age_years` y `biological_age_method` siguen en NULL, sin cambios SQL.

## Pendientes antes del evento

- Validación institucional de la interpretación, medición y consentimiento; datos ficticios hasta entonces.
- Confirmar compatibilidad de dinamómetro, número de intentos, mano evaluada y calibración.
- Corregir o documentar origen primario de la tabla completa de agarre, especialmente filas ambiguas.
- Pruebas de usuario con navegador, pantalla táctil, autenticación Supabase y manejo de pérdida de red.
- No mostrar una edad biológica en años a participantes hasta validar estadísticamente el modelo y sus usos.
