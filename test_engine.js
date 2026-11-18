const assert = require('node:assert/strict');const m=require('./numed-experimental-engine.js');
const answers={fuma_actual:0,ex_fumador:0,alcohol:0,actividad:-2,fuerza_q:-1,sueno:-1,estres:0,dieta:-1,cronicas:0,familia:0};
const x={age:35,sex:'masculino',weightKg:70,heightCm:170,waistCm:85,gripKg:50,answers};
let r=m.evaluate(x);assert.equal(r.status,'experimental');assert.equal(r.components.fuerza,0);assert.equal(r.components.imc,-1);assert.equal(r.components.cintura,1);assert.equal(r.components.habitos,-3);assert.equal(r.points,-3);assert.equal(r.hypotheticalAge,32);assert.equal(r.validatedBiologicalAge,null);
assert.equal(m.evaluate({...x,age:67}).status,'blocked');assert.equal(m.evaluate({...x,age:80}).status,'blocked');assert.equal(m.evaluate({...x,age:19}).status,'blocked');assert.equal(m.evaluate({...x,answers:{}}).status,'blocked');assert.equal(m.evaluate({...x,waistCm:0}).status,'blocked');assert.equal(m.evaluate({...x,sex:'femenino',age:52}).status,'blocked');
console.log('7 verificaciones de motor: OK');
