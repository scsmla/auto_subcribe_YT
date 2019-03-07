const fs = require('fs');
const puppeteer = require('puppeteer');

const channelUrl = ''

//Maybe change in the future when google change their layout
const ID = {
	login: 'input',
	pass: 'input'
};

const sleep = async (ms) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res();
			}, ms)
		});
	}

async function setUserAgent(agent, page) {
	await page.setUserAgent(agent);
}

async function loginGoogle(page, username, password) {
	await page.goto('https://accounts.google.com', {
	  waitUntil: 'networkidle2'
	});

	await page.waitForSelector(ID.login);
	await page.type(ID.login, username);
	await sleep(500);
	await page.click(".RveJvd")

	//This code maybe doesnt work when network is slow
	
	await sleep(1000);
	await page.waitForSelector(ID.pass);
	await page.type(ID.pass, password);

	await page.click(".RveJvd")
	await page.waitForNavigation();
	
}

async function subcribeYoutubeChannnel(page, url) {
	await page.goto(url, {
	  waitUntil: 'networkidle2'
	});
	//Maybe not work when fb changes their layout
	await page.waitForSelector("#subscribe-button");
	await sleep(500);
	await page.click("#subscribe-button")

	console.log('done')
}

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	const page = await browser.newPage();

	const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
	  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';

	await setUserAgent(userAgent, page);

	await loginGoogle(page, '','');
	
	await subcribeYoutubeChannnel(page, 'https://www.youtube.com/channel/UC5mzpqa98hIFlQ9SFxqAilw')

})();