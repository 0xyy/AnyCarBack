import { fuelTypes } from './fuel-types';
import { gearboxTypes } from './gearbox-types';
import { bodyTypes } from './body-types';

export interface NewCarEntity extends Omit<CarEntity, 'id'> {
    id?: string;
}

export interface SimpleCarEntity {
    id: string;
    brand: string;
    model: string;
    fullName: string;
    price: number;
}

export interface CarEntity extends SimpleCarEntity {
    yearOfProduction: number;
    mileage: number;
    hp: number;
    fuel: fuelTypes;
    gearbox: gearboxTypes;
    bodyType: bodyTypes;
    color: string;
    accidentFree: boolean;
    description: string;
}