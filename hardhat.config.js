require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = '0dd0c7403d33916dec8604a7e00170695ee75dc107b5169f9b41fe6e9458ba9a'; 

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    sepolia: {
        url: `https://eth-sepolia.g.alchemy.com/v2/lC2newnPCFHsUGBDR5y_oU0aLykPmZMS`,
        accounts: [`0x${PRIVATE_KEY}`]
    }
},
etherscan: {
    apiKey: '7AY3YBH8X9ZC74BK4XGJKQKS28SC8RYEW4'
}
};