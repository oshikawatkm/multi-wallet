const { Agent, Wallet, Schema, CredentialDefinition, Credential, IssueCredentialV2, Connection } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");


class HLindyDeviceVC extends HLindyDidObject {

  async get() {
   
  }

  async getList() {
    let credential = new Credential(this.agent);
    return await credential.getList({});
  }

  async issueDeviceVC(name, deviceId, registerAt) {
    let issueCredential = new IssueCredentialV2(this.agent);
    let did = await this.getDid();
    let schema_id = await this.getDeviceSchemaId();
    let cred_def_id = await this.getDeviceCredDefId();

    let body = {
      auto_remove: true,
      trace: false,
      credential_preview: {
        "@type": "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "name", value: name },
          { name: "deviceId", value: deviceId },
          { name: "registerAt", value: registerAt }
        ]
      },
      filter: {
        indy: {
          cred_def_id: cred_def_id,
          schema_id:  schema_id,
          issuer_did: did,
          schema_version: "1.0",
          schema_issuer_did: did,
          schema_name: "device",
        },
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.create(body)
  }

  async sendDeviceVC(athorsDid, host, port, name, deviceId, registerAt){
    let theirAgent = new Agent('http', host, port)
    let issueCredential = new IssueCredentialV2(theirAgent);
    let did = await this.getDid(theirAgent);
    let schema_id = await this.getDeviceSchemaId(theirAgent);
    let cred_def_id = await this.getDeviceCredDefId(theirAgent);
    let connection_id = await this.getConnectionId(theirAgent);

    let body = {
      auto_remove: true,
      trace: false,
      connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "name", value: name },
          { name: "deviceId", value: deviceId },
          { name: "registerAt", value: registerAt }
        ]
      },
      filter: {
        indy: {
          cred_def_id,
          schema_id,
          issuer_did: did,
          schema_version: "1.0",
          schema_issuer_did: did,
          schema_name: "device",
        }
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.send(body)
  }

  async getDevices() {
    let credential = new Credential(this.agent);
    let credentials = await credential.getList({});
    let cred_def_id = await this.getDeviceCredDefId();
    let deviceCredentials = credentials.results.filter(credential => credential.cred_def_id == cred_def_id)
    return deviceCredentials;
  }

  async deleteDeviceVC() {
    let credential = new Credential(this.agent);
    let result = credential.delete({});
    return result;
  }

  // private

  async getDid(agent) {
    let wallet = new Wallet(agent);
    let dids = await wallet.did({posture: 'posted'});
    return dids.results[0].did;
  }

  async getDeviceSchemaId(agent){
    let schema = new Schema(agent);
    let schemaList = await schema.created({schema_name: 'device'})
    return schemaList.result.schema_ids[0];
  }

  async getDeviceCredDefId(agent) {
    let credentialDefinition = new CredentialDefinition(agent);
    let credentialDefinitionList = await credentialDefinition.created({schema_name:'device'});
    return credentialDefinitionList.results.credential_definition_ids[0];
  }

  async getConnectionId(agent) {
    let connection = new Connection(agent);
    let connectionList = await connection.getList({state: 'active'});
    return connectionList.results[0].connection_id;
  }
}

module.exports.HLindyDeviceVC = HLindyDeviceVC;