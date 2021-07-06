
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
    let pools = await axios.get("this.API_PATH" + "/pools?perPage=1000");
    console.log(pool)
}

module.exports = NFT20