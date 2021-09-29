const { HLindyRequestVC } = require('./hlindy/requestVC');
const { SidetreeVC } = require('./sidetree/vc');
const { UportVC } = require('./uport/vc');

class RequestVCMethod {

  constructor(didMethod, host, port) {
    this.vc = this.load_vc_method(didMethod, host, port);
  }

  async getRequestVCList() {
    return this.vc.getRequests();
  }

  async issueRequestVC(bodyhash) {
    return this.vc.issueRequestVC(bodyhash);
  }

  async sendRequestVC(athorsDid, bodyhash, hashAlgorism) {
    return this.vc.sendRequestVC(athorsDid, bodyhash, hashAlgorism);
  }

  async verify(params) {
    return this.vc.verify(params);
  }

  async presentProof(params) {
    return this.vc.presentProof(params);
  }

  async getRequestVC() {

  }

  async deleteRequestVC() {
    return this.vc.deleteRequestVC();
  }

  // private

  load_vc_method(didMethod, host, port) {
    let vc;
    switch(didMethod) {
      case 'hlindy':
        vc = new HLindyRequestVC(host, port);
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

module.exports.RequestVCMethod = RequestVCMethod;