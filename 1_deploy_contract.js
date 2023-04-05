const Demo_Contract = artifacts.require("polybaseNFT");

module.exports = function(deployer) {
  deployer.deploy(Demo_Contract);
};