import { decrypt, getSession, notionClient, parseBody, updateSession } from '@/utils/server'
import { addMinutes, format } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const bodySchema = z.object({ otp: z.string() })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const body = parseBody(bodySchema, req, res)
	if (!body) return
	const { otp } = body
	const session = await getSession(req, res)

	if (!otp) {
		res.status(400).json({ message: 'Missing passcode' })
		return
	}

	if (!session.data?.otp) {
		res.status(400).json({ message: 'Passcode timed out. Go back and try again' })
		return
	}

	if (decrypt(session.data.otp) !== otp) {
		res.status(400).json({ message: 'Passcode incorrect. Try again' })
		return
	}

	const { user } = session.data
	if (!user) {
		res.status(400).json({ message: 'No guest on this session. Go back and try again' })
		return
	}

	const properties = {
		...user.properties,
		LastLogin: { date: { start: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") } },
	}
	await notionClient.pages.update({ page_id: user.id, properties })

	const { otp: _oldOtp, ...currentSession } = session.data
	const timeout = addMinutes(new Date(), 2).toISOString()
	await updateSession(req, res, { ...currentSession, isLoggedIn: true, timeout })
}

export default handler
