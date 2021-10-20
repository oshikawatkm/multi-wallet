
const { Agent, Schema, CredentialDefinition, Connection } = require("indy-request-js");


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
      let dids = await wallet.did({posture: 'posted'});
      return dids.results[0].did;
    }
  
  // private

  async getDid() {
    let wallet = new Wallet(this.agent);
    let dids = await wallet.didPublic();
    return dids.results[0].did;
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

  async getConnectionId(did) {
    let connection = new Connection(this.agent);
    let connectionList = await connection.getList({state: 'active', their_did: did});
    return connectionList.results[0].connection_id;
  }

  async getEndpoint(connection_id) {
    let connection = new Connection(this.agent);
    let endpoint = await connection.endpoints(connection_id);
    return endpoint.result.their_endpoint;
  }
}

module.exports.HLindyDidObject = HLindyDidObject;