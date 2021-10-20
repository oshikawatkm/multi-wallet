const { Agent, PresentProofV2, Credential, IssueCredentialV2 } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid")

class HLindyAccessVC extends HLindyDidObject {

  async get() {
    let credential = new Credential(this.agent);
    return await credential.getList({});
  }


  async send(tag, endpointUrl, registerAt){
    let connection_id = await this.getConnectionIdByTag(tag);
    let endpoint = await this.getEndpoint(connection_id);
    let url = new URL(endpoint);
    let theirAgent = new Agent('http', url.hostname, url.port)
    let issueCredential = new IssueCredentialV2(theirAgent);
    let schema_id = await this.getSchemaId(theirAgent, {schema_name: 'device'});
    let cred_def_id = await this.getCredDefId(theirAgent, {schema_name: 'device'});

    let body = {
      auto_remove: true,
      trace: false,
      connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "endpointUrl", value: endpointUrl },
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

  async verify() {

  }

}

module.exports.HLindyAccessVC = HLindyAccessVC;