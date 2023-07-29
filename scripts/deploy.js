const hre = require("hardhat");

async function main() {
      // 获取合约文件
    const ZombieOwnership = await hre.ethers.getContractFactory("ZombieAttack");
      // 获取合约部署的对象
    const zombieOwnership = await ZombieOwnership.deploy();
      // 执行部署
    await zombieOwnership.deployed();
    // 打印一下部署的结果
    console.log("ZombieOwnership deployed to:", zombieOwnership.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });