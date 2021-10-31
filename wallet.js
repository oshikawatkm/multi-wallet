const { DidMethod } = require('./did_methods/did');
const { AccessVCMethod } = require('./did_methods/accessVC');
const { DeviceVCMethod } = require('./did_methods/deviceVC');
const { StreamVCMethod } = require('./did_methods/streamVC');
const { WalletInfo } = require('./did_methods/info');

class Wallet {

  constructor(config) {
    let didMethod = config ? config.didMethod : process.env.DID_METHOD
    let host = config ? config.agent.host : process.env.HLINDY_AGENT_HOST;
    let port = config ? config.agent.port : process.env.HLINDY_AGENT_PORT;

    this.did = new DidMethod(didMethod, host, port);
    this.accessVC = new AccessVCMethod(didMethod, host, port);
    this.deviceVC = new DeviceVCMethod(didMethod, host, port);
    this.streamVC = new StreamVCMethod(didMethod, host, port);
    this.info = new WalletInfo(didMethod, host, port);
  }

}

module.exports.Wallet = Wallet;