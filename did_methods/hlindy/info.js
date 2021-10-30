const { Server } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");


class HLindyWallet extends HLindyDidObject {

  async getInfo() {
    let server = new Server(this.agent);
    let response = await server.status();

    return {
      identifier: response.result.label
    };
  };

}

module.exports.HLindyWallet = HLindyWallet;