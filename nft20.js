
const axios = require('axios').default;

function NFT20() {
    this.API_PATH = "https://api.nft20.io";
    this.NETWORKS = {
        ETHEREUM: 0,
        MATIC: 1,
        ALL: 420
    };
}

NFT20.prototype.getPools = async function(network = 420) {
    let url = this.API_PATH + "/pools?perPage=1000"
    if (network != this.NETWORKS.ALL) {
        url += "&network=" + network;
    }
    let pools = await axios.get(this.API_PATH + "/pools?perPage=1000");
    pools = pools.data.data;
    return (pools);
}

module.exports = NFT20