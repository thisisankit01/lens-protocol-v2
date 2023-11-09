'use client'

import React from 'react'
import Home from './feed/page'
import { WagmiConfig } from 'wagmi'
import { LensProvider } from '@lens-protocol/react-web'
import { config } from '@/utils/config'
import { lensConfig } from '@/utils/lensConfig'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import CreateProfileComponent from './create-profile/page'

const client = new ApolloClient({
	uri: 'https://api.lens.dev',
	cache: new InMemoryCache()
})

const page = () => {
	// const apolloClient = useApolloClient()
	return (
		<>
			<Home />
		</>
	)
}

export default page
