import multer from "multer";
import path from 'path'

function rand () {
    return Math.floor(Math.random() * 10000) + 10000;
}

export default {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${path.resolve(import.meta.dirname, '..', '..', 'uploads', 'images')}`);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${rand()}${path.extname(file.originalname)}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);

        if (fileExt !== '.jpeg' && fileExt !== '.png') {
            return cb(new multer.MulterError('unexpected file'), false);
        }
            cb(null, true);
    }
}