const { Agent, PresentProofV2, Credential, IssueCredentialV2 } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");
const url = require('url')

class HLindyDeviceVC extends HLindyDidObject {

  async get() {
    let credential = new Credential(this.agent);
    return await credential.getList({});
  }

  // async issue(name, deviceId, registerAt) {
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

  async send(
    tag, 
    name, 
    serviceEndpoint, 
    description, 
    registerAt
  ){
    let did = await this.getDid();
    let connection_id = await this.getConnectionIdByTag(tag);
    let issueCredential = new IssueCredentialV2(this.agent);
    let schema_id = await this.getSchemaId(this.agent, {schema_name: 'device'});
    let cred_def_id = await this.getCredDefId(this.agent, {schema_name: 'device'});

    let body = {
      auto_remove: true,
      trace: false,
      connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "did", value: did },
          { name: "name", value: name },
          { name: "serviceEndpoint", value: serviceEndpoint },
          { name: "description", value: description },
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
          schema_name: "device"
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

  async verify(tag) {
    let presentProof = new PresentProofV2(this.agent);
    let connection_id = await this.getConnectionIdByTag(tag);
    let cred_def_id = await this.getCredDefId(this.agent, {schema_name: 'device'});

    let proofRequestBody = {
        connection_id,
        presentation_request: {
          indy: {
            name: "Proof Request",
            version: "1.0",
            requested_attributes: {
              "0_name_uuid": {
                name: "name",
                restrictions: [{
                  cred_def_id
                }],
              },
              "0_deviceId_uuid": {
                name: "deviceId",
                restrictions: [{
                  cred_def_id
                }],
                "0_self_attested_things_uuid": {
                  name: "self_attested_thing"
                }
              },
              requested_predicates: []
            }
          }
        }
      };

    let result = await presentProof.sendRequest(proofRequestBody);
    return result;
  }
}

module.exports.HLindyDeviceVC = HLindyDeviceVC;