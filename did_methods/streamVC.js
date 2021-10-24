const { HLindyStreamVC } = require('./hlindy/streamVC');
const { IonDid } = require('./ion/streamVC');
const { UportVC } = require('./uport/vc');

class StreamVCMethod {

  constructor(didMethod, host, port) {
    this.vc = this.load_vc_method(didMethod, host, port);
  }


  async getList() {
    return this.vc.getList();
  }


  // async issueStreamVC(
  //   connectionId, 
  //   dataHash, 
  //   updateFrequency, 
  //   startAt, 
  //   updatedAt
  // ) {
  //   return this.vc.issueStreamVC(
  //     connectionId, 
  //     dataHash, 
  //     updateFrequency, 
  //     startAt, 
  //     updatedAt
  //   );
  // }

  async issue(
    issuerDid, 
    connectionId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt  
  ) {
    return this.vc.issue(
      issuerDid,
      connectionId, 
      dataHash, 
      updateFrequency, 
      startAt, 
      updatedAt
    );
  }

  async verify(did) {
    return this.vc.verify(did);
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
        vc = new HLindyStreamVC(host, port);
        break;
      case 'sidetree':
        vc = new IonDid();
        break;
      case 'uport':
        vc = new UportVC();
        break;
      case 'mock':
        // vc = new MockDid()
      default:
        throw new Error('Unimplemented DID method.');
    }
    return vc;
  }

}



module.exports.StreamVCMethod = StreamVCMethod;