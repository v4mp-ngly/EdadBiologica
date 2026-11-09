# NUMED Experience 360 - V0.12.2 (correccion de pruebas)

## Problema corregido
La funcion `numedRunResearchTests()` llenaba las diez preguntas con cero, pero `sueno` solo acepta -1 o +1. Por tanto, el caso ficticio era rechazado por el motor y la comprobacion de `validatedBiologicalAge === null` tambien fallaba al no existir resultado experimental.

## Cambio
Ahora la prueba construye respuestas permitidas directamente desde `NUMED_EXP.RULES.questionnaire`, sin modificar reglas, puntajes, rangos ni comportamiento del motor.

## Pruebas ejecutadas
- `node test_research_ui.js`: 5/5 correctas
- `node test_engine.js`: 7 correctas
- `node test_v09.js`: 11 correctas
- `node test_v12.js`: 8 correctas
- `node test_audit_v121.js`: 9 correctas

NOTA: estas pruebas no validan el modelo como reloj biologico ni comprueban Supabase en produccion. Simulador solo con datos ficticios.
