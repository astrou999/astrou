const AST = artifacts.require('ASTROUNAUT')
const Treasury = artifacts.require('Treasury')

module.exports = async function(deployer, network, accounts) {
  
  await deployer.deploy(AST)
  const astCoin = await AST.deployed()

  await deployer.deploy(Treasury, astCoin.address)
  const treasury = await Treasury.deployed()
}
