const { HLindyAccessVC } = require('./hlindy/accessVC');
const { MockAccessVC } = require('./mock/accessVC')
// const { IonDeviceVC } = require('./ion/deviceVC');
// const { UportVC } = require('./uport/vc');

class AccessVCMethod {

  constructor(didMethod, host, port) {
    this.vc = this.load_vc_method(didMethod, host, port);
  }
  
  async getList() {
    return this.vc.getCredList();
  }
  
  async get(did) {
    return this.vc.getCred(did);
  }

  async send(
    tag,
    serviceEndpoint, 
    description
  ) {
    return this.vc.send(
      tag, 
      serviceEndpoint, 
      description
    );
  };


  async verify(did) {
    return this.vc.verify(did);
  }

  async requestProof(did) {
    return this.vc.requestProof(did);
  }

  async presentProof(did) {
    return this.vc.presentProof(did);
  }

  async delete() {
    return this.vc.delete();
  }

  async getRequestProof(did) {
    return this.vc.getRequestProof(did);
  }

  // private

  load_vc_method(didMethod, host, port) {
    let vc;
    switch(didMethod) {
      case 'hlindy':
        vc = new HLindyAccessVC(host, port);
        break;
      case 'sidetree':
        // vc = new IonAccessVC();
        break;
      case 'uport':
        // vc = new UportVC();
        break;
      case 'mock':
        vc = new MockAccessVC();
        break;
      default:
        throw new Error('Unimplemented DID method.');
    }
    return vc;
  }

}

module.exports.AccessVCMethod = AccessVCMethod;