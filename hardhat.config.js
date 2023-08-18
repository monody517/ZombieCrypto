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
    }
    // goerli: {
    //   url: `https://goerli.infura.io/v3/${API_KEY}`,
    //   accounts: [PRIVATE_KEY],
    // }
  },
  solidity: "0.8.4",
};
