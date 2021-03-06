import { Router } from 'express';
import { Source } from '../models';
import { $needAuth } from '../helpers';
import { getAll, getOne, createOne, updateOne, deleteOne } from './_common';

const router = Router()

router.use($needAuth);

router.get('/', getAll(Source));
router.get('/:id', getOne(Source));
router.post('/', createOne(Source));
router.put('/:id', updateOne(Source));
router.delete('/:id', deleteOne(Source));

export default router
