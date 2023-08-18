const hre = require("hardhat");

async function main() {
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