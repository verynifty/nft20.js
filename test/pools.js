const NFT20 = require("nft20");

const nft20 = new NFT20("https://mainnet.infura.io/v3/a634422ef8f84eeab6c55d89d1a38e5d"); // Please change RPC endpoint to avoid rate limiting


(async () => {

    let pools = await nft20.getPools();

})();
  
