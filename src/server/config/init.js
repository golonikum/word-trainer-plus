import User from '../models/user';

export default function() {
    User.findOne({ role: 'admin' }, (err, user) => {
        if (!user) {
            const u = {
                email: 'goloniko@gmail.com',
                name: 'admin',
                password: process.env.ADMIN_PASSWORD || '123456',
                role: 'admin',
            };
            User.create(u, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console('Admin created in MongoDB.');
                }
            });
        }
    });
}
