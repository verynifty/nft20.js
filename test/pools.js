//const NFT20 = require("nft20");
const NFT20 = require("../nft20");

const Web3 = require("web3");

const nft20 = new NFT20("https://mainnet.infura.io/v3/a634422ef8f84eeab6c55d89d1a38e5d"); // Please change RPC endpoint to avoid rate limiting
const web3 = new Web3("https://mainnet.infura.io/v3/a634422ef8f84eeab6c55d89d1a38e5d");

const account = "0xC618b905f7b41c7D53C23474322D7D3297730419";
const KONGS_NFT = "0x57a204aa1042f6e66dd7730813f4024114d74f37";
const ACCLIMATED_CATS = "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69";

const RICH_ADDRESS = "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8"; //Ethermine addressthat has lot of ETH for test

(async () => {

    let pools = await nft20.getPools();
    // await nft20.NFTapproveForAll("0xA42f6cADa809Bcf417DeefbdD69C5C5A909249C0", "0xA42f6cADa809Bcf417DeefbdD69C5C5A909249C0")
    let quote = await nft20.getQuote(ACCLIMATED_CATS, 1)
    let buy_order = await nft20.buyNFT(KONGS_NFT, [1], [1], ACCLIMATED_CATS);

    console.log(quote)
    console.log(buy_order)

    // buy_order.to = ACCLIMATED_CATS
    buy_order.value = quote.buyPrice;
    buy_order.from = RICH_ADDRESS

    let gas_estimate =  web3.eth.estimateGas({
      buy_order
    }, function(a,b) {
        console.log(a,b)
    })
    console.log(gas_estimate)

})();

