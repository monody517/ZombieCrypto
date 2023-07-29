import { useAccount, useConnect, useEnsName,useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
 
function Profile() {
  const { address, isConnecting, status } = useAccount()
  const { connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const balance = useBalance({
    addressOrName: address,
    formatUnits: 'ether',
  });

  return (
      <div>
      <ul>
        {status === 'connected' ? <li>{status}</li>:<button onClick={() => connect()}>Connect Wallet</button>}
        <h3>Current connector: {connector?.name || 'None'}</h3>
        <li>Address: {address}</li>
        <li>Connecting status: {status}</li>
        <li>balance: {balance.data?.formatted || '-'}</li>
      </ul>
    </div>
  )

}

export default Profile;
