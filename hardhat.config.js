require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const API_KEY = "fb99bc833a2041c1b84fcb50dafeaf03";
const PRIVATE_KEY = "0x8bffcd85354e88ca03da14532f1cd18b5b92d34202143212ab1c1cc520d19b80";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [PRIVATE_KEY],
    }
    // goerli: {
    //   url: `https://goerli.infura.io/v3/${API_KEY}`,
    //   accounts: [PRIVATE_KEY],
    // }
  },
  solidity: "0.8.4",
};
