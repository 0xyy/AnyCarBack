import { Router } from 'express';
import { CarRecord } from '../records/car.record';

export const carRouter = Router()

    .get('/search/:adName?', async (req, res) => {
        const cars = await CarRecord.getAll(req.params.adName ?? '');

        res.json(cars);
    })

    .get('/:id', async (req, res) => {
        const car = await CarRecord.getOne(req.params.id);

        res.json(car);
    })

    .post('/', async (req, res) => {
        const newCar = new CarRecord(req.body);
        await newCar.add();
        res.json(newCar.id);
    });