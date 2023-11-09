export const uploadJson = (data: unknown): Promise<string> => {
	const serialized = JSON.stringify(data)

	const url = serialized

	return Promise.resolve(url)
}
