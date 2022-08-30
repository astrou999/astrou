
const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = 'obey mango defense divert gauge deputy again divert winner burst veteran begin'


require('babel-register');
require('babel-polyfill');

const liveNetwork = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const liveNetworkId = 97;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    live: {
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider(mnemonic, liveNetwork),
      network_id: liveNetworkId
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/truffle_abis/',
  compilers: {
    solc: {
      version: '^0.6.0',
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  }
}

