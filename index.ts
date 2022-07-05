import express, { json, Router } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleError } from './utils/errors';
import rateLimit from 'express-rate-limit';
import { config } from './config/config';
import { carRouter } from './routers/car.router';

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));
app.use(json());

const router = Router();

router.use('/car', carRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Spying on http://localhost:3001');
});