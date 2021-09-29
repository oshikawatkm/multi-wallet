const { HLindyDidObject } = require("./_hlindyDid");
const { Wallet } = require("indy-request-js");


class HLindyDid extends HLindyDidObject {

  async get() {

  }

  async getList() {
    let wallet = new Wallet(this.agent)
    let params = {
    }
    return await wallet.did(params)
  }

  async issue(keyType) {
    let wallet = new Wallet(this.agent)
    let requestBody = {
      method: "sov",
      options: {
        key_type: keyType
      }
    }
    return await wallet.didCreate(requestBody)
  }

  async resolve(did) {
    
  }

  async getPublicKeys() {
    let wallet = new Wallet(this.agent)
    return await wallet.didPublic();
  }

  async createPublicKey(did) {
    let wallet = new Wallet(this.agent)
    return await wallet.postDidPublic(did);
  }

  async getDidEndpoint(did) {
    return await this.wallet.getDidEndpoint(did);
  }

  async setDidEndpoint(did, endpoint, endpointType) {
    let wallet = new Wallet(this.agent)
    let requestBody ={
      did: did,
      endpoint: endpoint,
      endpointType: endpointType
    }
    return await wallet.setDidEndpoint(requestBody);
  }

}

module.exports.HLindyDid = HLindyDid;