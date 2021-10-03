const { Agent, Wallet, Schema, CredentialDefinition, Credential, IssueCredentialV2, Connection } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");
const url = require('url')

class HLindyRequestVC extends HLindyDidObject {

  async get() {
   
  }

  // async getList() {
  //   let credential = new Credential(this.agent);
  //   return await credential.getList({});
  // }

  // async issueVC(bodyHash) {
  //   let issueCredential = new IssueCredentialV2(this.agent);
  //   let did = await this.getDid();
  //   let schema_id = await this.getRequestSchemaId();
  //   let cred_def_id = await this.getReqestCredDefId();

  //   let body = {
  //     auto_remove: true,
  //     trace: false,
  //     credential_preview: {
  //       "@type": "/issue-credential/2.0/credential-preview",
  //       attributes: [
  //         { name: "bodyHash", value: bodyHash },
  //         { name: "hashAlgorism", value: hashAlgorism }
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

  async issue(issuerDid, bodyHash, hashAlgorism){
    let connection_id = await this.getConnectionId(issuerDid);
    let endpoint = await this.getEndpoint(connection_id);
    let url = new URL(endpoint);
    let theirAgent = new Agent('http', url.hostname, url.port)
    let issueCredential = new IssueCredentialV2(theirAgent);
    let schema_id = await this.getSchemaId({schema_name: 'message'});
    let cred_def_id = await this.getCredDefId({schema_name: 'message'});

    let body = {
      auto_remove: true,
      trace: false,
      connection_id: connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "bodyHash", value: bodyHash },
          { name: "hashAlgorism", value: hashAlgorism }
        ]
      },
      filter: {
        indy: {
          cred_def_id,
          schema_id,
          issuer_did: issuerDid,
          schema_version: "1.0",
          schema_issuer_did: issuerDid,
          schema_name: "message",
        }
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.send(body)
  }

  async getList() {
    let credential = new Credential(this.agent);
    let credentials = await credential.getList({});
    let cred_def_id = await this.getCredDefId({schema_name: 'message'});
    let requestCredentials = credentials.results.filter(credential => credential.cred_def_id == cred_def_id)
    return requestCredentials;
  }

  async delete() {
    let credential = new Credential(this.agent);
    let result = credential.delete({});
    return result;
  }
}

module.exports.HLindyRequestVC = HLindyRequestVC;