import express from 'express';
import {getSoldiers, createSoldier, deleteSoldier} from '../controllers/soldier.js';
import soldier from '../models/soldier.js';

const router = express.Router();

router.get('/', getSoldiers);
router.post('/', createSoldier);
router.delete('/:id', deleteSoldier);

export default router;