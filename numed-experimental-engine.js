/* NUMED Motor Propuesto v1.0 - SOLO REVISIÓN CLÍNICA. No modifica evaluaciones ni Supabase. */
(function (root, factory) {
 const result = factory();
 if (typeof module === 'object' && module.exports) module.exports = result;
 else root.NUMED_EXP = result;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
 'use strict';
 const RULES = {"version":"numed-proposal-1.0-not-validated","bmi":[{"label":"Bajo peso","min":null,"max":18.5,"points":2},{"label":"Intervalo habitual","min":18.5,"max":25,"points":-1},{"label":"Sobrepeso","min":25,"max":30,"points":1},{"label":"Obesidad grado I","min":30,"max":35,"points":2},{"label":"Obesidad grados II-III","min":35,"max":null,"points":3}],"waistHeight":[{"label":"Menor a 0.40","min":null,"max":0.4,"points":0},{"label":"0.40–0.49","min":0.4,"max":0.5,"points":-1},{"label":"0.50–0.59","min":0.5,"max":0.6,"points":1},{"label":"0.60 o más","min":0.6,"max":null,"points":3}],"strength":{"Fuerte":-3,"Normal":0,"Debil":3},"habits":[{"max":-2,"points":-3},{"min":-1,"max":3,"points":0},{"min":4,"max":7,"points":2},{"min":8,"points":3}],"handgripRows":[{"sex":"masculino","fromAge":20,"toAge":24,"weakMax":36.0,"normalMin":37.0,"normalMax":56.0,"strongMin":57.0,"sourceRow":134,"review":false},{"sex":"masculino","fromAge":25,"toAge":29,"weakMax":37.0,"normalMin":38.0,"normalMax":57.0,"strongMin":58.0,"sourceRow":135,"review":false},{"sex":"masculino","fromAge":30,"toAge":34,"weakMax":36.0,"normalMin":37.0,"normalMax":55.0,"strongMin":56.0,"sourceRow":136,"review":false},{"sex":"masculino","fromAge":35,"toAge":39,"weakMax":35.0,"normalMin":36.0,"normalMax":55.0,"strongMin":56.0,"sourceRow":137,"review":false},{"sex":"masculino","fromAge":40,"toAge":44,"weakMax":35.0,"normalMin":36.0,"normalMax":55.0,"strongMin":56.0,"sourceRow":138,"review":false},{"sex":"masculino","fromAge":45,"toAge":49,"weakMax":34.0,"normalMin":35.0,"normalMax":54.0,"strongMin":55.0,"sourceRow":139,"review":false},{"sex":"masculino","fromAge":50,"toAge":54,"weakMax":32.0,"normalMin":33.0,"normalMax":50.0,"strongMin":51.0,"sourceRow":140,"review":false},{"sex":"masculino","fromAge":55,"toAge":59,"weakMax":30.0,"normalMin":31.0,"normalMax":48.0,"strongMin":49.0,"sourceRow":141,"review":false},{"sex":"masculino","fromAge":60,"toAge":64,"weakMax":30.0,"normalMin":31.0,"normalMax":48.0,"strongMin":49.0,"sourceRow":142,"review":false},{"sex":"femenino","fromAge":20,"toAge":24,"weakMax":21.0,"normalMin":22.0,"normalMax":35.0,"strongMin":36.0,"sourceRow":154,"review":false},{"sex":"femenino","fromAge":25,"toAge":29,"weakMax":25.0,"normalMin":26.0,"normalMax":41.0,"strongMin":42.0,"sourceRow":155,"review":false},{"sex":"femenino","fromAge":30,"toAge":34,"weakMax":21.0,"normalMin":22.0,"normalMax":35.0,"strongMin":36.0,"sourceRow":156,"review":false},{"sex":"femenino","fromAge":35,"toAge":39,"weakMax":20.0,"normalMin":21.0,"normalMax":34.0,"strongMin":35.0,"sourceRow":157,"review":false},{"sex":"femenino","fromAge":40,"toAge":44,"weakMax":18.0,"normalMin":19.0,"normalMax":32.0,"strongMin":33.0,"sourceRow":158,"review":false},{"sex":"femenino","fromAge":45,"toAge":49,"weakMax":18.0,"normalMin":19.0,"normalMax":32.0,"strongMin":33.0,"sourceRow":159,"review":false},{"sex":"femenino","fromAge":55,"toAge":59,"weakMax":17.0,"normalMin":18.0,"normalMax":31.0,"strongMin":32.0,"sourceRow":161,"review":false},{"sex":"femenino","fromAge":60,"toAge":64,"weakMax":17.0,"normalMin":18.0,"normalMax":31.0,"strongMin":32.0,"sourceRow":162,"review":false}],"questionnaire":{"fuma_actual":[{"label":"Sí, fumo","points":2},{"label":"No fumo","points":0}],"ex_fumador":[{"label":"Sí","points":1},{"label":"No","points":0}],"alcohol":[{"label":"Ninguno","points":0},{"label":"Moderado (≤1 trago/día)","points":1},{"label":"Alto (>1 trago/día)","points":2}],"actividad":[{"label":"Sí, regularmente","points":-2},{"label":"No","points":0}],"fuerza_q":[{"label":"Sí","points":-1},{"label":"No","points":0}],"sueno":[{"label":"Sí, duermo bien","points":-1},{"label":"No, duermo menos o más","points":1}],"estres":[{"label":"1 — Muy bajo","points":0},{"label":"2 — Bajo","points":0},{"label":"3 — Moderado","points":0},{"label":"4 — Alto","points":1},{"label":"5 — Muy alto","points":1}],"dieta":[{"label":"Sí, como bien","points":-1},{"label":"No, mi dieta es irregular","points":0}],"cronicas":[{"label":"Sí","points":2},{"label":"No","points":0}],"familia":[{"label":"Sí","points":1},{"label":"No","points":0}]},"warning":"Modelo hipotético no validado. Un punto NO equivale científicamente a un año biológico."};
 const REQUIRED = ['fuma_actual','ex_fumador','alcohol','actividad','fuerza_q','sueno','estres','dieta','cronicas','familia'];
 const ok = x => typeof x === 'number' && Number.isFinite(x);
 const bracket = (v,rs) => rs.find(x => (x.min == null || v >= x.min) && (x.max == null || v < x.max));
 function classifyGrip(age, sex, force) {
  if(!Number.isInteger(age)||!['masculino','femenino'].includes(sex)||!ok(force)||force<=0) return {error:'Datos de fuerza incompletos o inválidos'};
  if(age >= 65) return {error:'Referencia NUMED ambigua a partir de 65 años. Revisión médica requerida.'};
  if(age < 20) return {error:'Referencia 18–19 sin origen confirmado; se bloquea hasta validarla.'};
  const row=RULES.handgripRows.find(x=>x.sex===sex&&x.fromAge<=age&&x.toAge>=age);
  if(!row) return {error:'No existe referencia verificada para esa edad.'};
  let category;
  if(force <= row.weakMax)category='Debil';
  else if(force >= row.strongMin)category='Fuerte';
  else if(force >= row.normalMin && force <= row.normalMax)category='Normal';
  else return {error:'Medición decimal entre intervalos de la tabla; revisar precisión del equipo.'};
  return {category,points:RULES.strength[category],ref:row};
 }
 function evaluate(input){
  const errors=[];
  const {age,sex,weightKg,heightCm,waistCm,gripKg,answers}=input||{};
  if(!Number.isInteger(age)||age<18||age>110)errors.push('Edad fuera del rango operativo 18–110.');
  if(!['masculino','femenino'].includes(sex))errors.push('Sexo de referencia no definido.');
  if(!ok(weightKg)||weightKg<=0||weightKg>500)errors.push('Peso inválido.');
  if(!ok(heightCm)||heightCm<100||heightCm>250)errors.push('Talla inválida.');
  if(!ok(waistCm)||waistCm<=0||waistCm>250)errors.push('Cintura inválida.');
  if(!ok(gripKg)||gripKg<=0||gripKg>120)errors.push('Fuerza inválida.');
  if(!answers||typeof answers!=='object')errors.push('Faltan respuestas del cuestionario.');
  const answerErrors=[];
  let rawHabits=0;
  for(const field of REQUIRED){
    if(!answers||!Object.hasOwn(answers,field)||!ok(answers[field])||!RULES.questionnaire[field]?.some(opt=>opt.points===answers[field]))answerErrors.push(field);
    else rawHabits+=answers[field];
  }
  if(answerErrors.length)errors.push('Respuestas ausentes o no contempladas: '+answerErrors.join(', '));
  if(errors.length)return {status:'blocked',errors,modelVersion:RULES.version};
  const bmi=weightKg/(heightCm/100)**2,ratio=waistCm/heightCm;
  const bmiRule=bracket(bmi,RULES.bmi),waistRule=bracket(ratio,RULES.waistHeight),grip=classifyGrip(age,sex,gripKg);
  if(grip.error)return {status:'blocked',errors:[grip.error],modelVersion:RULES.version,metrics:{bmi,ratio,gripKg}};
  const habitRule=RULES.habits.find(x=>(x.min==null||rawHabits>=x.min)&&(x.max==null||rawHabits<=x.max));
  const components={fuerza:grip.points,imc:bmiRule.points,cintura:waistRule.points,habitos:habitRule.points};
  const points=Object.values(components).reduce((a,b)=>a+b,0);
  const hypotheticalAge=age+points;
  return {status:'experimental',modelVersion:RULES.version,metrics:{bmi,ratio,gripKg,rawHabits,gripCategory:grip.category,bmiCategory:bmiRule.label,waistCategory:waistRule.label},components,points,hypotheticalAge,validatedBiologicalAge:null,warning:RULES.warning};
 }
 return Object.freeze({RULES,REQUIRED,evaluate,classifyGrip});
});
