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
	const user = req.user;
    Source.findOne({ _id: req.params.id, userId: user._id, languageId: user.languageId }, (err, item) => {
        if (!item) {
            res.status(200).json({ success: false, message: 'Not found' });
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

router.put('/:id', (req, res) => {
   	const name = req.body.name;
	const user = req.user;
	const id = req.params.id;
	if (!name) {
		res.json({ success: false, message: 'Name can\'t be null' })
		return;
	}
    Source.findOne({ name, userId: user._id, languageId: user.languageId }, (err, item) => {
		// is name already in use?
		if (item && id != item._id) {			
			res.json({ success: false, message: 'Such name is already in use' })
			return;
		}
		// go ahead and update the source
		else {
			Source.findOne({ _id: id, userId: user._id, languageId: user.languageId }, (err, item) => {
				if (err) {
					console.error(err)
					res.json({ success: false, message: 'Source with such id does not exist' });
					return;
				}
				item.name = name;
				item.save((err) => {
					if (err) {
						console.error(err)
						res.json({ success: false, message: 'Server error' });
						return;
					}
					res.json({ success: true, id: item._id });
					return;
				})
			});
		}
	});
})

router.delete('/:id', (req, res) =>
    // dispatchAndRespond(req, res, {
    //     type: C.REMOVE_COLOR,
    //     id: req.params.id
    // })
    res.status(200).json({ success: true, value: 'delete the language' })
)

export default router
