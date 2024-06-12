import { createServer } from 'http';
import client from './bd/configDB.js';

createServer((req, res) => {
  res.write('Hello World!');

  client.connect( err => {
    if(err) throw Error('Não concetado...')
    console.log('Conecatado od oa dsgvasgsd ')
  })

  res.end();
}).listen(process.env.PORT);
