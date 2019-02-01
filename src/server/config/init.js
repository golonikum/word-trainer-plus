import User from '../models/user';

export default function() {
    User.findOne({ role: 'admin' }, (err, user) => {
        if (!user) {
            const u = {
                email: process.env.ADMIN_EMAIL || 'admin@golonikum.com',
                name: 'admin',
                password: process.env.ADMIN_PASSWORD || '123456',
                role: 'admin',
            };
            User.create(u, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Admin successfully created in MongoDB.');
                }
            });
        }
    });
}
