const {amazon : productURL} =  require('../productURL');
module.exports = {
	productURL,
	loginURL: 'https://www.amazon.com/ap/signin?openid.pape.max_auth_age=100000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fwishlist%3Fref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&',
	email : process.env.AMAZON_EMAIL,
	password : process.env.AMAZON_PASSWORD,
	emailInputIdentifier : 'input[type=email]',
	passwordInputIdentifier : 'input[type=password]',
	addToCartIdentifier : 'input[name="submit.add-to-cart"]',
	cartURL: 'https://www.amazon.com/gp/cart/view.html?ref_=nav_cart',
	checkoutURL : 'https://www.amazon.com/gp/buy/spc/handlers/display.html',
};
