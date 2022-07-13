import { FuelTypes } from './fuel-types';
import { GearboxTypes } from './gearbox-types';
import { BodyTypes } from './body-types';

export interface NewCarEntity extends Omit<CarEntity, 'id' | 'createdAt'> {
    id?: string;
    createdAt?: Date;
}

export interface SimpleCarEntity {
    id: string;
    adName: string;
    price: number;
}

export interface CarEntity extends SimpleCarEntity {
    brand: string;
    model: string;
    yearOfProduction: number;
    kilometrage: number;
    hp: number;
    fuel: FuelTypes;
    gearbox: GearboxTypes;
    bodyType: BodyTypes;
    color: string;
    accidentFree: boolean | Buffer;
    description: string | null;
    createdAt: Date;
}