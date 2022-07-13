import express, { json, Router } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleError } from './utils/errors';
import { config } from './config/config';
import { carRouter } from './routers/car.router';
import { imageRouter } from './routers/image.router';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(fileUpload());

const router = Router();

router.use('/car', carRouter);
router.use('/image', imageRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Spying on http://localhost:3001');
});