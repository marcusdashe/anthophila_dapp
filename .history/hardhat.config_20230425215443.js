require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */

// const ALCHEMY_API_KEY = "mcjhcWL8cLXfWOlHHO3ofP3hFPBXC5Wq";

// const SEPOLIA_PRIVATE_KEY =
//   "5254e5d46fa953f800ee518f15611e985aea9f3959af728e116cf584dc998cb2";

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  allowUnlimitedContractSize: true,
  // networks: {
  //   sepolia: {
  //     url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  //     accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
  //     allowUnlimitedContractSize: true,
  //   },
  // },

  paths: {
    artifacts: "./frontend/src/artifacts",
  },
};

// *****************************************************

/** @type import('hardhat/config').HardhatUserConfig */

// const ALCHEMY_API_KEY =
//   "https://eth-sepolia.g.alchemy.com/v2/mcjhcWL8cLXfWOlHHO3ofP3hFPBXC5Wq";
