import chrome from 'chrome-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-core'
import { withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { albumId } = req.query

	const options = process.env.AWS_REGION
		? {
				args: chrome.args,
				executablePath: await chrome.executablePath,
				headless: chrome.headless,
		  }
		: {
				args: [],
				executablePath:
					process.platform === 'win32'
						? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
						: process.platform === 'linux'
						? '/usr/bin/google-chrome'
						: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		  }

	const browser = await puppeteer.launch(options)

	const page = await browser.newPage()
	await page.setViewport({ width: 1920, height: 99999 })
	await page.goto(`https://photos.app.goo.gl/${albumId}`, { waitUntil: 'networkidle2' })

	const imageUrls = await page.evaluate(() => {
		const regex = /https:\/\/lh3\.googleusercontent\.com\/pw\/.*?=w/g
		const links = Array.from(document.body.innerHTML.matchAll(regex), (match) => `${match[0]}500`)
		return links.filter((link, index, self) => self.indexOf(link) === index)
	})

	await browser.close()
	res.json(imageUrls)
}

export default withSessionRoute(handler)
