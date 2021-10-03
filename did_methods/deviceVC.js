const { HLindyDeviceVC } = require('./hlindy/deviceVC');
const { SidetreeVC } = require('./sidetree/vc');
const { UportVC } = require('./uport/vc');

class DeviceVCMethod {

  constructor(didMethod, host, port) {
    console.log(didMethod, host, port)
    this.vc = this.load_vc_method(didMethod, host, port);
  }

  async getList() {
    return this.vc.get();
  }

  // async issueDeviceVC(name, deviceId, registerAt) {
  //   return this.vc.issueVC(name, deviceId, registerAt);
  // }
  
  async issue(athorsDid, name, deviceId, registerAt) {
    return this.vc.issue(athorsDid, name, deviceId, registerAt);
  }

  async verify() {
    return this.vc.verify();
  }

  async presentProof(params) {
    return this.vc.presentProof(params);
  }

  async get() {

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
        vc = new SidetreeVC();
        break;
      case 'uport':
        vc = new UportVC();
        break;
      default:
        throw new Error('Unimplemented DID method.');
    }
    return vc;
  }

}

module.exports.DeviceVCMethod = DeviceVCMethod;