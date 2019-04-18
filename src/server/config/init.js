import User from '../models/user';
import Language from '../models/language';

export const DEFAULT_LANGUAGES = [
    { name: 'English', code: 'gb' },
    { name: 'Italian', code: 'it' },
];

export default function() {
    DEFAULT_LANGUAGES.forEach((lang) => {
        Language.findOne({ name: lang.name }, (err, language) => {
            if (!language) {
                Language.create({
                    ...lang
                }, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Language "${lang.name}" successfully created in MongoDB.`);
                    }
                });
            }
        });
    });
    User.findOne({ role: 'admin' }, (err, user) => {
        if (!user) {
            User.create({
                email: process.env.ADMIN_EMAIL || 'admin@golonikum.com',
                name: 'admin',
                password: process.env.ADMIN_PASSWORD || '123456',
                role: 'admin',
            }, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Admin successfully created in MongoDB.');
                }
            });
        }
    });
}
