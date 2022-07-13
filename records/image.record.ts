import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';
import { ImageEntity, NewImageEntity } from '../types/image/image-entity';

type ImageRecordResult = [ImageEntity[], FieldPacket[]];

export class ImageRecord implements ImageEntity {
    public id: string;
    public imageId: string;
    public imagePath: string;

    constructor(obj: NewImageEntity) {
        this.id = obj.id;
        this.imageId = obj.imageId;
        this.imagePath = obj.imagePath;
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `images` (`id`, `imageId`, `imagePath`) VALUES (:id, :imageId, :imagePath);", this);
    }

    static async getPath(id: string): Promise<string> {
        const [results] = await pool.execute("SELECT `imagePath` FROM `images` WHERE `imageId` = :id;", {
            id,
        }) as ImageRecordResult;

        return results[0].imagePath;
    }
}