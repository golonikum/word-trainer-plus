import { Router } from 'express';
import { Tag } from '../models';
import { $needAuth } from '../helpers';
import { getAll, getOne, createOne, updateOne, deleteOne } from './_common';

const router = Router()

router.use($needAuth);

router.get('/', getAll(Tag));
router.get('/:id', getOne(Tag));
router.post('/', createOne(Tag));
router.put('/:id', updateOne(Tag));
router.delete('/:id', deleteOne(Tag));

export default router
