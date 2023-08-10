import { ethers } from "hardhat";
import { useEffect } from "react";
 
function Profile() {
  const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createRandomZombie",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "dna",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "level",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "readyTime",
						"type": "uint32"
					},
					{
						"internalType": "uint16",
						"name": "winCount",
						"type": "uint16"
					},
					{
						"internalType": "uint256",
						"name": "loseCount",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct ZombieFactory.Zombie[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"name": "Log",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "zombieId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			}
		],
		"name": "NewZombie",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getZombies",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "dna",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "level",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "readyTime",
						"type": "uint32"
					},
					{
						"internalType": "uint16",
						"name": "winCount",
						"type": "uint16"
					},
					{
						"internalType": "uint256",
						"name": "loseCount",
						"type": "uint256"
					}
				],
				"internalType": "struct ZombieFactory.Zombie[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "zombies",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "level",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "readyTime",
				"type": "uint32"
			},
			{
				"internalType": "uint16",
				"name": "winCount",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "loseCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "zombieToOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const providerLocal = new ethers.utils.JsonRpcProvider(`http://127.0.0.1:7545`)
  const _Contract = new ethers.Contract('0xF94252E2914d48E99c527af9740124756764b998', abi, providerLocal);
  console.log('_Contract',_Contract)
  const main = async () => {
    const signer = await ethers.getSigners()
  await _Contract.createRandomZombie('ikun',signer)
  const a = await _Contract._generateRandomDna()
  console.log(a)
}
main()
  
  useEffect(() => {
    main()
  })
  return (
      <div>
      111
    </div>
  )

}

export default Profile;
