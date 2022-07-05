import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
import { BodyTypes, CarEntity, FuelTypes, GearboxTypes, NewCarEntity, SimpleCarEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { FieldPacket } from 'mysql2';

type CarRecordResult = [CarEntity[], FieldPacket[]];

export class CarRecord implements CarEntity {
    public id: string;
    public brand: string;
    public model: string;
    public adName: string;
    public price: number;
    public yearOfProduction: number;
    public kilometrage: number;
    public hp: number;
    public fuel: FuelTypes;
    public gearbox: GearboxTypes;
    public bodyType: BodyTypes;
    public color: string;
    public accidentFree: boolean | Buffer;
    public description: string;

    constructor({
        id,
        brand,
        model,
        adName,
        price,
        yearOfProduction,
        kilometrage,
        hp,
        fuel,
        gearbox,
        bodyType,
        color,
        accidentFree,
        description
    }: NewCarEntity) {
        if (!brand || brand.length > 20) {
            throw new ValidationError('Marka samochodu nie może być pusta, ani przekraczać 20 znaków');
        }

        if (!model || model.length > 50) {
            throw new ValidationError('Model samochodu nie może być pusty, ani przekraczać 50 znaków');
        }

        if (!adName || adName.length > 70) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 70 znaków');
        }

        if (price < 0 || price > 10000000) {
            throw new ValidationError('Cena samochodu nie może być ujemna i nie może przekraczać 10 000 000 PLN.');
        }

        if (!yearOfProduction || typeof yearOfProduction !== 'number') {
            throw new ValidationError('Nie udało się określić poprawnego roku produkcji samochodu.');
        }

        if (!kilometrage || typeof kilometrage !== 'number') {
            throw new ValidationError('Nie udało się określić poprawnego przebiegu samochodu.');
        }

        if (!hp || typeof hp !== 'number') {
            throw new ValidationError('Nie udało się określić poprawnej mocy (km) samochodu.');
        }

        if (!fuel || !Object.values(FuelTypes).includes(fuel as unknown as FuelTypes)) {
            throw new ValidationError('Nie udało się określić poprawnego rodzaju paliwa samochodu.');
        }

        if (!gearbox || !Object.values(GearboxTypes).includes(gearbox as unknown as GearboxTypes)) {
            throw new ValidationError('Nie udało się określić poprawnej skrzyni biegów samochodu.');
        }

        if (!bodyType || !Object.values(BodyTypes).includes(bodyType as unknown as BodyTypes)) {
            throw new ValidationError('Nie udało się określić typu nadwozia samochodu.');
        }

        if (!color || typeof color !== 'string') {
            throw new ValidationError('Nie udało się określić koloru samochodu.');
        }

        let boolAccidentFree;
        if (typeof accidentFree !== 'boolean') {
            boolAccidentFree = !!Buffer.from(accidentFree as any).readInt8();
            if (typeof boolAccidentFree !== 'boolean') {
                throw new ValidationError('Nie udało się określić bezwypadkowości samochodu.');
            }
        }

        if (description && description.length > 255) {
            throw new ValidationError('Opis nie może być dłuższy niż 255 znaków.');
        }

        this.id = id;
        this.brand = brand;
        this.model = model;
        this.adName = adName;
        this.price = price;
        this.yearOfProduction = yearOfProduction;
        this.kilometrage = kilometrage;
        this.hp = hp;
        this.fuel = fuel;
        this.gearbox = gearbox;
        this.bodyType = bodyType;
        this.color = color;
        this.accidentFree = boolAccidentFree ?? accidentFree;
        this.description = description === '' ? null : description;
    }

    static async getAll(adName: string): Promise<SimpleCarEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `cars` WHERE `adName` LIKE :search;", {
            search: `%${adName}%`,
        }) as CarRecordResult;

        return results.map(result => {
            const {
                id,
                brand,
                model,
                adName,
                price,
            } = result;

            return {
                id,
                brand,
                model,
                adName,
                price: +price.toFixed(2),
            };
        });
    }

    static async getOne(id: string): Promise<CarEntity | null> {
        const [results] = await pool.execute("SELECT * FROM `cars` WHERE `id` = :id;", {
            id,
        }) as CarRecordResult;

        return results.length === 0 ? null : new CarRecord(results[0]);
    }

    async add(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Nie można dodać elementu który został już dodany.');
        }

        await pool.execute("INSERT INTO `cars` (`id`, `brand`, `model`, `adName`, `price`, `yearOfProduction`, `kilometrage`, `hp`, `fuel`, `gearbox`, `bodyType`, `color`, `accidentFree`, `description`) VALUES (:id, :brand, :model, :adName, :price, :yearOfProduction, :kilometrage, :hp, :fuel, :gearbox, :bodyType, :color, :accidentFree, :description);", this);
    }
}