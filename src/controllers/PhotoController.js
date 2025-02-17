import multer from 'multer';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import path from 'path';
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

  async delete(req, res) {
    const { file_name } = req.body;
    const filePath = path.resolve(
      import.meta.dirname, '..', '..', 'uploads', 'images', file_name
    );

    if (!file_name || !fs.existsSync(filePath)) {
      return res.status(400).json({
        errors: ['file not found']
      });
    }

    await fsPromises.rm(filePath);

    return res.status(200).json('photo successfully removed');
  }
}

export default new PhotoController;