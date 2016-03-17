'use strict';
const express = require('express');
const bodyparser = require('body-parser')
const locallydb = require('locallydb');
const shortid = require('shortid');
const db = new locallydb('shortydb');
const links = db.collection('links');
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
app.use(express.static('static'));
app.get('/create/*', (req, res) => {
		let existent = links.where({link: req.params[0]}).items[0];
		if(existent) {
			res.json({
				link: existent.link,
				short: existent.short,
			});
		} else {
			let data = {
				link: req.params[0],
				short: shortid.generate(),
			};
			res.json(data);
			links.insert(data);
		}
	});
app.get('/go/*', (req, res) => {
		let existent = links.where({short: req.params[0]}).items[0];
		if(existent) {
			res.redirect(existent.link);
		} else {
			res.json({
				error: 'link',
			});
		}
	});
app.listen(8080, () => {
		console.log('Server running on port 8080.')
	});
