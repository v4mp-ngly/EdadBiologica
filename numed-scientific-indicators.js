/* NUMED 0.14 - Interpretaciones de indicadores; NO es un reloj de edad biologica. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.NUMED_SCIENCE=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const SOURCES=Object.freeze({
  waist:'https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity',
  strength:'https://academic.oup.com/ageing/article/48/1/16/5126243'
 });
 function finitePositive(x){return typeof x==='number'&&Number.isFinite(x)&&x>0;}
 function assess({age,sex,weightKg,heightCm,waistCm,gripKg}={}){
  const errors=[];
  if(!Number.isInteger(age)||age<18||age>110)errors.push('Edad: se requiere un adulto de 18 a 110 anios.');
  if(!['masculino','femenino'].includes(sex))errors.push('Sexo de referencia: seleccione masculino o femenino para interpretar fuerza.');
  if(!finitePositive(weightKg)||weightKg>500)errors.push('Peso fuera de rango.');
  if(!finitePositive(heightCm)||heightCm<100||heightCm>250)errors.push('Talla fuera de rango.');
  if(!finitePositive(waistCm)||waistCm>250)errors.push('Cintura fuera de rango.');
  if(!finitePositive(gripKg)||gripKg>120)errors.push('Fuerza de agarre fuera de rango.');
  if(errors.length)return {status:'invalid',errors,biologicalAgeYears:null};
  const bmi=weightKg/Math.pow(heightCm/100,2),ratio=waistCm/heightCm;
  const bmiCategory=bmi<18.5?'Bajo peso':bmi<25?'Intervalo habitual':bmi<30?'Sobrepeso':'Obesidad';
  let ratioCategory='Fuera del intervalo de clasificacion automatica';
  if(bmi<35&&ratio>=0.4)ratioCategory=ratio<0.5?'Adiposidad central sin aumento segun el criterio de cintura/talla':ratio<0.6?'Adiposidad central aumentada':'Adiposidad central alta';
  const ratioApplicable=bmi<35&&ratio>=0.4;
  // EWGSOP2 fue desarrollado para personas mayores; usarlo en jovenes como diagnostico es improcedente.
  const gripCutoff=sex==='masculino'?27:16;
  const gripCategory=age>=65?(gripKg<gripCutoff?'Bajo el punto de corte EWGSOP2':'No bajo el punto de corte EWGSOP2'):'Fuerza registrada; referencia de edad y protocolo pendiente';
  return {status:'ok',biologicalAgeYears:null,bmi,ratio,bmiCategory,ratioCategory,ratioApplicable,gripKg,gripCategory,gripCutoff:age>=65?gripCutoff:null,
   notes:{bmi:'El IMC no mide composicion corporal y requiere contexto clinico.',ratio:ratioApplicable?'Categoria orientativa NICE para IMC menor que 35; no es un diagnostico.':'Sin categoria automatica NICE: consultar edad, IMC y contexto clinico.',grip:age>=65?'Corte EWGSOP2 orientativo para fuerza baja en mayores; NO diagnostica sarcopenia sin otras pruebas.':'Los cortes EWGSOP2 no deben utilizarse como diagnostico de sarcopenia en personas jovenes.'},sources:SOURCES};
 }
 return Object.freeze({assess,SOURCES});
});
