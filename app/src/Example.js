import React from 'react'
import { ethers } from "ethers";
import { useEffect } from "react";

export const Example = () => {
  const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ];
  const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
  const INFURA_ID = ''
  const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
  const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)

  const main = async () => {
    // 2. 读取DAI合约的链上信息（IERC20接口合约）
    const nameDAI = await contractDAI.name()
    const symbolDAI = await contractDAI.symbol()
    const totalSupplDAI = await contractDAI.totalSupply()
    console.log("\n2. 读取DAI合约信息")
    console.log(`合约地址: ${addressDAI}`)
    console.log(`名称: ${nameDAI}`)
    console.log(`代号: ${symbolDAI}`)
    console.log(`总供给: ${ethers.formatEther(totalSupplDAI)}`)
    const balanceDAI = await contractDAI.balanceOf('vitalik.eth')
    console.log(`Vitalik持仓: ${ethers.formatEther(balanceDAI)}\n`)
  }
  
  useEffect(() => {
    main()
  },[])

  return (
    <div>111</div>
  )
}