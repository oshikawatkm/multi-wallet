const { HLindyDeviceVC } = require('./hlindy/deviceVC');
const { SidetreeVC } = require('./sidetree/vc');
const { UportVC } = require('./uport/vc');

class DeviceVCMethod {

  constructor(didMethod, host, port) {
    console.log(didMethod, host, port)
    this.vc = this.load_vc_method(didMethod, host, port);
  }

  async getDeviceVCList() {
    return this.vc.getDevices();
  }

  async issueDeviceVC(name, deviceId, registerAt) {
    return this.vc.issueDeviceVC(name, deviceId, registerAt);
  }

  async sendDeviceVC(athorsDid, toHost, toPort, name, deviceId, registerAt) {
    return this.vc.sendDeviceVC(athorsDid, toHost, toPort, name, deviceId, registerAt);
  }

  async verify(params) {
    return this.vc.verify(params);
  }

  async presentProof(params) {
    return this.vc.presentProof(params);
  }

  async getDeviceVC() {

  }

  async deleteDeviceVC() {
    return this.vc.deleteDeviceVC();
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