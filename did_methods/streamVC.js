const { HLindyStreamVC } = require('./hlindy/streamVC');
const { SidetreeVC } = require('./sidetree/vc');
const { UportVC } = require('./uport/vc');

class StreamVCMethod {

  constructor(didMethod, host, port) {
    this.vc = this.load_vc_method(didMethod, host, port);
  }


  async getStreamVCList() {
    return this.vc.getStreams();
  }


  async issueStreamVC(
    connectionId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt
  ) {
    return this.vc.issueStreamVC(
      connectionId, 
      dataHash, 
      updateFrequency, 
      startAt, 
      updatedAt
    );
  }

  async sendStreamVC(
    athorsDid, 
    connectionId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt  
  ) {
    return this.vc.sendStreamVC(
      athorsDid,
      connectionId, 
      dataHash, 
      updateFrequency, 
      startAt, 
      updatedAt
    );
  }

  async verify(params) {
    return this.vc.verify(params);
  }

  async presentProof(params) {
    return this.vc.presentProof(params);
  }

  async getStreamVC() {

  }

  async deleteStreamVC() {
    return this.vc.deleteStreamVC();
  }



  // private

  load_vc_method(didMethod, host, port) {
    let vc;
    switch(didMethod) {
      case 'hlindy':
        vc = new HLindyStreamVC(host, port);
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



module.exports.StreamVCMethod = StreamVCMethod;