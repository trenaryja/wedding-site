export const chunk = <T>(a: Array<T>, n: number) => {
	if (n < 2) return [a]
	const result: T[][] = []
	let i = 0
	if (a.length % n === 0) {
		const size = Math.floor(a.length / n)
		while (i < a.length) result.push(a.slice(i, (i += size)))
		return result
	}
	while (i < a.length) {
		const size = Math.ceil((a.length - i) / n--)
		result.push(a.slice(i, (i += size)))
	}
	return result
}

export const fetchJson = async (input: RequestInfo, init?: RequestInit): Promise<unknown> => {
	const response = await fetch(input, init)
	const data = await response.json()
	if (response.ok) return data
	throw new Error(data.message || 'Unexpected error')
}
