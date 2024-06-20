import express from 'express';
import * as MarqueController from '../controllers/marques';

const router = express.Router();

router.get('/', MarqueController.getAll);
router.get('/:id', MarqueController.getById);
router.post('/', MarqueController.create);
router.put('/:id', MarqueController.update);
router.delete('/:id', MarqueController.remove);

export default router;
