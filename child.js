const puppeteer = require('puppeteer-extra');
const process = require('process');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const adapter = require('./vendorAdapters/amazon');
const waitTime = 450;
const { loginURL, email, password, passwordInputIdentifier, emailInputIdentifier, addToCartIdentifier, checkoutURL, cartURL, productURL } = adapter;
const apiKey = process.env.RECAPTCHA || null;
let page;
let browser;
puppeteer.use(StealthPlugin());
puppeteer.use(
	RecaptchaPlugin({
		provider: {
			id: '2captcha',
			token: apiKey,
		},
		visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
	})
);
const initialize = async () => {

	await login();
	await getProduct();
	
};

const login = async () => {
	try{
		browser = await puppeteer.launch({
			headless: false, args: [`--window-size=${1600},${1000}`, '--no-sandbox', '--disable-setuid-sandbox'],
		});
		page = await browser.newPage();
		await page.goto(loginURL, { waitUntil: 'networkidle2' });
		await page.$eval(emailInputIdentifier, (el, email_) => el.value = email_, email);
		await page.keyboard.press(String.fromCharCode(13));
		await page.waitForNavigation();
		await page.$eval(passwordInputIdentifier, (el, password_) => el.value = password_, password);
		await page.keyboard.press(String.fromCharCode(13));
		await page.waitFor(waitTime * 80);
	} catch(e) {
		throw Error(e);
	}
};

const getProduct = async () => {
	try{
		await page.goto(productURL, { waitUntil: 'networkidle2' });
		await page.$eval(addToCartIdentifier, (el) => el.click());
		await page.waitFor(waitTime);
		await page.goto(cartURL, { waitUntil: 'networkidle2' });
		await page.waitFor(waitTime);
		await page.goto(checkoutURL, { waitUntil: 'networkidle2' });
		await page.waitFor(waitTime);
		await browser.close();
	} catch(e){
		throw Error(e);
	}
};
initialize();
