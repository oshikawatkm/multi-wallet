
const { Agent, Wallet, Schema, CredentialDefinition, Connection } = require("indy-request-js");
const HLindyWallet = require('../../models/HLindyWallet');

class HLindyDidObject {
  constructor(host, port) {
    this.agent = new Agent(
      'http', 
      host,
      port
    );
  }

  // private

  async init(){
    // this.device_schema_id = await this.getDeviceSchemaId();
    // this.device_cred_def_id = await this.getDeviceCredDefId();
    // this.did = await this.getDid();
  }

  async applyAgent() {
    
  }

  async connect() {
    
  }

  async isConected() {
    
  }

  // private

  async getDid() {
    let wallet = new Wallet(this.agent);
    let dids = await wallet.didPublic();
    return dids.result.did;
  }

  async getSchemaId(agent, schemaName){
    let schema = new Schema(agent);
    let schemaList = await schema.created(schemaName)
    console.log(schemaList)
    return schemaList.result.schema_ids[0];
  }

  async getCredDefId(agent, schemaName) {
    let credentialDefinition = new CredentialDefinition(agent);
    let credentialDefinitionList = await credentialDefinition.created(schemaName);
    return credentialDefinitionList.results.credential_definition_ids[0];
  }

  async getConnectionIdByDid(did) {
    let vc = await HLindyWallet.findOne({did: did})
    return vc.connection_id;
  }

  async getConnectionIdByTag(tag) {
    let connection = new Connection(this.agent);
    let connectionList = await connection.getList({state: 'active', their_label: tag});
    return connectionList.results[0].connection_id;
  }

  async getEndpoint(connection_id) {
    let connection = new Connection(this.agent);
    let endpoint = await connection.endpoints(connection_id);
    return endpoint.result.their_endpoint;
  }

  async getCredId() {

  }

  async getPresExId() {
    
  } 
}

module.exports.HLindyDidObject = HLindyDidObject;