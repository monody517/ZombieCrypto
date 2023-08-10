require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const API_KEY = "fb99bc833a2041c1b84fcb50dafeaf03";
const PRIVATE_KEY = "0x17f442f37cdf235f559ee7b68227548c01594ab110d575b86b089b61fb9d7950";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
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
