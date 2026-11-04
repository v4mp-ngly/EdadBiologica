# NUMED Experience 360° — Prototipo V0.1

Primera entrega funcional de interfaz para el evento del 18 de noviembre de 2026.

## Contenido
- Bienvenida animada y menú táctil
- Exploración educativa de indicadores mediante silueta interactiva
- Registro y cuestionario de seis preguntas (solo en memoria de la página)
- Código temporal de sesión demostrativa, **no válido como identificador clínico**
- Vista inicial del panel clínico y cálculo de IMC
- NUMED Photo Studio: cámara real del navegador, cuatro marcos, cuenta regresiva, vista previa, repetir y descarga JPG local
- Diseño responsive para pantalla táctil y iPad

## Abrir
Es una app estática. Abrir `index.html` para explorar pantallas; para utilizar la cámara, publicar en un origen HTTPS (por ejemplo GitHub Pages) o iniciar un servidor local y visitar `http://localhost:8000`:

```sh
cd numed-experience-v01
python3 -m http.server 8000
```

## Limitaciones conscientes
- NO se conecta a Supabase, NO almacena datos clínicos y NO envía mensajes.
- NO calcula edad biológica: requiere metodología y revisión clínica previamente validadas.
- NO genera un QR de descarga; esto requiere almacenamiento privado con enlaces seguros y vencimiento.
- El panel clínico es una **maqueta funcional no autenticada** y no debe utilizarse con datos reales.
- Las respuestas de la demo no se guardan y se pierden al recargar.
- Las fotografías se procesan solo en el dispositivo. No se suben a servidor.
- Los logos son tipográficos provisionales hasta recibir los originales de NUMED.

## Próximo bloque de desarrollo
1. Metodología clínica y formulario definitivo.
2. Supabase: esquemas, Auth, RLS, consentimientos y acceso según rol.
3. Registro real y asociación de mediciones.
4. Flujo clínico y resultados validados.
5. Photo Studio con almacenamiento temporal privado, QR seguro, caducidad y eliminación.
6. Pruebas en pantalla táctil HDMI + USB y iPad, y contingencia por pérdida de conectividad.
