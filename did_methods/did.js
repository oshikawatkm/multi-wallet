const { HLindyDid } = require('./hlindy/did');
const { SidetreeDid } = require('./sidetree/did');
const { UportDid } = require('./uport/did');

class DidMethod {

  constructor(method, host, port) {
    this.did = this.load_did_method(method, host, port);
  }

  async get() {
    return this.did.get();
  }

  async getList(did) {
    return this.did.getList(did);
  }

  async create(keyType) {
    return this.did.issue(keyType);
  }

  async resolve(did) {
    return this.did.resolve(did);
  }

  async getPublicKeys() {
    return this.did.getPublicKeys();
  }

  async createPublicKey(did) {
    return this.did.createPublicKey(did);
  }

  async getDidEndpoint(did) {
    return this.did.getDidEndpoint(did);
  }

  async setDidEndpoint(did, endpoint, endpointType) {
    return this.did.setDidEndpoint(did, endpoint, endpointType);
  }

  // private

  load_did_method(method, host, port) {
    let did_method;
    switch(method) {
      case 'hlindy':
        did_method = new HLindyDid(host, port);
        break;
      case 'sidetree':
        did_method = new SidetreeDid();
        break;
      case 'uport':
        did_method = new UportDid();
        break;
      default:
        throw new Error('Unimplemented DID method.');
    }
    return did_method;
  }

}

module.exports.DidMethod = DidMethod;