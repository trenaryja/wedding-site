import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import { withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { albumId } = req.query
	const browser = await puppeteer.launch({ headless: 'new' })
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
