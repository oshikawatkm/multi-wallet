const { HLindyDeviceVC } = require('./hlindy/deviceVC');
const { IonDeviceVC } = require('./ion/deviceVC');
const { UportVC } = require('./uport/vc');
const { MockDeviceVC } = require('./mock/deviceVC');

class DeviceVCMethod {

  constructor(didMethod, host, port) {
    this.vc = this.load_vc_method(didMethod, host, port);
  }

  async getList() {
    return this.vc.getList();
  }

  // async issueDeviceVC(name, deviceId, registerAt) {
  //   return this.vc.issueVC(name, deviceId, registerAt);
  // }
  
  async issue(tag, name, deviceId, registerAt) {
    return this.vc.issue(athorsDid, name, deviceId, registerAt);
  }

  async send(
    tag,
    serviceEndpoint, 
    description, 
    registerAt
  ) {
    return this.vc.send(
      tag, 
      serviceEndpoint, 
      description, 
      registerAt
    );
  };

  async requestProof(tag) {
    return this.vc.requestProof(tag);
  }

  async presentProof() {
    return this.vc.presentProof();
  }

  async verify() {
    return this.vc.verify();
  }

  async get(did) {
    return this.vc.get(did);
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