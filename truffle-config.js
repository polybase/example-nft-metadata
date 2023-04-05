require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const { INFURA_API_KEY, MNEMONIC } = process.env;
module.exports = {
  networks: {
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${process.env.PROJECT_ID}`),
      network_id: 5,
      gas: 5500000,
    }
  },
  compilers: {
    solc: {
      version: '^0.8.13'
    }
  }
};