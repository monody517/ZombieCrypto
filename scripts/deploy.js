const hre = require("hardhat");

async function main() {
    // 建立ganache网络
  let provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
  //用户连接到网络
  let wallet = new ethers.Wallet(
    "0x17f442f37cdf235f559ee7b68227548c01594ab110d575b86b089b61fb9d7950", //私钥
    provider
  );
      // 获取合约文件
    const ZombieOwnership = await hre.ethers.getContractFactory("ZombieOwnership");
      // 获取合约部署的对象
    const zombieOwnership = await ZombieOwnership.deploy();
      // 执行部署
    await zombieOwnership.deployed();
    // 打印一下部署的结果
  console.log("ZombieOwnership deployed to:", zombieOwnership.address);
  saveFrontendFiles(zombieOwnership);
}

function saveFrontendFiles(counter) {
  const fs = require("fs");
  const contractsDir = "./data";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({
      Counter: counter.address
    }, undefined, 2)
  );

  const ZombieOwnershipArtifact = artifacts.readArtifactSync("ZombieOwnership");

  fs.writeFileSync(
    contractsDir + "/ZombieOwnership.json",
    JSON.stringify(ZombieOwnershipArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });