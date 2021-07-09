
const axios = require('axios').default;
const Web3 = require('web3');
const BigNumber = require("bignumber.js");

const ABIS = {
    ERC20: require('./ABIS/ERC20.json'),
    NFT20CAS: require('./ABIS/NFT20CAS.json'),
    ERC721: require('./ABIS/ERC721.json'),
    UNISWAPV2: require('./ABIS/UniswapRouterV2.json'),
    UNISWAPV3: require('./ABIS/UniswapQuoterV3.json')
}

const CONTRACT_INSTANCES = {
    NFT20CAS: "0xA42f6cADa809Bcf417DeefbdD69C5C5A909249C0",
    UNISWAPV2: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    UNISWAPV3: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
}

function NFT20(ethereumProvider) {
    this.API_PATH = "https://api.nft20.io";
    this.NETWORKS = {
        ETHEREUM: 0,
        MATIC: 1,
        ALL: 420
    };
    this.web3 = new Web3(new Web3.providers.HttpProvider(ethereumProvider));
    // Instantiate contract we use often
    this.NFT20CAS = new this.web3.eth.Contract(ABIS.NFT20CAS, CONTRACT_INSTANCES.NFT20CAS);
    this.UNISWAPV2 = new this.web3.eth.Contract(
        ABIS.UNISWAPV2,
        CONTRACT_INSTANCES.UNISWAPV2
    );
    this.UNISWAPV3 = new this.web3.eth.Contract(
        ABIS.UNISWAPV3,
        CONTRACT_INSTANCES.UNISWAPV3
    );
    this.WETH = new this.web3.eth.Contract(
        ABIS.ERC20,
        CONTRACT_INSTANCES.WETH
    );
}

NFT20.prototype.getPools = async function (network = 0) {
    let url = this.API_PATH + "/pools"
    if (network != this.NETWORKS.ALL) {
        url += "?network=" + network;
    }
    let pools = await axios.get(url);
    pools = pools.data.data;
    return (pools);
}

NFT20.prototype.getPool = async function (nftContractAddress) {
    if (nftContractAddress == null) {
        return null;
    }
    let url = this.API_PATH + "/pools?nft=" + nftContractAddress
    let pool = await axios.get(url);
    pool = pool.data.data;
    return pool[0]
}

NFT20.prototype.getPoolContent = async function (nftContractAddress) {
    if (nftContractAddress == null) {
        return null;
    }
    let url = this.API_PATH + "/nfts?nft=" + nftContractAddress
    let nfts = await axios.get(url);
    nfts = nfts.data.data;
    return (nfts);
}

NFT20.prototype.NFTisApprovedForAll = async function (nftContractAddress, ownerAddress, operatorAddress) {
    let nftInstance = new this.web3.eth.Contract(ABIS.ERC721, nftContractAddress);
    let result = await nftInstance.methods.isApprovedForAll(ownerAddress, operatorAddress).call();
    return (result);
}

NFT20.prototype.NFTapproveForAll = function (nftContractAddress, operatorAddress) {
    let nftInstance = new this.web3.eth.Contract(ABIS.ERC721, nftContractAddress);
    let call = nftInstance.methods.setApprovalForAll(operatorAddress, true);
    return ({
        data: call.encodeABI(),
        to: nftContractAddress
    });
}

NFT20.prototype.getQuote = async function (nftContractAddress, amount = 1) {
    let pool = await this.getPool(nftContractAddress);
    if (pool == null) {
        return null;
    }
    let lp_version = parseInt(pool.lp_version);
    console.log(lp_version)
    let result = {
        buyPrice: 0,
        sellPrice: 0,
        buyPriceFloat: 0,
        sellPriceFloat: 0
    }
    amount = new BigNumber(amount).shiftedBy(20).toString();
    console.log(amount)
    if (lp_version == 2) {
        try {
            // We calculate the price of one NFT with the slippage
            let res = await this.UNISWAPV2.methods
                .getAmountsIn(amount + "", [
                    CONTRACT_INSTANCES.WETH,
                    pool.address
                ])
                .call();
            result.buyPrice = new BigNumber(res[0]).toString();
            result.buyPriceFloat = new BigNumber(res[0]).shiftedBy(-18).toNumber();
        } catch (error) {
            console.log(error)
        }
        try {
            // We calculate the price of one NFT with the slippage
            let res = await this.UNISWAPV2.methods
                .getAmountsOut(amount + "", [
                    pool.address,
                    CONTRACT_INSTANCES.WETH
                ])
                .call();
            result.sellPrice = new BigNumber(res[1]).toString();
            result.sellPriceFloat = new BigNumber(res[1]).shiftedBy(-18).toNumber();
        } catch (error) {
            console.log(error)
        }
        return (result)
    } else if (lp_version == 3) {

    }
}

NFT20.prototype.sellNFT = async function (nftContractAddress, nftIds, nftAmounts, ownerAddress) {
    let pool = await this.getPool(nftContractAddress);
    if (pool == null) {
        return null;
    }
    let call = this.NFT20CAS.methods.nftForEth(nftContractAddress, nftIds, nftAmounts, parseInt(pool.nft_type) == 721, pool.lp_fees ? pool.lp_fees : "0", parseInt(pool.lp_version) == 3);
    return ({
        data: call.encodeABI(),
        to: CONTRACT_INSTANCES.NFT20CAS
    });
};

NFT20.prototype.buyNFT = async function (nftContractAddress, nftIds, nftAmounts, ownerAddress) {
    let pool = await this.getPool(nftContractAddress);
    if (pool == null) {
        return null;
    }
    console.log(nftContractAddress, nftIds, nftAmounts, ownerAddress, pool.lp_fees ? pool.lp_fees : "0", parseInt(pool.lp_version) == 3)
    let call = this.NFT20CAS.methods.ethForNft(nftContractAddress, nftIds, nftAmounts, ownerAddress, pool.lp_fees ? pool.lp_fees : "0", parseInt(pool.lp_version) == 3);
    return ({
        data: call.encodeABI(),
        to: CONTRACT_INSTANCES.NFT20CAS
    });
};

module.exports = NFT20