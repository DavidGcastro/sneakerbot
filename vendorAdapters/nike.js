const { nike : productURL } = require('../productURL');
module.exports = {
	productURL,
	loginURL: 'nike.com',
	email: process.env.AMAZON_EMAIL || 'davidgcastro93@gmail.com',
	password: process.env.AMAZON_PASSWORD || 'hells16!boor',
	emailInputIdentifier: 'input[name=emailAddress]',
	passwordInputIdentifier: 'input[type=password]',
	addToCartIdentifier: 'input[name="submit.add-to-cart"]',
	cartURL: '',
	checkoutURL: '',
};
