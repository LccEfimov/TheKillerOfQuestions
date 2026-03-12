import app from '../../brain-service/src/index.mjs';
import request from 'supertest';
const text='same account maybe different people and documented checks. why late and unclear handoffs?';
const res=await request(app).post('/api/analyze').send({text,protectedMode:true});
if(res.status!==200) throw new Error('analysis failed');
const exp=await request(app).post('/api/export/secure').send({protectedMode:true,container:{ciphertext:'abc',metadata:{payloadType:'analysis'}}});
if(exp.status!==200) throw new Error('export failed');
console.log('integration ok');
