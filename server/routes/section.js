import express from 'express';
import {getSection, createSection, deleteSection} from '../controllers/section.js';
import section from '../models/section.js';

const router = express.Router();

router.get('/', getSection);
router.post('/', createSection);
router.delete('/:id', deleteSection);

export default router;