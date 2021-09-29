const { Wallet, Schema, CredentialDefinition, Credential, IssueCredentialV2, Connection } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");


class HLindyStreamVC extends HLindyDidObject {

  async get() {
   
  }

  async getList() {
    let credential = new Credential(this.agent);
    return await credential.getList({});
  }

  async issueStreamVC(
    connectionId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt
  ) {
    let issueCredential = new IssueCredentialV2(this.agent);
    let did = await this.getDid();
    let schema_id = await this.getStreamSchemaId();
    let cred_def_id = await this.getStreamCredDefId();

    let body = {
      auto_remove: true,
      trace: false,
      credential_preview: {
        "@type": "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "connectionId", value: connectionId },
          { name: "dataHash", value: dataHash },
          { name: "updateFrequency", value: updateFrequency },
          { name: "startAt", value: startAt },
          { name: "updatedAt", value: updatedAt }
        ]
      },
      filter: {
        indy: {
          cred_def_id: cred_def_id,
          schema_id:  schema_id,
          issuer_did: did,
          schema_version: "1.0",
          schema_issuer_did: did,
          schema_name: "stream",
        },
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.create(body)
  }

  async sendStreamVC(
    athorsDid,
    connectionId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt
  ){
    let issueCredential = new IssueCredentialV2(this.agent);
    let did = await this.getDid();
    let schema_id = await this.getStreamSchemaId();
    let cred_def_id = await this.getStreamCredDefId();
    let connection_id = await this.getConnectionId(athorsDid);

    let body = {
      auto_remove: true,
      trace: false,
      connection_id: connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "connectionId", value: connectionId },
          { name: "dataHash", value: dataHash },
          { name: "updateFrequency", value: updateFrequency },
          { name: "startAt", value: startAt },
          { name: "updatedAt", value: updatedAt }
        ]
      },
      filter: {
        indy: {
          cred_def_id,
          schema_id,
          issuer_did: did,
          schema_version: "1.0",
          schema_issuer_did: did,
          schema_name: "stream",
        }
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.send(body)
  }

  async getStreams() {
    let credential = new Credential(this.agent);
    let credentials = await credential.getList({});
    let cred_def_id = await this.getStreamCredDefId();
    let streamCredentials = credentials.results.filter(credential => credential.cred_def_id == cred_def_id)
    return streamCredentials;
  }

  async deleteStreamVC() {
    let credential = new Credential(this.agent);
    let result = credential.delete({});
    return result;
  }

  // private

  async getDid() {
    let wallet = new Wallet(this.agent);
    let dids = await wallet.did({posture: 'posted'});
    return dids.results[0].did;
  }

  async getStreamSchemaId(){
    let schema = new Schema(this.agent);
    let schemaList = await schema.created({schema_name: 'stream'})
    console.log(schemaList)
    return schemaList.result.schema_ids[0];
  }

  async getStreamCredDefId() {
    let credentialDefinition = new CredentialDefinition(this.agent);
    let credentialDefinitionList = await credentialDefinition.created({schema_name:'stream'});
    return credentialDefinitionList.results.credential_definition_ids[0];
  }

  async getConnectionId(did) {
    let connection = new Connection(this.agent);
    let connectionList = await connection.getList({state: 'active', their_did: did});
    return connectionList.results[0].connection_id;
  }

}

module.exports.HLindyStreamVC = HLindyStreamVC;