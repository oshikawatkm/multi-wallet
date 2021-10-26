const { DidMethod } = require('./did_methods/did');
const { AccessVCMethod } = require('./did_methods/accessVC');
const { DeviceVCMethod } = require('./did_methods/deviceVC');
const { StreamVCMethod } = require('./did_methods/streamVC');
// const { MessageVCMethod } = require('./did_methods/messageVC');

class Wallet {

  constructor(config) {
    let didMethod = config ? config.didMethod : process.env.DID_METHOD
    let host = config ? config.agent.host : process.env.HLINDY_AGENT_HOST;
    let port = config ? config.agent.port : process.env.HLINDY_AGENT_PORT;

    this.did = new DidMethod(didMethod, host, port);
    this.accessVC = new AccessVCMethod(didMethod, host, port);
    this.deviceVC = new DeviceVCMethod(didMethod, host, port);
    this.streamVC = new StreamVCMethod(didMethod, host, port);
    // this.messageVC = new MessageVCMethod(didMethod, host, port);
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

  async issueDeviceVC(issuerDid, name, serviceEndpoint, description) {
    return await this.deviceVC.issue(issuerDid, name, serviceEndpoint, description);
  }

  async sendDeviceVC(tag, serviceEndpoint, description) {
    return await this.deviceVC.send(
      tag,
      serviceEndpoint, 
      description,);
  }

  async requestProofDeviceVC(tag){
    return await this.deviceVC.requestProof(tag);
  }

  async presentProofDeviceVC(){
    return await this.deviceVC.presentProof();
  }

  async verifyProofDeviceVC(){
    return await this.deviceVC.verify();
  }

  async getDeviceVC(did){
    let deviceVC = await this.deviceVC.get(did);
    return deviceVC;
  }

  async getDeviceVCList(){
    let deviceVCList = await this.deviceVC.getList();
    return deviceVCList;
  }

  async requestProofDeviceVC(tag) {
    return await this.deviceVC.requestProof();
  }

  async presentProofDeviceVC() {
    return await this.deviceVC.presentProof();
  }

  async verifyDeviceVCDeviceVC() {
    return await this.deviceVC.verify();
  }

  async deleteDeviceVC() {
    return await this.deviceVC.delete();
  }

  async issueStreamVC(
    issuerDid, 
    connectionId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt
  ) {
    return await this.streamVC.issue(
      issuerDid, 
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

  async verifyStreamVC(did) {
    return await this.streamVC.verify(did);
  }

  async deleteStreamVC() {
    return await this.streamVC.delete();
  }


  async sendAccessVC(holderDid, endpointUrl) {
    return await this.messageVC.issue(holderDid, endpointUrl);
  }

  async getAccessVCList(){
    let accessVCList = await this.accessVC.getList();
    return accessVCList;
  }


  async getAccessVC(did){
    let accessVC = await this.accessVC.get(did);
    return accessVC;
  }


}

module.exports.Wallet = Wallet;