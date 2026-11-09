const assert=require('node:assert/strict');
const fs=require('node:fs');
const m=require('./numed-experimental-engine.js');
const html=fs.readFileSync('./index.html','utf8');
const answers=Object.fromEntries(m.REQUIRED.map(k=>[k,0]));
answers.sueno=-1;
const base={age:35,sex:'masculino',weightKg:70,heightCm:170,waistCm:85,gripKg:50,answers};
const checks=[
 ['Simulador mantiene edad validada nula',m.evaluate(base).validatedBiologicalAge===null],
 ['Referencia 18-19 se bloquea',m.evaluate({...base,age:19}).status==='blocked'],
 ['Referencia 65+ se bloquea',m.evaluate({...base,age:65}).status==='blocked'],
 ['Referencia mujeres 50-54 se bloquea',m.evaluate({...base,age:52,sex:'femenino'}).status==='blocked'],
 ['Fuerza decimal sin categoría se bloquea',m.evaluate({...base,age:20,gripKg:36.5}).status==='blocked'],
 ['Cuestionario incompleto se bloquea',m.evaluate({...base,answers:{}}).status==='blocked'],
 ['Sin datos se bloquea',m.evaluate({...base,weightKg:0}).status==='blocked'],
 ['Panel resultados post-guardado',html.indexOf('const savedOK = await saveEvaluation(evaluationData)')<html.indexOf('displayResults(adjustedLevel, strength)')],
 ['Simulación real desactivada',html.includes('return; // No puntuar pacientes reales con un modelo no validado.')],
 ['Columna edad biológica nula',html.includes('biological_age_years:null,biological_age_method:null')],
 ['Botón funcional, no biológico',html.includes('Guardar y ver perfil funcional')]
];
for(const [label,pass] of checks){assert.ok(pass,label)}
console.log(`${checks.length} verificaciones V0.9 OK`);
