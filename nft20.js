
const axios = require('axios').default;
const { ethers } = require("ethers");

const ABIS = {
    ERC20: require('./ABIS/ERC20.json'),
    NFT20CAS: require('./ABIS/NFT20CAS.json'),
    ERC721: require('./ABIS/ERC721.json'),
}

const CONTRACT_INSTANCES = {
    NFTCAS: "0xA42f6cADa809Bcf417DeefbdD69C5C5A909249C0"
}

function NFT20(ethereumProvider) {
    this.API_PATH = "https://api.nft20.io";
    this.NETWORKS = {
        ETHEREUM: 0,
        MATIC: 1,
        ALL: 420
    };
    if (typeof ethereumProvider === 'string' || ethereumProvider instanceof String) {
        this.provider = new ethers.providers.JsonRpcProvider(ethereumProvider);
    } else {
        this.provider = ethereumProvider;
    }
    
    this.NFT20CAS = new ethers.Contract(CONTRACT_INSTANCES.NFTCAS, ABIS.NFT20CAS, this.provider);
}

NFT20.prototype.getPools = async function (network = 420) {
    let url = this.API_PATH + "/pools"
    if (network != this.NETWORKS.ALL) {
        url += "?network=" + network;
    }
    let pools = await axios.get(url);
    pools = pools.data.data;
    return (pools);
}

NFT20.prototype.getPool = async function (nftContractAddress) {
    if (nftAddress == null) {
        return null;
    }
    let url = this.API_PATH + "/pools?nft=" + nftContractAddress
    let pool = await axios.get(url);
    pool = pool.data.data;
    return pool[0]
}

NFT20.prototype.getPoolContent = async function (nftContractAddress) {
    if (nftAddress == null) {
        return null;
    }
    let url = this.API_PATH + "/nfts?nft=" + nftContractAddress
    let nfts = await axios.get(url);
    nfts = pools.data.data;
    return (nfts);
}

module.exports = NFT20