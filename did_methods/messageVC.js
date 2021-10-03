const { HLindyRequestVC } = require('./hlindy/messageVC');
const { IonDid } = require('./ion/streamVC');
const { UportVC } = require('./uport/vc');

class MessageVCMethod {

  constructor(didMethod, host, port) {
    this.vc = this.load_vc_method(didMethod, host, port);
  }

  async getList() {
    return this.vc.getList();
  }

  // async issueVC(bodyhash) {
  //   return this.vc.issueRequestVC(bodyhash);
  // }

  async issue(athorsDid, bodyhash, hashAlgorism) {
    return this.vc.issue(athorsDid, bodyhash, hashAlgorism);
  }

  async verify(did) {
    return this.vc.verify(did);
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
        vc = new HLindyRequestVC(host, port);
        break;
      case 'sidetree':
        vc = new IonDid();
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

module.exports.MessageVCMethod = MessageVCMethod;