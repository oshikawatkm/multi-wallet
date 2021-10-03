const { Agent, Wallet, Schema, CredentialDefinition, Credential, IssueCredentialV2, Connection } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");
const url = require('url')

class HLindyStreamVC extends HLindyDidObject {


  async get() {
    let credential = new Credential(this.agent);
    return await credential.getList({});
  }

  // async issueVC(
  //   connectionId, 
  //   dataHash, 
  //   updateFrequency, 
  //   startAt, 
  //   updatedAt
  // ) {
  //   let issueCredential = new IssueCredentialV2(this.agent);
  //   let did = await this.getDid();
  //   let schema_id = await this.getStreamSchemaId();
  //   let cred_def_id = await this.getStreamCredDefId();

  //   let body = {
  //     auto_remove: true,
  //     trace: false,
  //     credential_preview: {
  //       "@type": "/issue-credential/2.0/credential-preview",
  //       attributes: [
  //         { name: "connectionId", value: connectionId },
  //         { name: "dataHash", value: dataHash },
  //         { name: "updateFrequency", value: updateFrequency },
  //         { name: "startAt", value: startAt },
  //         { name: "updatedAt", value: updatedAt }
  //       ]
  //     },
  //     filter: {
  //       indy: {
  //         cred_def_id: cred_def_id,
  //         schema_id:  schema_id,
  //         issuer_did: did,
  //         schema_version: "1.0",
  //         schema_issuer_did: did,
  //         schema_name: "stream",
  //       },
  //     },
  //   }
  //   console.log(JSON.stringify(body))
  //   return await issueCredential.create(body)
  // }

  async issue(
    issuerDid,
    streamId, 
    dataHash, 
    updateFrequency, 
    startAt, 
    updatedAt
  ){
    let connection_id = await this.getConnectionId(issuerDid);
    let endpoint = await this.getEndpoint(connection_id);
    let url = new URL(endpoint);
    let theirAgent = new Agent('http', url.hostname, url.port)
    let issueCredential = new IssueCredentialV2(theirAgent);
    let schema_id = await this.getSchemaId({schema_name: 'stream'});
    let cred_def_id = await this.getCredDefId({schema_name: 'stream'});

    let body = {
      auto_remove: true,
      trace: false,
      connection_id: connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "streamId", value: streamId },
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
          issuer_did: issuerDid,
          schema_version: "1.0",
          schema_issuer_did: issuerDid,
          schema_name: "stream",
        }
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.send(body)
  }

  async getList() {
    let credential = new Credential(this.agent);
    let credentials = await credential.getList({});
    let cred_def_id = await this.getCredDefId({schema_name: 'stream'});
    let streamCredentials = credentials.results.filter(credential => credential.cred_def_id == cred_def_id)
    return streamCredentials;
  }

  async deleteStreamVC() {
    let credential = new Credential(this.agent);
    let result = credential.delete({});
    return result;
  }
}

module.exports.HLindyStreamVC = HLindyStreamVC;