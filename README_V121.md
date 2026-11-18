# NUMED Experience 360° — V0.14

## Novedades V0.14
- **NUMED CARE** (con los mismos colores de la app): nueva vitrina de bienestar empresarial al final del plan personalizado (pantalla), una tarjeta en la página del celular y un bloque en el PDF. Cada una lleva un WhatsApp con el mensaje "quiero llevar NUMED CARE a mi empresa".
- Los textos de NUMED CARE se editan en un solo lugar: la constante `NUMED_CARE` en `index.html`.
- **Rendimiento en pantalla**: la cuadrícula de la bienvenida y el fondo ahora se animan con la GPU, se quitaron los desenfoques animados, las partículas van a 30 fps y resolución 1x, y el borde de "Si solo eliges una cosa" quedó fijo. Si el equipo sigue lento, la app pasa sola a **modo ligero**; también se puede forzar abriendo `index.html?lite=1`.
- **Photo booth**: los 3 marcos se pulieron con los mismos conceptos y colores: el texto va sobre la foto con un degradado suave (sin tarjetas grandes), bordes finos con esquinas lima, y el marco tipo polaroid tiene más foto y un pie más delgado.
- **Marco "Mi edad"**: nuevo diseño de tarjeta blanca NUMED (logo arriba, foto con esquinas redondeadas, tarjeta con edad cronológica y biológica, y el sello "X años más joven" o "Edad en equilibrio", que no aparece si la edad biológica es mayor).
- **Marco "Edad Biológica"**: nueva tarjeta tipo polaroid (foto a todo el ancho con arcos blancos en dos esquinas, esquina y curvas lima, y pie con logo NUMED, "Cuídate y Vive" y la fecha).
- **Marco "¿Ya sabes tu edad biológica?"**: reemplaza al de "¿Y tú ya te la tomaste?"; usa la misma tarjeta blanca que "Mi edad" (comparten la función `cardBase`).
- **WhatsApp de la jornada configurado:** 809-893-2009 (línea 10 de `index.html`).
- **Fotos del photo booth guardadas por paciente:**
  - Cada foto queda ligada al paciente y a su evaluación: las de la estación siempre, y las del celular también (si marca el permiso, además va a la carpeta de Instagram).
  - Para verlas: en el historial, botón **📸 Fotos del photo booth** (fotos recientes y buscador por nombre) o botón **📸 Ver** en la fila de cada paciente. Cada foto se puede ampliar y descargar.
  - El texto del permiso ahora avisa que NUMED guarda una copia en el expediente.

## ⚠️ Paso obligatorio en Supabase (una sola vez)
Abre Supabase → **SQL Editor**, pega el archivo **`photobooth_paciente.sql`** y pulsa **Run**. Sin este paso, las fotos se siguen guardando pero no quedan ligadas al paciente y la galería mostrará un aviso. Se puede ejecutar más de una vez sin problema.
Las fotos tomadas antes de este cambio aparecen en **Recientes** como "Sin paciente asignado".

# Historial V0.13

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
