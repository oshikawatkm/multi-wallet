const { Server } = require("indy-request-js");


class MockWallet {

  async getInfo() {
    return {
      identifier: "device.manager.server.agent"
    };
  };

}

module.exports.MockWallet = MockWallet;