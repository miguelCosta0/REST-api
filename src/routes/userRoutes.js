import {Router} from 'express';
import UserController from '../controllers/UserController.js';

import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

//router.get('/',UserController.index); // Não existe em uma aplicação real
//router.get('/', UserController.show); // Não existe em uma aplicação real


router.post('/', UserController.create);
router.patch('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;
