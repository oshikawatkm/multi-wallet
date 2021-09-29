
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

}

module.exports.HLindyDidObject = HLindyDidObject;