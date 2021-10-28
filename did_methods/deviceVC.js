const { HLindyDeviceVC } = require('./hlindy/deviceVC');
const { IonDeviceVC } = require('./ion/deviceVC');
const { UportVC } = require('./uport/vc');
const { MockDeviceVC } = require('./mock/deviceVC');

class DeviceVCMethod {

  constructor(didMethod, host, port) {
    this.vc = this.load_vc_method(didMethod, host, port);
  }

  async get(did) {
    return this.vc.getCred(did);
  }

  async getList() {
    return this.vc.getCredList();
  }

  async send(tag, serviceEndpoint, description) {
    return this.vc.send(
      tag, 
      serviceEndpoint, 
      description
    );
  };

  async requestProof(tag) {
    return this.vc.requestProof(tag);
  }

  async presentProof(tag) {
    return this.vc.presentProof(tag);
  }

  async verify(tag) {
    return this.vc.verify(tag);
  }

  async delete() {
    return this.vc.delete();
  }

  // private

  load_vc_method(didMethod, host, port) {
    let vc;
    switch(didMethod) {
      case 'hlindy':
        vc = new HLindyDeviceVC(host, port);
        break;
      case 'sidetree':
        vc = new IonDeviceVC();
        break;
      case 'uport':
        vc = new UportVC();
        break;
      case 'mock':
        vc = new MockDeviceVC();
        break;
      default:
        throw new Error('Unimplemented DID method.');
    }
    return vc;
  }

}

module.exports.DeviceVCMethod = DeviceVCMethod;