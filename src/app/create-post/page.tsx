'use client'

import CreateTextPost from '@/components/createPost'
import { config } from '@/utils/config'
import { lensConfig } from '@/utils/lensConfig'
import { LensProvider } from '@lens-protocol/react-web'
import React from 'react'
import { WagmiConfig } from 'wagmi'

const page = () => {
	return (
		<>
			<WagmiConfig config={config}>
				<LensProvider config={lensConfig}>
					<CreateTextPost publisher={undefined} />
				</LensProvider>
			</WagmiConfig>
		</>
	)
}

export default page
