import {Router} from 'express';

import loginRequired from '../middlewares/loginRequired.js';
import photoController from '../controllers/PhotoController.js';

const router = new Router();

router.post('/', loginRequired, photoController.store);
router.delete('/', loginRequired, photoController.delete);


export default router;