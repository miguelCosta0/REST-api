import {Router} from 'express'

import loginRequired from '../middlewares/loginRequired.js';
import alunoController from '../controllers/AlunoController.js';

const router = new Router();

router.get('/', alunoController.index); 
router.post('/', loginRequired, alunoController.store); 
router.get('/:id', alunoController.show); 
router.patch('/:id', loginRequired, alunoController.update); 
router.delete('/:id', loginRequired, alunoController.delete); 


export default router;