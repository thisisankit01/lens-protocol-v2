import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { publicProvider } from 'wagmi/providers/public'

const { publicClient, webSocketPublicClient } = configureChains(
	[polygonMumbai, polygon],
	[publicProvider()]
)

export const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
	connectors: [
		new InjectedConnector({
			options: {
				shimDisconnect: false
			}
		})
	]
})
