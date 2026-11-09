const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const checks=[
 ['Versión V0.11',html.includes("assessment_version:'numed-functional-v0.11'")],
 ['Edad validada en null',html.includes('biological_age_years:null,biological_age_method:null')],
 ['Pantalla separada de participante',html.includes('id="numed-participant"')],
 ['Pantalla bloqueada hasta guardado',html.includes('if(!numedUser || !window.numedLastSaved)return;')],
 ['Vista tras revelación',html.includes('closeNumedReveal();numedOpenParticipantResult();')],
 ['Cálculo QR sin nombre ni teléfono',html.includes('function numedParticipantSummary()') && !html.match(/function numedParticipantSummary\(\)[\s\S]*?\n}/)?.[0].includes('patient-name')],
 ['QR opt-in',html.includes('onclick="numedShowShareQR()"')],
 ['QR fall back',html.includes('El generador QR no está disponible')],
 ['Cierra QR al salir',html.includes("function numedCloseParticipantResult(){\n numedHideShareQR()")],
 ['No exporta edad validada',html.includes("'', // No age is available without a validated clinical model")],
 ['No edad numérica experimental real',html.includes('return; // No puntuar pacientes reales con un modelo no validado.')]
];
for(const [name,ok] of checks)assert.ok(ok,name);
console.log(`${checks.length} verificaciones V0.11 OK`);
