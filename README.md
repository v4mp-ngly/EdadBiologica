# NUMED Experience 360° — V0.11

**Estado: prototipo técnico para revisión institucional con datos ficticios.** No está validado para uso clínico real. No genera edad biológica en años.

## Nuevas funciones
- Pantalla de resultados ampliada para mostrar **IMC, cintura/talla, fuerza y perímetro**, sin nombre, teléfono ni historial.
- La pantalla aparece **después del guardado confirmado en Supabase y de la revelación**. Si guardar falla, no se abre.
- QR opcional que contiene únicamente **texto con los cuatro indicadores y aviso de no validación**, nunca un enlace a datos personales o al expediente. Cualquier persona que lo escanee puede leer el texto.
- Botón para copiar los cuatro valores al portapapeles. El QR se oculta al abandonar la pantalla.
- Se conserva el flujo de personal, autenticación Supabase, motor ficticio de administrador, PDF y CSV de V0.10.

## Requisitos de uso
1. Descomprimir todos los archivos en una carpeta sin alterar nombres.
2. Copiar el archivo existente `supabase-config.js` (no se incluye en el ZIP; usar exclusivamente clave pública/anon). No exponer service_role.
3. Alojar en HTTPS. Conectividad necesaria para el login, guardado, fuentes y generador de QR (CDN externo). El texto del QR se construye localmente; no se envía al proveedor del QR desde el código de la página.
4. **Operación supervisada por personal NUMED**: el botón de regreso deja visible la interfaz del personal y no exige reautenticación. No es quiosco autónomo ni una pantalla pública desatendida.
5. Antes de usar datos reales se requieren revisión clínica del contenido, privacidad y consentimiento, revisión RLS del proyecto y prueba de extremo a extremo.
6. Ejecutar `node test_engine.js`, `node test_v09.js` y `node test_v11.js` para las verificaciones vigentes. `test_v10.js` comprueba expresamente la cadena de versión V0.10 y por ello no corresponde a V0.11.

## Flujo manual de prueba
- Iniciar sesión con cuenta ficticia autorizada, completar mediciones y cuestionario, guardar, recorrer tres pantallas de revelación y comprobar resultados.
- Comprobar que el nombre y teléfono no están en el texto QR ni en el resumen copiado.
- Probar QR con conexión y sin conexión a CDN: debe mostrar mensaje de error y ofrecer copiar.
- Probar fallo de guardado: no debe abrir vista de participante.
- Probar botón de regreso y cierre de sesión sin dejar la estación desatendida.

## Restricciones científicas
El método `1 punto = 1 año` es una hipótesis no validada y se conserva solo para datos inventados, en el simulador administrador. `biological_age_years` permanece `NULL`. Las tablas de referencia solapadas o incompletas requieren revisión del equipo médico. Véase `REVISION_CIENTIFICA_V09.md`.
