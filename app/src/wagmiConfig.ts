import { createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'  

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

console.log(chains)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
  
export default config