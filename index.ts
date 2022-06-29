import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleError } from './utils/errors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.get('/', async (res, req) => {
    throw new Error('ELO');
});

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Spying on http://localhost:3001');
});