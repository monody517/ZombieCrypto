import { ethers } from "ethers";
import { useEffect } from "react";

const ZombieOwnershipArtifact = require("./data/ZombieOwnership.json")
const contractAddress = require("./data/contract-address.json");

function Profile() {	

  const providerLocal = new ethers.JsonRpcProvider(`http://127.0.0.1:7545`)
  

  
  const main = async () => {
  const zombieOwnership = new ethers.Contract(
    contractAddress.Counter,
    ZombieOwnershipArtifact.abi,
    await providerLocal.getSigner(0)
  );
    
    console.log(zombieOwnership)
    // await zombieOwnership.createRandomZombie('ikun')
    const num = zombieOwnership.ownerZombieCount
    console.log(num)
  // const a = await _Contract._generateRandomDna()
  // console.log(a)
}
  
	useEffect(() => {
    main()
  },[])
  return (
      <div>
      111
    </div>
  )

}

export default Profile;
