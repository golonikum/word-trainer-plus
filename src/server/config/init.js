import User from '../models/user';
import Language from '../models/language';
import SpeechPart from '../models/speech_part';

export const DEFAULT_LANGUAGES = [
    { name: 'Английский', code: 'gb' },
    { name: 'Итальянский', code: 'it' },
];

export const SPEECH_PARTS = [
    { name: 'noun', code: 'n.', verbose: 'Существительное' },
    { name: 'adjective', code: 'adj.', verbose: 'Прилагательное' },
    { name: 'verb', code: 'v.', verbose: 'Глагол' },
    { name: 'adverb', code: 'adv.', verbose: 'Наречие' },
    { name: 'interjection', code: 'int.', verbose: 'Междометие' },
    { name: 'set phrase', code: 'phr.', verbose: 'Устойчивое выражение' },
    { name: 'preposition', code: 'prp.', verbose: 'Предлог' }
];

export default function() {
    SPEECH_PARTS.forEach((sp) => {
        SpeechPart.findOne({ name: sp.name }, (err, part) => {
            if (!part) {
                SpeechPart.create({
                    ...sp
                }, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Speech part "${sp.name}" successfully created in MongoDB.`);
                    }
                });
            }
        });
    });
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
