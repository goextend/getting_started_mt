require('dotenv').config();

let extendHost = 'https://sandbox.auth0-extend.com';

const request = require('request');

module.exports = function(app) {

	//simple auth middleware
	app.use((req, res, next) => {
		if(!req.session.user && req.path !== '/login') {
			res.redirect('/login');
		} else {
			next();
		}
	});

	app.get('/login', (req, res) => {
		res.render('login');
	});

	app.get('/logout', (req, res) => {
		req.session.destroy();
		res.redirect('/login');
	});

	app.post('/login', (req, res) => {
		let username = req.body.username;
		let password = req.body.password;
		/*
		Fake auth
		*/
		if(username === 'user1') {
			req.session.user = 'user1';
			req.session.token = process.env.USER1_TOKEN;
			req.session.container = process.env.USER1_CONTAINER;
		} else if(username === 'user2') {
			req.session.user = 'user2';
			req.session.token = process.env.USER2_TOKEN;
			req.session.container = process.env.USER2_CONTAINER;
		} else {
			res.redirect('/login');
		}

		//only here for valid logins
		req.session.extendURL = `https://${req.session.container}.sandbox.auth0-extend.com/`;

		/*
		If you define process.env.EXTEND_HOST, you are a starter account, 
		otherwise you are freemium, which is still cool!
		*/
		if(process.env.EXTEND_HOST) {
			extendHost = process.env.EXTEND_HOST;
			req.session.extendURL = extendHost.replace('https://', `https://${req.session.container}.`)+'/';
		}
		res.redirect('/');

	});

	app.get('/', (req, res) => {
		res.render('index', { nav:'home' });
	});
	
	app.get('/settings', (req, res) => {
		res.render('settings', { 
			nav:'settings',
			container:req.session.container,
			host:extendHost,
			token:req.session.token
		});
	});
	
	app.post('/api/leads',  (req, res) => {
		let data = req.body;
		// this is where - normally - a process of somesort would persist the value
		// data.created is simply demonstrating a server-side change
		data.created = new Date();

		let options = {
			method:'POST',
			url:req.session.extendURL +'saveLead',
			json:data
		};

		request(options, (error, response, body) => {
			if(error) throw new Error(error);
			res.json(body);
		});

	});

};