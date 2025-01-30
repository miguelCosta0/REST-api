import multer from 'multer';
import multerConfig from '../config/multer.js';

import Photo from '../models/Photo.js';

const upload = multer(multerConfig).single('photo_name');

class PhotoController {
    store(req, res) {
       upload(req, res, async (err) => {
        if (err) return res.status(400).json({
            errors: [err.code]
        });

        try {
            const { originalname, filename } = req.file;
            const { aluno_id } = req.body;

            const photo = await Photo.create({
                original_name: originalname,
                file_name: filename,
                aluno_id
            })
            
            res.json(photo);
        } catch (err) {
            console.error(err);
            res.status(400).json({
                errors: ['student not found']
            })
        }
       })
    }
}

export default new PhotoController;