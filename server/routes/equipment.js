import express from 'express';
import {getEquipment, createEquipment, deleteEquipment} from '../controllers/equipment.js';
import equipment from '../models/equipment.js';

const router = express.Router();

router.get('/', getEquipment);
router.post('/', createEquipment);
router.delete('/:id', deleteEquipment);

export default router;