import User from '../models/user';
import Language from '../models/language';

export const DEFAULT_LANGUAGES = [
    'English',
    'Italian',
];

export default function() {
    DEFAULT_LANGUAGES.forEach((lang) => {
        Language.findOne({ name: lang }, (err, language) => {
            if (!language) {
                Language.create({
                    name: lang,
                }, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Language "${lang}" successfully created in MongoDB.`);
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
