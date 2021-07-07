//const NFT20 = require("nft20");
const NFT20 = require("../nft20");

const nft20 = new NFT20("https://mainnet.infura.io/v3/a634422ef8f84eeab6c55d89d1a38e5d"); // Please change RPC endpoint to avoid rate limiting

const account = "0xC618b905f7b41c7D53C23474322D7D3297730419";
const KONGS_NFT = "0x57a204aa1042f6e66dd7730813f4024114d74f37";

(async () => {

    let pools = await nft20.getPools();
    await nft20.sellNFT(KONGS_NFT, [1], [1], "0xC618b905f7b41c7D53C23474322D7D3297730419");
   // await nft20.NFTapproveForAll("0xA42f6cADa809Bcf417DeefbdD69C5C5A909249C0", "0xA42f6cADa809Bcf417DeefbdD69C5C5A909249C0")
   let quote = await nft20.getQuote(KONGS_NFT, 1)
   console.log(quote)

})();
  
