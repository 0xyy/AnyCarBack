import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { ImageRecord } from '../records/image.record';

export const imageRouter = Router()

    .get('/:id', async (req, res) => {
        const path = await ImageRecord.getPath(req.params.id);

        res.json(path);
    })

    .post('/upload/:fileName', async (req, res) => {
        try {
            const file = req.files.file as UploadedFile;

            const fileName = req.params.fileName + path.extname(file.name);

            const newImage = await new ImageRecord({
                imageId: req.params.fileName,
                imagePath: fileName,
            });
            await newImage.insert();

            const filePath = `${__dirname}/../public/images/${fileName}`;

            file.mv(filePath, (err) => {
                if (err) {
                    return res.send(err);
                }
            });

            return res.json(fileName);
        } catch (err) {
            return err;
        }
    });