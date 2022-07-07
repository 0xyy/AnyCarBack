import { BodyTypes, FuelTypes, GearboxTypes } from '../types';
import { CarRecord } from '../records/car.record';

const testObj = {
    id: '123',
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

describe('CarRecord validation', () => {

    test('Can build CarRecord', () => {
        const car = new CarRecord(testObj);

        expect(car.brand).toBe('BMW');
        expect(car.accidentFree).toBeTruthy();
        expect(car.yearOfProduction).toBe(2018);
    });

    test('Validating invalid brand should throw when brand is empty.', () => {
        expect(() => new CarRecord({
            ...testObj,
            brand: '',
        })).toThrow('Marka samochodu nie może być pusta, ani przekraczać 20 znaków.');
    });

    test('Validating invalid model should throw when model is empty.', () => {
        expect(() => new CarRecord({
            ...testObj,
            model: '',
        })).toThrow('Model samochodu nie może być pusty, ani przekraczać 50 znaków.');
    });

    test('Validating invalid adName should throw when adName is empty.', () => {
        expect(() => new CarRecord({
            ...testObj,
            adName: '',
        })).toThrow('Nazwa ogłoszenia nie może być pusta, ani przekraczać 70 znaków.');
    });

    test('Validating invalid price should throw when price is negative.', () => {
        expect(() => new CarRecord({
            ...testObj,
            price: -1,
        })).toThrow('Cena samochodu nie może być ujemna i nie może przekraczać 10 000 000 PLN.');
    });

    test('Validating invalid yearOfProduction should throw when year is wrong.', () => {
        expect(() => new CarRecord({
            ...testObj,
            yearOfProduction: 0,
        })).toThrow('Nie udało się określić poprawnego roku produkcji samochodu.');
    });

    test('Validating invalid kilometrage should throw when kilometrage is negative.', () => {
        expect(() => new CarRecord({
            ...testObj,
            kilometrage: -1,
        })).toThrow('Nie udało się określić poprawnego przebiegu samochodu.');
    });

    test('Validating invalid hp should throw when hp is negative.', () => {
        expect(() => new CarRecord({
            ...testObj,
            hp: -1,
        })).toThrow('Nie udało się określić poprawnej mocy (km) samochodu.');
    });

    test('Validating invalid fuel should throw when fuel is other than FuelTypes Enum.', () => {
        expect(() => new CarRecord({
            ...testObj,
            fuel: 'benzynka' as any,
        })).toThrow('Nie udało się określić poprawnego rodzaju paliwa samochodu.');
    });

    test('Validating invalid gearbox should throw when gearbox is other than GearboxTypes Enum.', () => {
        expect(() => new CarRecord({
            ...testObj,
            gearbox: 'ałtomatyczna' as any,
        })).toThrow('Nie udało się określić poprawnej skrzyni biegów samochodu.');
    });

    test('Validating invalid bodyType should throw when bodyType is is other than BodyTypes Enum.', () => {
        expect(() => new CarRecord({
            ...testObj,
            bodyType: 'kupe' as any,
        })).toThrow('Nie udało się określić typu nadwozia samochodu.');
    });

    test('Validating invalid color should throw when color is empty.', () => {
        expect(() => new CarRecord({
            ...testObj,
            color: '',
        })).toThrow('Nie udało się określić koloru samochodu.');
    });

    test('Validating invalid accidentFree should throw when accidentFree is not a boolean.', () => {
        expect(() => new CarRecord({
            ...testObj,
            accidentFree: null,
        })).toThrow('Nie udało się określić bezwypadkowości samochodu.');
    });

    test('Validating invalid description should throw when description exist and is longer than 255 characters.', () => {
        let text = '';
        for (let i = 0; i <= 255; i++) {
            text += '-';
        }

        expect(() => new CarRecord({
            ...testObj,
            description: text,
        })).toThrow('Opis nie może być dłuższy niż 255 znaków.');
    });

});
