import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.config.js';
import secrets from './config/secrets';
import configurePassport from './config/passport';
import configureExpress from './config/express';
import configureDB from './config/init';
import configureRoutes from './controllers';
import Language from  './models/language';
import { getUserState } from './controllers/users';

const app = express();

// -------------------------------------------

const connect = () => {
	mongoose.connect(secrets.db, (err, res) => {
		if (err) {
			console.log(`Error connecting to ${secrets.db}. ${err}`);
		} else {
			console.log(`Successfully connected to ${secrets.db}.`);
		}
	});
}
connect();

mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', connect);

// -------------------------------------------

const isDev = process.env.NODE_ENV === 'development';

// if in development mode set up the middleware required for hot reloading and rebundling
if (isDev) {
	app.use(webpackMiddleware(webpack(webpackConfig(process.env))));
}


// -------------------------------------------

configurePassport(app, passport);
configureExpress(app, passport);
configureDB();
configureRoutes(app);

// -------------------------------------------

const respond = async(req, res) => {
	let user = {};
	let languages = await Language.find({});
	if (req.isAuthenticated()) {
		const u = req.user;
		const state = await getUserState(u);
		user = Object.assign({}, {
			isWaiting: false, 
			authenticated: true,
			...state
		});
    }
	const appHTML =`
<!DOCTYPE html>
<html lang=''>
<head>
	<meta http-equiv='Content-Type' content='text/html;charset=utf-8' />
	<title>Word Trainer Plus</title>
	<link
		rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
		crossorigin="anonymous"
	/>
	<script>
		window.__USER = ${JSON.stringify(user)};
		window.__LANGUAGES = ${JSON.stringify(languages)};
	</script>
</head>
<body>
	<div id='app'></div>
	<script src='/bundle.js'></script>
</body>
</html>
`;
    res.status(200).send(appHTML)
}

app.use('/', respond);

const port = app.get('port');

// start listening to incoming requests
app.listen(port, (err) => {
	if (err) {
		console.err(err.stack);
	} else {
		console.log(`App listening on port ${port} [${process.env.NODE_ENV} mode]`);
	}
});
