import { Router } from 'express'
import Source from '../models/source'
import { $needAuth } from '../helpers';

const router = Router()

router.use($needAuth);

router.get('/', (req, res) => {
    const user = req.user;
    Source.find({ userId: user._id, languageId: user.languageId }, (err, items) => {
        res.status(200).json({ success: true, data: items })
    });
})

router.get('/:id', (req, res) => {
    Source.findOne({ _id: req.params.id }, (err, item) => {
        if (!item) {
            res.status(404).send('Not found');
        } else {
            res.status(200).json({ success: true, data: item });
        }
    });
})

router.post('/', (req, res) => {
    Source.findOne({ email: req.body.email }, (err, user) => {
		// is email address already in use?
		if (user) {			
			res.json({ success: false, message: 'Email already in use' })
			return 
		}
		// go ahead and create the new user
		else {
			req.body.role = 'user';
			Source.findOne({}, (err, language) => {
				if (err) {
					console.error(err)
					res.json({ success: false, message: 'There is no languages in DB' })
					return
				}
				req.body.languageId = language._id;
				Source.create(req.body, (err) => {
					if (err) {
						console.error(err)
						res.json({ success: false })
						return
					}
					res.json({ success: true })
					return 
				});
			});
		}
	})



    res.status(200).json({ success: true, value: 'add new language' })
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
