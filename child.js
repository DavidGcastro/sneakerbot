const puppeteer = require('puppeteer-extra');
const process = require('process');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const adapter = require(`./vendorAdapters/${process.argv[2]}`);
const isProduction = process.argv[3];
const browserArgs = isProduction ? [] : [`--window-size=${1600},${1000}`];
const waitTime = 450;
const apiKey = process.env.RECAPTCHA || null;
let startTime;
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
	startTime = Date.now();
	browser = await puppeteer.launch({
		headless: true,
		args: browserArgs
	});
	page = await browser.newPage();
	await getProduct();
	await checkout();
};

const login = async () => {
	try {
		if (adapter.loginCookie) {
			await page.setCookie(adapter.loginCookie);
		}
		if (adapter.loginURLIdentifier) {
			await page.$eval(adapter.loginURLIdentifier, (el) => el.click());
		}
		await page.$eval(adapter.emailInputIdentifier, (el, email_) => el.value = email_, adapter.email);
		if (adapter.multistepLogin) {
			await page.keyboard.press(String.fromCharCode(13));
			await page.waitForNavigation();
		}
		await page.$eval(adapter.passwordInputIdentifier, (el, password_) => el.value = password_, adapter.password);
		await page.keyboard.press(String.fromCharCode(13));	
	} catch(e) {
		throw Error(e);
	}
};

const getProduct = async () => {
	try{
		await page.goto(adapter.productURL);
		if (adapter.additionalIdentifiers) {
			adapter.additionalIdentifiers.forEach( async identifier => {
				await page.$eval(identifier, (el) => el.click());
			});
		}
		await page.$eval(adapter.addToCartIdentifier, (el) => el.click());
		await page.waitFor(50);
	} catch(e){
		throw Error(e);
	}
};

const checkout = async (production = false) => {
	await page.goto(adapter.checkoutURL);
	await page.$eval(adapter.checkoutIdentifier, (el) => el.click());
	if(adapter.loginAtCheckout){
		await page.waitForNavigation();
		await login();
		await page.waitForNavigation();
	}
	if(production){
		await page.$eval(adapter.submitPaymentIdentifier, (el) => el.click());
	}
	console.log('Time Elapsed: ', (Date.now() - startTime) / 1000, ' Seconds.');
	await page.screenshot({ path: `./confirmations/${process.argv[2]}-${Date.now()}.png` });
	await browser.close();
};
initialize();
