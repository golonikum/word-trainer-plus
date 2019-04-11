import { Router } from 'express'
import Language from '../models/language'

const router = Router()

router.get('/', (req, res) => {
    Language.find({}, (err, langs) => {
        res.status(200).json({ success: true, value: langs })
    });
})

router.get('/:id', (req, res) => {
    Language.findOne({ _id: req.params.id }, (err, lang) => {
        if (!lang) {
            res.status(404).send('Not found');
        } else {
            res.status(200).json({ success: true, value: lang });
        }
    });
})

router.post('/', (req, res) => {
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
