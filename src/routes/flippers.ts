import express from 'express';
import * as FlipperController from '../controllers/flippers';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', FlipperController.getAll);
router.get('/:id', FlipperController.getById);
router.post('/', upload.array('photos', 5), FlipperController.create);
router.put('/:id', upload.array('photos', 5), FlipperController.update);
router.delete('/:id', FlipperController.remove);

export default router;
