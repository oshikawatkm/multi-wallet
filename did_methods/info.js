const { HLindyWallet } = require('./hlindy/info');
// const { IonDid } = require('./ion/info');
// const { UportDid } = require('./uport/info');
const { MockWallet } = require('./mock/info');


class WalletInfo {

  constructor(method, host, port){
    this.wallet = this.load_did_method(method, host, port);
  }

  async getIdentifier() {
    return this.wallet.getInfo();
  }

  
  load_did_method(method, host, port) {
    let did_method;
    switch(method) {
      case 'hlindy':
        did_method = new HLindyWallet(host, port);
        break;
      case 'ion':
        // did_method = new IonDid();
        break;
      case 'uport':
        // did_method = new UportDid();
        break;
      case 'mock':
        did_method = new MockWallet(host, port);
        break;
      default:
        throw new Error('Unimplemented DID method.');
    }
    return did_method;
  }
}

module.exports.WalletInfo = WalletInfo;