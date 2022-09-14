const AST = artifacts.require('ASTROUNAUT')
const Treasury = artifacts.require('Treasury')

module.exports = async function(deployer, network, accounts) {
  
  // await deployer.deploy(AST)
  // const astCoin = await AST.deployed()

  await deployer.deploy(Treasury, '0xEE260F92061f052E7b22a1E8a723243827D08970')
  const treasury = await Treasury.deployed()
}
