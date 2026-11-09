const assert = require('node:assert/strict');
const fs = require('node:fs');
const engine = require('./numed-experimental-engine.js');
const html = fs.readFileSync('./index.html','utf8');
const checks = [
 ['Versión V0.10 registrada',html.includes("assessment_version:'numed-functional-v0.10'")],
 ['Edad validada permanece nula',html.includes('biological_age_years:null,biological_age_method:null')],
 ['Resultados solo tras guardar',html.indexOf('const savedOK = await saveEvaluation(evaluationData)') < html.indexOf('displayResults(adjustedLevel, strength)')],
 ['Invalidación del cuestionario al cambiar mediciones',html.includes("clinical.forEach(id=>document.getElementById(id)?.addEventListener('input',numedInvalidateQuestionnaire))")],
 ['Invalida al cambiar respuestas',html.includes("addEventListener('change',numedInvalidateQuestionnaire)")],
 ['IMC guardado desde mediciones, no caché',html.includes('imc: weightVal / ((heightVal / 100) ** 2)')],
 ['Se bloquean inputs durante guardado',html.includes('controlled.forEach(el=>el.disabled=true)')],
 ['Se restauran inputs después de guardar',html.includes('controlled.forEach(el=>el.disabled=false)')],
 ['Cierre sesión bloqueado durante guardado',html.includes("if(numedSaving){numedMessage('Finaliza el guardado")],
 ['PDF histórico usa fecha propia',html.includes('const assessmentDate=H?.fecha')],
 ['PDF requiere sesión',html.includes('function downloadPDF(){\n if(!numedRequireAuth())return;')],
 ['CSV requiere sesión',html.includes('function exportEvaluationsCSV() {\n  if(!numedRequireAuth())return;')],
 ['Fuera de 99 no usa referencias de 70-99',html.includes("else if (age >= 70 && age <= 99) ageRange = '70-99';")],
 ['Solo simulación ficticia admin',html.includes('return; // No puntuar pacientes reales con un modelo no validado.')],
 ['Motor bloquea sin cuestionario',engine.evaluate({age:35,sex:'masculino',weightKg:70,heightCm:170,waistCm:85,gripKg:50,answers:{}}).status==='blocked']
];
for(const [name,passed] of checks) assert.ok(passed, name);
console.log(`${checks.length} verificaciones V0.10 OK`);
