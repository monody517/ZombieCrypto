import { createConfig, configureChains, Chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'  

const localChain: Chain = {
  id: 1337,
  name: "Local",
  network: "Local",
  nativeCurrency: {
    name: "Noah",
    symbol: "NOAH",
    decimals: 18,
  },
  rpcUrls: {
     public: { http: ['http://127.0.0.1:7545'] },
    default: {http: ["http://127.0.0.1:7545"]},
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localChain],
  [publicProvider()],
)

console.log(chains)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
  
export default config