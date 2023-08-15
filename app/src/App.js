import React from 'react';
import { Button } from 'antd';
import { ethers } from "ethers";
import { useEffect } from "react";

const ZombieOwnershipArtifact = require("./data/ZombieOwnership.json")
const contractAddress = require("./data/contract-address.json");

function Profile() {	

  const providerLocal = new ethers.JsonRpcProvider(`http://127.0.0.1:7545`)

  const privateKey = '0x68f0e3ca8658f142e047ef2a4d5453223876b2fba656fd1f7303bd10e2328a3d'
  const wallet = new ethers.Wallet(privateKey, providerLocal)
  
  const main = async () => {
  const zombieOwnership = new ethers.Contract(
    contractAddress.Counter,
    ZombieOwnershipArtifact.abi,
    wallet
  );

    console.log(zombieOwnership)
    
    const num = await zombieOwnership.getZombieNUm()
    const zombies = await zombieOwnership.getZombies()
    console.log(num)
    console.log((zombies[0].level))
  }

  const creatZombie = async () => {
    const zombieOwnership = new ethers.Contract(
    contractAddress.Counter,
    ZombieOwnershipArtifact.abi,
    await providerLocal.getSigner(0)
  );
    const res = await zombieOwnership.createRandomZombie('ikun')  
    console.log(res)
  }
  
	useEffect(() => {
    main()
  },[])
  return (
      <div>
      <Button onClick={creatZombie}>creatZombie</Button>
    </div>
  )

}

export default Profile;
