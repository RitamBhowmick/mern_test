import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { upload, handleUpload, listTasksByAgent } from '../controllers/uploadController.js';

const router = Router(); 

router.post('/', auth, upload, handleUpload); 
router.get('/distributed', auth, listTasksByAgent); 

export default router;