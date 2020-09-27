const { nike : productURL } = require('../productURL');
module.exports = {
	productURL,
	loginURL: 'https://nike.com',
	email: process.env.NIKE_EMAIL,
	password: process.env.NIKE_PASSWORD,
	emailInputIdentifier: 'input[name=emailAddress]',
	passwordInputIdentifier: 'input[name=password]',
	addToCartIdentifier: '[aria-label="Add to Bag"]',
	additionalIdentifiers: ['input[value="25024120:9.5"]'],
	loginURLIdentifier: '[data-var="loginBtn"]',
	cartURL: 'https://www.nike.com/us/en/cart',
	multistepLogin: false,
	checkoutURL: 'https://www.nike.com/checkout',
	// loginCookie: {
	// 	name: '_abck',
	// 	value: 'COOKIE HERE',
	// },
};
