import users from './users';
import languages from './languages';
import sources from './sources';
import tags from './tags';

export default function (app) {
    app.post('/api/login', users.login);
    app.get('/api/logout', users.logout);
    app.post('/api/register', users.register);
    app.post('/api/language', users.language);

    app.use('/api/language', languages);
    app.use('/api/source', sources);
    app.use('/api/tag', tags);
}

