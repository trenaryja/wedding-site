import { differenceInMilliseconds } from 'date-fns'
import { useEffect, useState } from 'react'

const msInMinute = 1000 * 60
const msInHour = msInMinute * 60
const msInDay = msInHour * 24

export default function useCountdown(targetDate: Date) {
	const getDiff = () => differenceInMilliseconds(targetDate, new Date())
	const [ms, setMs] = useState(getDiff())

	useEffect(() => {
		const interval = setInterval(() => setMs(getDiff()), msInMinute)
		return () => clearInterval(interval)
	})

	const days = Math.floor(ms / msInDay)
	const hours = Math.floor((ms % msInDay) / msInHour)
	const minutes = Math.floor((ms % msInHour) / msInMinute)

	return [days, hours, minutes]
}
