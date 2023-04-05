const { Polybase } = require('@polybase/client')

//create the client
const db = new Polybase({
    defaultNamespace: "pk/0x3bca1aa885bfe60d60cd54876947f9ea29bab5c0c68945a5036796a4cfa7aa3b269b4aab18d8c0b06278b19676c343e76819fcb10bdfc8aa71c7bdcecb5ad8eb/NFTMetadatatest2",
  });

//define the values for your metadata

async function run(){
    await db.collection('Shakitestnft5').create(['6', 'Shakitestnft5', 'https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu'])
}

run()