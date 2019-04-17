import passport from 'passport'
import User from '../models/user'
import Language from '../models/language'

// -------------------------------------------

exports.login = function(req, res, next) {

	// Do email and password validation for the server
	passport.authenticate('local', function(err, user, info) {
		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })			
		}
		// ***********************************************************************
		// 'Note that when using a custom callback, it becomes the application's
		// responsibility to establish a session (by calling req.login()) and send
		// a response.'
		// Source: http://passportjs.org/docs
		// ***********************************************************************		
		// Passport exposes a login() function on req (also aliased as logIn())
		// that can be used to establish a login session		
		req.logIn(user, async(loginErr) => {
			if (loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			const lang = await Language.findOne({ _id: user.languageId });
			return res.json({ 
				success: true, 
				message: 'authentication succeeded', name: user.name, role: user.role, email: user.email, language: lang });
		})
	})(req, res, next);

}

// -------------------------------------------

exports.logout = function(req, res, next) {

	// the logout method is added to the request object automatically by Passport
	req.logout();
	return res.json({ success: true })

}

// -------------------------------------------

exports.register = function(req, res, next) {
	
	User.findOne({ email: req.body.email }, (err, user) => {
		// is email address already in use?
		if (user) {			
			res.json({ success: false, message: 'Email already in use' })
			return 
		}
		// go ahead and create the new user
		else {
			req.body.role = 'user';
			Language.findOne({}, (err, language) => {
				if (err) {
					console.error(err)
					res.json({ success: false, message: 'There is no languages in DB' })
					return
				}
				req.body.languageId = language._id;
				User.create(req.body, (err) => {
					if (err) {
						console.error(err)
						res.json({ success: false })
						return
					}
					res.json({ success: true })
					return 
				});
			});
		}
	})

}

exports.language =  function(req, res, next) {
	
	User.findOne({ email: req.body.email }, (err, user) => {
		// is email address already in use?
		if (!user) {			
			res.json({ success: false, message: 'No such user' })
			return 
		}
		// go ahead and create the new user
		else {
			Language.findOne({ _id: req.body.languageId }, (err, language) => {
				if (!language) {
					console.error(err)
					res.json({ success: false, message: 'There is no such language in DB' })
					return
				}
				user.languageId = language._id;
				user.save((err) => {
					if (err) {
						console.error(err)
						res.json({ success: false })
						return
					}
					res.json({ success: true, language, })
					return 
				})
			});
		}
	})

}