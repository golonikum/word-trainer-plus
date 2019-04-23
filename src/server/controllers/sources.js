import { Router } from 'express'
import Source from '../models/source'
import { $needAuth } from '../helpers';

const router = Router()

router.use($needAuth);

router.get('/', (req, res) => {
    const user = req.user;
    Source.find({ userId: user._id, languageId: user.languageId }, (err, items) => {
        res.status(200).json({ success: true, items })
    });
})

router.get('/:id', (req, res) => {
    Source.findOne({ _id: req.params.id }, (err, item) => {
        if (!item) {
            res.status(404).send('Not found');
        } else {
            res.status(200).json({ success: true, item });
        }
    });
})

router.post('/', (req, res) => {
	const name = req.body.name;
	const user = req.user;
	if (!name) {
		res.json({ success: false, message: 'Name can\'t be null' })
		return;
	}
    Source.findOne({ name, userId: user._id, languageId: user.languageId }, (err, item) => {
		// is name already in use?
		if (item) {			
			res.json({ success: false, message: 'Such name is already in use' })
			return;
		}
		// go ahead and create the new source
		else {
			Source.create({ name, userId: user._id, languageId: user.languageId }, (err, item) => {
				if (err) {
					console.error(err)
					res.json({ success: false, message: 'Server error' });
					return;
				}
				res.json({ success: true, id: item._id })
				return;
			});
		}
	});
})

router.put('/:id', (req, res) =>
    // dispatchAndRespond(req, res, {
    //     type: C.RATE_COLOR,
    //     id: req.params.id,
    //     rating: parseInt(req.body.rating)
    // })
    res.status(200).json({ success: true, value: 'update the language' })
)

router.delete('/:id', (req, res) =>
    // dispatchAndRespond(req, res, {
    //     type: C.REMOVE_COLOR,
    //     id: req.params.id
    // })
    res.status(200).json({ success: true, value: 'delete the language' })
)

export default router
