const { Agent, Wallet, Schema, CredentialDefinition, Credential, IssueCredentialV2, Connection } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");
const url = require('url')

class HLindyDeviceVC extends HLindyDidObject {

  async get() {
    let credential = new Credential(this.agent);
    return await credential.getList({});
  }

  // async issueDeviceVC(name, deviceId, registerAt) {
  //   let issueCredential = new IssueCredentialV2(this.agent);
  //   let did = await this.getDid();
  //   let schema_id = await this.getDeviceSchemaId();
  //   let cred_def_id = await this.getDeviceCredDefId();

  //   let body = {
  //     auto_remove: true,
  //     trace: false,
  //     credential_preview: {
  //       "@type": "/issue-credential/2.0/credential-preview",
  //       attributes: [
  //         { name: "name", value: name },
  //         { name: "deviceId", value: deviceId },
  //         { name: "registerAt", value: registerAt }
  //       ]
  //     },
  //     filter: {
  //       indy: {
  //         cred_def_id: cred_def_id,
  //         schema_id:  schema_id,
  //         issuer_did: did,
  //         schema_version: "1.0",
  //         schema_issuer_did: did,
  //         schema_name: "device",
  //       },
  //     },
  //   }
  //   console.log(JSON.stringify(body))
  //   return await issueCredential.create(body)
  // }

  async issue(issuerDid, name, deviceId, registerAt){
    let connection_id = await this.getConnectionId(issuerDid);
    let endpoint = await this.getEndpoint(connection_id);
    let url = new URL(endpoint);
    let theirAgent = new Agent('http', url.hostname, url.port)
    let issueCredential = new IssueCredentialV2(theirAgent);
    let schema_id = await this.getSchemaId({schema_name: 'device'});
    let cred_def_id = await this.getCredDefId({schema_name: 'device'});

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
          issuer_did: issuerDid,
          schema_version: "1.0",
          schema_issuer_did: issuerDid,
          schema_name: "device",
        }
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.send(body)
  }

  async getList() {
    let credential = new Credential(this.agent);
    let credentials = await credential.getList({});
    let cred_def_id = await this.getDeviceCredDefId();
    let deviceCredentials = credentials.results.filter(credential => credential.cred_def_id == cred_def_id)
    return deviceCredentials;
  }

  async delete() {
    let credential = new Credential(this.agent);
    let result = credential.delete({});
    return result;
  }

}

module.exports.HLindyDeviceVC = HLindyDeviceVC;