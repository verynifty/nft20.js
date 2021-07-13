# nft20.js

## Examples

* [A simple HTML store to buy/sell your NFT using nft20.js](https://verynifty.github.io/nft20.js/examples/)
* [A collection of scripts](https://github.com/verynifty/nft20.js/tree/main/test)



## Getting started

### Import in your project

`npm install --save nft20`

then in your javascript code:

`const NFT20 = require('nft20')`

Or in the browser :

`<script src="https://unpkg.com/nft20/build/nft20.js"></script>`

And access the NFT20 global variable.

## Initialize

Initialize NFT20 by passing an HTTP or WS RPC endpoint.

`let nft20 = new NFT20("https://mainnet.infura.io/v3/a634422ef8f84eeab6c55d89d1a38e5d")`


## Listing Pools

Get a list of all pools 

`let pools = await nft20.getPools()`

## Listing NFTs in a pool

You can get the content of a pool by querying `getPoolContent` with the NFT address.

`let nfts = await nft20.getPoolContent("0xc3f733ca98e0dad0386979eb96fb1722a1a05e69")`

## Getting price

Will give you how much ETH is needed to buy or sell the NFT based on Uniswap liquidity and price.

`let quote = await nft20.getQuote("0xc3f733ca98e0dad0386979eb96fb1722a1a05e69")`


## Buying an NFT from a pool

`
let nftAddress = "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69"
let nftId = 1
let params = await nft20.buyNFT(selectedNFT, [id], [1], account)
                params.from = account;
                const txHash = await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [params]
                });
`

## Guides

* [A guide on how to buy and sell NFTs on NFT20 with Javascript](https://ethereumdev.io/nft20-how-to-simply-trade-nfts-in-js/)

## Development

dependancies for building

`npm install -g browserify`

Building:

`browserify nft20.js --standalone NFT20 > build/nft20.js`