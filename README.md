### Dynamic NFT Metadata using Polybase?

This project demonstrates how to store your NFT Metadata using Polybase. 

Open a terminal and create a directory for your creating your ERC-721 token

```shell
mkdir nftMetadata
cd nftMetadata
```
Once you are in the nftMetadata directory, install the following dependencies

```shell
npm install -g truffle
truffle init
npm install @openzeppelin/contracts
npm install dotenv
```
# Creating ERC-721 token
Under the contracts directory, add a new file "myToken.sol" and the following code in it. 

```shell
//Contract based on [https://docs.openzeppelin.com/contracts/4.x/erc721](https://docs.openzeppelin.com/contracts/4.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract polybaseNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("PolybaseNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

```
Update your truffle-config.js file with the following code.

```shell
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const { INFURA_API_KEY, MNEMONIC } = process.env;
module.exports = {
  networks: {
    goerli: {
     provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
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
```

You should have to store your Mnemonic phrase & Infura API key in the .env file that you need to create within this repository!

Your .env would look like this. 

```shell
API_KEY=Your api key here // without the quotes
MNEMONIC="entire mnemonic seed phrase" // with the quotes
```

## Compile and deploy your contract:

Before compiling your smart contract, add a new file named 1_deploy_contract.js in your migrations directory. Save the following script in that file. 

```shell
const Demo_Contract = artifacts.require("polybaseNFT");

module.exports = function(deployer) {
  deployer.deploy(Demo_Contract);
};
```
Now navigate to the terminal and type in the following commands

```shell
truffle compile --all
truffle migrate --network goerli
```

This would deploy your NFT in the Goerli test network. Make sure you recharge your Goerli testnet using the Goerli faucet. 

### Creating a collection in Polybase

Now login to Polybase explorer & add create a new app. You would be taken to the default boilerplate. Remove that code and paste the code given below. You can find this code in our [docs](https://polybase.xyz/docs/dynamic-nft-metadata).

```shell
@public
collection VerifiableCredentialMetadata {
  // `id` is unique and required on all collections
  id: string;

  // Use the NFT format
  name: string;
  // Image could link to the location of the file on IPFS, Arweave, etc.
  image: string;
  
  // Any additional properties you want
  level: number;
  points: number;

  constructor (id: string, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.points = 0;
  }

  // You can add your own functions to determine rules
  // on who can update the data
  function setPoints (points: number) {
    // Check if the caller is a master address (or null address for immutable metadata).
    if (ctx.publicKey.toHex() != '0x000000000') {
      error('You are not allowed to update the points.');
    }
    this.points = points;
  }
}
```

Now you have saved the collection and would have to pass in 3 values to your NFT. We will see how to define those 3 values to the NFT we just deployed.

## Install Polybase SDK in your terminal

Navigate to terminal and type in the following command. 

```shell
yarn add @polybase/client
```

Add a mintnft.js file to your directory. Add the following code below. 

```shell
const { Polybase } = require('@polybase/client')

// Create client
const db = new Polybase({
  defaultNamespace: "your-namespace",
})

async function run(){
	await db.collections('VerifiableCredentialMetadata').create(['1', 'My NFT', 'https://ipfs.io/ipfs/Qm...'])
}

run()

```

Save this code and run this code from the terminal. 

```shell
node mint.js  
```

# You have now successfully created your first record in the Polybase database. 

You should be able to view this record from Polybase explorer. Here is the URL with which you can access your NFT Metadata. 
https://testnet.polybase.xyz/v0/collections/pk%publickey%2Fapp_name%2Fcollection_name/records/record_id?format=nft
