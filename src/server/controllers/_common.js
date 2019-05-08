export function getAll(model) {
    return (req, res) => {
        const user = req.user;
        model.find({ userId: user._id, languageId: user.languageId }, (err, items) => {
            res.status(200).json({ success: true, items })
        });
    };
};

export function getOne(model) {
    return (req, res) => {
        const user = req.user;
        model.findOne({ _id: req.params.id, userId: user._id, languageId: user.languageId }, (err, item) => {
            if (!item) {
                res.status(200).json({ success: false, message: 'Not found' });
            } else {
                res.status(200).json({ success: true, item });
            }
        });
    }
};

export function createOne(model) {
    return (req, res) => {
        const name = req.body.name;
        const user = req.user;
        if (!name) {
            res.json({ success: false, message: 'Name can\'t be null' })
            return;
        }
        model.findOne({ name, userId: user._id, languageId: user.languageId }, (err, item) => {
            if (item) {			
                res.json({ success: false, message: 'Such name is already in use' })
                return;
            } else {
                model.create({ name, userId: user._id, languageId: user.languageId }, (err, item) => {
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
    }
};

export function updateOne(model) {
    return (req, res) => {
        const name = req.body.name;
        const user = req.user;
        const id = req.params.id;
        if (!name) {
            res.json({ success: false, message: 'Name can\'t be null' })
            return;
        }
        model.findOne({ name, userId: user._id, languageId: user.languageId }, (err, item) => {
            if (item && id != item._id) {			
                res.json({ success: false, message: 'Such name is already in use' })
                return;
            } else {
                model.findOne({ _id: id, userId: user._id, languageId: user.languageId }, (err, item) => {
                    if (err) {
                        console.error(err)
                        res.json({ success: false, message: 'Not found' });
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
    }
};

export function deleteOne(model) {
    return (req, res) => {
        const user = req.user;
        const id = req.params.id;
        model.findOne({ _id: id, userId: user._id, languageId: user.languageId }, (err, item) => {
            if (!item) {
                res.json({ success: false, message: 'Not found' });
            } else {
                item.remove((err) => {
                    if (err) {
                        console.error(err)
                        res.json({ success: false, message: 'Server error' });
                        return;
                    }
                    res.json({ success: true });
                    return;
                });
            }
        });
    }
};
