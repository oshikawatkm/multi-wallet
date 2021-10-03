
const { Agent, Schema, CredentialDefinition } = require("indy-request-js");


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
    let dids = await wallet.did({posture: 'posted'});
    return dids.results[0].did;
  }

  async getSchemaId(schema){
    let schema = new Schema(this.agent);
    let schemaList = await schema.created(schema)
    console.log(schemaList)
    return schemaList.result.schema_ids[0];
  }

  async getCredDefId(schema) {
    let credentialDefinition = new CredentialDefinition(this.agent);
    let credentialDefinitionList = await credentialDefinition.created(schema);
    return credentialDefinitionList.results.credential_definition_ids[0];
  }

  async getConnectionId(did) {
    let connection = new Connection(this.agent);
    let connectionList = await connection.getList({state: 'active', their_did: did});
    return connectionList.results[0].connection_id;
  }


}

module.exports.HLindyDidObject = HLindyDidObject;