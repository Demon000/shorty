'use strict';
const express = require('express');
const bodyparser = require('body-parser')
const locallydb = require('locallydb');
const shortid = require('shortid');
const db = new locallydb('shortydb');
const links = db.collection('links');
require('dotenv').load();
const app = express();

function clean(s)
{
	return '//' + s.replace(/http:\/\/|https:\/\/|\/\//g, '');
}

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
app.use(express.static('static'));
app.get('/create/*', (req, res) => {
		let cleans = clean(req.params[0]);
		let existent = links.where({link: cleans}).items[0];
		if(existent) {
			res.json({
				link: existent.link,
				short: existent.short,
			});
		} else {
			let data = {
				link: cleans,
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
app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}.`)
	});
