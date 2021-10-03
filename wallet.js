const { DidMethod } = require('./did_methods/did');
const { DeviceVCMethod } = require('./did_methods/deviceVC');
const { StreamVCMethod } = require('./did_methods/streamVC');
const { MessageVCMethod } = require('./did_methods/messageVC');

class Wallet {

  constructor(config) {
    let didMethod = config ? config.didMethod : process.env.DID_METHOD
    let host = config ? config.agent.host : process.env.HLINDY_AGENT_HOST;
    let port = config ? config.agent.port : process.env.HLINDY_AGENT_PORT;

    this.did = new DidMethod(didMethod, host, port);
    this.deviceVC = new DeviceVCMethod(didMethod, host, port);
    this.streamVC = new StreamVCMethod(didMethod, host, port);
    this.messageVC = new MessageVCMethod(didMethod, host, port);
  }

  async init() {

  }

  // DID Method
  async getDids(){
    return await this.did.getList();
  }

  async getDid(param) {
    return await this.did.get(param);
  }

  async createDid(param) {
    return await this.did.create(param);
  }

  async resolve(did) {
    return await this.did.resolve(did);
  }

  async getPublicKeys() {
    return await this.did.getPublicKeys();
  }

  async createPublicKey(did) {
    return await this.did.createPublicKey(did);
  }

  async getDidEndpoint(did) {
    return await this.did.getDidEndpoint(did);
  }

  async setDidEndpoint(did, endpoint, endpointType) {
    return await this.did.setDidEndpoint(did, endpoint, endpointType);
  }

  // Device VC Method
  // async issueDeviceVC(name, deviceId, registerAt) {
  //   return await this.deviceVC.issueDeviceVC(name, deviceId, registerAt);
  // }

  async issueDeviceVC(issueDid, name, deviceId, registerAt) {
    return await this.deviceVC.issue(issueDid, name, deviceId, registerAt);
  }

  async getDeviceVCSchema(param) {
  
  }

  async getConnectionVCSchema(param) {
  
  }

  async getDeviceVCList(params){
    let deviceVCList = await this.deviceVC.getList();
    return deviceVCList;
  }

  async verifyVC(param) {
    return await this.deviceVC.verify(param);
  }

  async presentProofVC() {
    return await this.deviceVC.presentProof();
  }

  async deleteDeviceVC() {
    return await this.deviceVC.delete();
  }

  // Stream VC Method
  // async issueDeviceVC(
  //   connectionId, 
  //   dataHash, 
  //   updateFrequency, 
  //   startAt, 
  //   updatedAt
  // ) {
  //   return await this.streamVC.issueStreamVC(
  //     connectionId, 
  //     dataHash, 
  //     updateFrequency, 
  //     startAt, 
  //     updatedAt
  //   );
  // }

  async issueDeviceVC(
    athorsDid, 
    connectionId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt
  ) {
    return await this.streamVC.issue(
      athorsDid, 
      connectionId, 
      dataHash, 
      updateFrequency, 
      startAt, 
      updatedAt
    );
  }

  async getStreamVCSchema(param) {
  
  }

  async getStreamVCList(params){
    let streamVCList = await this.streamVC.getList();
    return streamVCList;
  }

  async verifyVC(param) {
    return await this.streamVC.verify(param);
  }

  async presentProofVC() {
    return await this.streamVC.presentProof();
  }

  async deleteStreamVC() {
    return await this.streamVC.delete();
  }


  // Request VC Method
  async issueMessageVC(bodyHash) {
    return await this.messageVC.issue(bodyHash);
  }

  async sendMessageVC(athorsDid, bodyHash, hashAlgorism) {
    return await this.messageVC.issue(athorsDid, bodyHash, hashAlgorism);
  }

  async getMessageVCSchema(param) {
  
  }

  async getMessageVCList(params){
    let messageVC = await this.messageVC.getList();
    return messageVC;
  }

  async verifyVC(param) {
    return await this.messageVC.verify(param);
  }

  async presentProofVC() {
    return await this.messageVC.presentProof();
  }

  async deleteMessageVC() {
    return await this.messageVC.delete();
  }

}

module.exports.Wallet = Wallet;