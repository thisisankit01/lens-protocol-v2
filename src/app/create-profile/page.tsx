'use client'

import React, { useState } from 'react'
import {
	gql,
	ApolloClient,
	InMemoryCache,
	ApolloProvider
} from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { client } from '@/utils/graphAPI'

const CreateProfileChildren = ({ address }) => {
	const [status, setStatus] = useState('')
	const API_URL = 'https://api.lens.dev'

	const lensClient = new ApolloClient({
		uri: API_URL,
		cache: new InMemoryCache()
	})

	const [handle, setHandle] = useState('')

	const handleInputChange = (e) => {
		setHandle(e.target.value)
	}

	if ('dev') {
		loadDevMessages()
		loadErrorMessages()
	}

	const handleCreateProfile = async () => {
		try {
			const profileCreateResult = await lensClient.mutate({
				mutation: gql`
					mutation CreateProfile($handle: String!, $to: String!) {
						profileCreateResult: profileCreate(
							handle: $handle
							to: $to
						) {
							... on RelaySuccessFragment {
								txHash
								txId
							}
							... on CreateProfileWithHandleErrorResultFragment {
								reason
							}
						}
					}
				`,
				variables: {
					handle: handle,
					to: address
				}
			})

			const profileCreateResultValue =
				profileCreateResult.data.profileCreateResult

			if ('txId' in profileCreateResultValue) {
				setStatus(
					`Transaction to create a new profile with handle "${handle}" was successfully broadcasted with txId ${profileCreateResultValue.txId}`
				)
			} else {
				setStatus(`Something went wrong ${profileCreateResultValue}`)
			}
		} catch (error: any) {
			console.error('Error creating profile:', error)
			setStatus(`Error creating profile: ${error.message}`)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen space-y-8 max-w-lg">
			<input
				type="text"
				value={handle}
				onChange={handleInputChange}
				placeholder="Enter handle"
				className="border border-gray-400 rounded-lg p-2 text-gray-700"
			/>
			<button
				onClick={handleCreateProfile}
				className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-700"
			>
				Create Profile
			</button>
			<p className="text-white">status : {status}</p>
		</div>
	)
}

const CreateProfile = () => {
	return (
		<ApolloProvider client={client}>
			<CreateProfileChildren
				address={'0x226Ad244308E8b81996A0209487e41D88e29EFa6'}
			/>
		</ApolloProvider>
	)
}

export default CreateProfile
