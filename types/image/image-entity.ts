export interface NewImageEntity extends Omit<ImageEntity, 'id'> {
    id?: string;
}

export interface ImageEntity {
    id: string;
    imageId: string;
    imagePath: string;
}