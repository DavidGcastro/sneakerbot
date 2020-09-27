const puppeteer = require('puppeteer-extra');
const process = require('process');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const adapter = require(`./vendorAdapters/${process.argv[2]}`);
const waitTime = 450;
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
	console.log('Starting Child Process...');
	await login();
	await getProduct();
	await checkout();
};

const login = async () => {
	try{
		browser = await puppeteer.launch({
			headless: false, 
			args: [`--window-size=${1600},${1000}`],

		});
		page = await browser.newPage();
		await page.goto(adapter.loginURL, { waitUntil: 'networkidle2' });
		if(adapter.loginCookie){
			await page.setCookie(adapter.loginCookie);
		}
		if(adapter.loginURLIdentifier){
			await page.$eval(adapter.loginURLIdentifier, (el) => el.click());
		}
		await page.$eval(adapter.emailInputIdentifier, (el, email_) => el.value = email_, adapter.email);
		if(adapter.multistepLogin){
			await page.keyboard.press(String.fromCharCode(13));
			await page.waitForNavigation();
		}
		await page.$eval(adapter.passwordInputIdentifier, (el, password_) => el.value = password_, adapter.password);
		await page.keyboard.press(String.fromCharCode(13));	
		await page.waitFor(waitTime);
	} catch(e) {
		throw Error(e);
	}
};

const getProduct = async () => {
	try{
		await page.goto(adapter.productURL, { waitUntil: 'networkidle2' });
		if (adapter.additionalIdentifiers) {
			adapter.additionalIdentifiers.forEach( async identifier => {
				await page.$eval(identifier, (el) => el.click());
			});
		}
		await page.$eval(adapter.addToCartIdentifier, (el) => el.click());
		await page.waitFor(waitTime);
		await page.goto(adapter.cartURL, { waitUntil: 'networkidle2' });
		await page.waitFor(waitTime);
		await page.goto(adapter.checkoutURL, { waitUntil: 'networkidle2' });
		await page.waitFor(waitTime);
		await browser.close();
	} catch(e){
		throw Error(e);
	}
};

const checkout = async () => {return;};
initialize();
