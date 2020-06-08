import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';
const https = require('https');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(errors());

/* Para funcionar no Mobile */
https.createServer({
  key: fs.readFileSync(path.resolve(__dirname,'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
}, app)
.listen(3333);
