import React from 'react';
import { Button } from 'antd';
import { ethers } from "ethers";
import { useEffect } from "react";

const ZombieOwnershipArtifact = require("./data/ZombieOwnership.json")
const contractAddress = require("./data/contract-address.json");

const Profile = () => {	

  const providerLocal = new ethers.JsonRpcProvider(`http://127.0.0.1:7545`)

  const privateKey = '0x4de1f8da7e0d1e4779ba02187347b2ed86edde83a328e20acd694950e86654da'
  const wallet = new ethers.Wallet(privateKey, providerLocal)

  const getSign = async () => {
   return await providerLocal.getSigner(0)
  }

  const zombieOwnership = new ethers.Contract(
    contractAddress.Counter,
    ZombieOwnershipArtifact.abi,
    wallet
  );
  
  const main = async () => {



    console.log(wallet)
    console.log(zombieOwnership)
    
    
    const num = await zombieOwnership.getZombieNUm()
    const zombies = await zombieOwnership.getZombies()
    console.log(num)
    console.log(zombies[0].name)
  }

  const creatZombie = async () => {
    try {
      const res = await zombieOwnership.createRandomZombie('kun')
      // const transferEvents = await zombieOwnership.queryFilter('NewZombie')
      const transferEvents = await zombieOwnership.queryFilter('NewZombie')
      console.log('transferEvents',transferEvents)
      console.log('res',res)
    // console.log(transferEvents)
    } catch (callError) {
      console.log(callError.reason || callError.data?.message || callError.message)
    }
  }

  const levelUp = async () => {
    const res = await zombieOwnership.levelUp(0,{ value: ethers.parseEther("0.001") })
    console.log(res)
  }

  const ZombieChangeName = async () => {
    const res = await zombieOwnership.changeName(0,'ikun')
    console.log(res)
  }

	useEffect(() => {
    main()
  },[])
  return (
      <div>
      <Button onClick={creatZombie}>creatZombie</Button>
      <Button onClick={levelUp}>levelUp</Button>
      <Button onClick={ZombieChangeName}>ZombieChangeName</Button>
    </div>
  )

}

export default Profile;
