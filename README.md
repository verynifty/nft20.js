# nft20.js

## Getting started

### Import in your project

`npm install --save nft20`

then in your javascript code:

`const NFT20 = require('nft20')`

Or in the browser :

`<script src="https://unpkg.com/nft20"></script>`

And access the NFT20 global variable.

## Initialize

`let nft20 = new NFT20("https://mainnet.infura.io/v3/a634422ef8f84eeab6c55d89d1a38e5d")`


## Listing Pools

`let pools = await nft20.getPools()`

## Listing NFTs in a pool

``



## Development

dependancies for building

`npm install -g browserify`

Building:

`browserify nft20.js --standalone NFT20 > build/nft20.js`