import users from './users';
import languages from './languages';

export default function (app) {
    app.post('/login', users.login);
    app.get('/logout', users.logout);
    app.post('/register', users.register);

    app.use('/language', languages);
}

