const { Agent, PresentProofV2, Credential, IssueCredentialV2 } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid")

class HLindyAccessVC extends HLindyDidObject {

  async get() {
    let credential = new Credential(this.agent);
    return await credential.getList({});
  }


  async send(tag, endpointUrl, registerAt){
    let did = await this.getDid();
    let connection_id = await this.getConnectionIdByTag(tag);
    let issueCredential = new IssueCredentialV2(this.agent);
    let schema_id = await this.getSchemaId(this.agent, {schema_name: 'access'});
    let cred_def_id = await this.getCredDefId(this.agent, {schema_name: 'access'});

    let body = {
      auto_remove: true,
      trace: false,
      connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "did", value: did },
          { name: "endpointUrl", value: endpointUrl },
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
          schema_name: "access"
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