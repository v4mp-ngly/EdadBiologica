const fs=require('fs'), assert=require('assert');
const h=fs.readFileSync(__dirname+'/index.html','utf8');
const tests=[
 ['Version 12.1',h.includes("assessment_version:'numed-functional-v0.12.1'")],
 ['Identidad invalida guardado',/\['patient-name','patient-phone'\][\s\S]{0,210}window\.numedLastSaved=false/.test(h)],
 ['Cuestionario bloqueado durante insercion',h.includes("if(numedSaving){numedMessage('Guarda primero la evaluación actual.'")],
 ['Botones del cuestionario deshabilitados durante guardado',h.includes("#questionnaire-form input, #questionnaire-form button")],
 ['Respuestas congeladas por evaluacion',h.includes('questionnaireAnswers: {...window._questionnaireAnswers}')],
 ['Payload utiliza respuestas capturadas',h.includes('questionnaire:evaluation.questionnaireAnswers||{}')],
 ['Edad biologica validada no guardada',h.includes('biological_age_years:null,biological_age_method:null')],
 ['Acceso a simulador requiere motor',h.includes('hidden||!window.NUMED_EXP)return;')],
 ['Salida de revision cierra proyeccion',h.includes('function numedCloseResearch(){numedCloseHypotheticalAge();')]
];for(const [name,val] of tests){assert.ok(val,name)}console.log(tests.length+' controles de auditoria OK');
