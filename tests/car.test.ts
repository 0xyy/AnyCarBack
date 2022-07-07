import { BodyTypes, CarEntity, FuelTypes, GearboxTypes } from '../types';
import { pool } from '../utils/db';
import { CarRecord } from '../records/car.record';

const testObj = {
    brand: 'BMW',
    model: 'X5',
    adName: 'Fajne BMW X5',
    price: 320000,
    yearOfProduction: 2018,
    kilometrage: 42000,
    hp: 250,
    fuel: FuelTypes.Petrol,
    gearbox: GearboxTypes.Automatic,
    bodyType: BodyTypes.SUV,
    color: 'black',
    accidentFree: true,
    description: 'spoko'
};

describe('CarRecord', () => {
    afterAll(async () => {
        await pool.end();
    });

    test('AdRecord.add should return new UUID.', async () => {
        const car = new CarRecord(testObj);
        await car.add();

        expect(car.id).toBeDefined();
        expect(car.id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
    });

    test('AdRecord.add inserts to database.', async () => {
        const car = new CarRecord(testObj);
        await car.add();

        const createdCar = await CarRecord.getOne(car.id);

        expect(createdCar).toBeDefined();
        expect(createdCar.id).toBe(car.id);
        expect(createdCar).not.toBeNull();
    });

    test('CarRecord.getAll should returns smaller amount of data.', async () => {
        const cars = await CarRecord.getAll('');

        const car = cars[0] as CarEntity;

        expect(car.id).toBeDefined();
        expect(car.model).toBeDefined();
        expect(car.bodyType).toBeUndefined();
        expect(car.yearOfProduction).toBeUndefined();
    });

    test('CarRecord.getAll should return empty array when searching for not existing cars.', async () => {
        const cars = await CarRecord.getAll('xxxxxxxxx');

        expect(cars).toEqual([]);
    });

    test('CarRecord.getAll should return cars entries that are searched for.', async () => {
        const car = new CarRecord(testObj);
        await car.add();

        const cars = await CarRecord.getAll('Fajne BMW X5');

        expect(cars).toBeDefined();
        expect(cars).not.toEqual([]);
        expect(cars[0].id).toBeDefined()
    });

    test('CarRecord.getOne should return null when searching for not existing car.', async () => {
        const notExistingCar = await CarRecord.getOne('not existing id');

        expect(notExistingCar).toBeNull();
    });

    test('CarRecord.getOne should return car entry when searching for a existing car., ', async () => {
        const car = new CarRecord(testObj);
        await car.add();

        const existingCar = await CarRecord.getOne(car.id);

        expect(existingCar).toBeDefined();
        expect(existingCar.id).toBe(car.id);
        expect(existingCar.model).toBe('X5');
    });
})