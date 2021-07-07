
const axios = require('axios').default;
const Web3 = require('web3');

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
    this.web3 = new Web3(new Web3.providers.HttpProvider(ethereumProvider));
    this.NFT20CAS = new this.web3.eth.Contract(ABIS.NFT20CAS, CONTRACT_INSTANCES.NFTCAS);
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

module.exports = NFT20