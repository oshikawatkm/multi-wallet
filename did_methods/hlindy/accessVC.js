const { PresentProofV2, Credential, IssueCredentialV2 } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid")

class HLindyAccessVC extends HLindyDidObject {

  async getCred(did) {
    let credentials = await this.getList()
    credentials = credentials.filter(credential => credential.did == did)
    return await credentials[0];
  }

  async getCredList() {
    let credentials = await this.getList();
    credentialList = credentials.map(credential => credential.attrs)
    return credentialList;
  }

  async send(tag, endpointUrl){
    let did = await this.getDid();
    let connection_id = await this.getConnectionIdByTag(tag);
    let issueCredential = new IssueCredentialV2(this.agent);
    let schema_id = await this.getDeviceCredDefId();
    let cred_def_id = await this.getDeviceCredDefId();

    let body = {
      auto_remove: true,
      trace: false,
      connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "did", value: did },
          { name: "endpointUrl", value: endpointUrl },
          { name: "registerAt", value: new Date() }
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

  async requestProof(tag) {
    let presentProof = new PresentProofV2(this.agent);
    let connection_id = await this.getConnectionIdByTag(tag);
    let cred_def_id = await this.getDeviceCredDefId();

    let proofRequestBody = {
      comment: "access proof request",
      trace: false,
      connection_id,
      presentation_request: {
        indy: {
          name: "Proof Request",
          version: "1.0",
          requested_attributes: {
            "0_did_uuid": {
              name: "did",
              restrictions: [{
                cred_def_id
              }],
            },
            "0_endpointUrl_uuid": {
              name: "endpointUrl",
              restrictions: [{
                cred_def_id
              }],
            },
            "0_registerAt_uuid": {
              name: "registerAt",
              restrictions: [{
                cred_def_id
              }],
            },
          },
          requested_predicates: {}
        }
      }
    };
    let result = await presentProof.sendRequest(proofRequestBody);
    return result;
  }

  async presentProof(){
    let presentProof = new PresentProofV2(this.agent);
    let credential = await this.getLatestCred();
    let cred_id = credential.referent;
    let pres_ex_id = await this.getPresExId('request-received');

    let presentProofBody = {
      indy: {
        requested_attributes: {
          "0_did_uuid": {
            cred_id,
            revealed: true
          },
          "0_endpointUrl_uuid": {
            cred_id,
            revealed: true
          },
          "0_registerAt_uuid": {
            cred_id,
            revealed: true
          }
        },
        requested_predicates: {},
        self_attested_attributes: {},
        trace: false
      },
      trace: true
    }
    let result = await presentProof.recordsSendPresentation(pres_ex_id, presentProofBody);
    return result;
  }

  async verify() {
    let presentProof = new PresentProofV2(this.agent);
    let pres_ex_id = await this.getPresExId('presentation-received');
    let result = await presentProof.recordsVerifyPresentation(pres_ex_id);
    return result;
  }

  async getIssuedVC() {
    let issueCredential = new IssueCredentialV2(this.agent);
    let credentials = await issueCredential.records({});
    return credentials.results;
  }

  // private

  async getAccessCredDefId() {
    let schema_id = await this.getSchemaId(this.agent, {schema_name: 'access'});
    return schema_id;
  }

  async getAccessCredDefId() {
    let cred_def_id = await this.getCredDefId(this.agent, {schema_name: 'access'});
    return cred_def_id;
  }

  async getLatestCred() {
    let credenials = await this.getList();
    return credenials[0];
  }

  async getPresExId(status_filter) {
    let presentProof = new PresentProofV2(this.agent);
    let presExs = await presentProof.records({ state: status_filter });
    let presEx = presExs.results.results.filter(presEx => presEx.state == status_filter);
    let latestPresEx = presEx[0];
    return latestPresEx.pres_ex_id;
  }

  async getList() {
    let credential = new Credential(this.agent);
    let credentials = await credential.getList({});
    let cred_def_id = await this.getAccessCredDefId();
    let accessCredentials = credentials.results.filter(credential => credential.cred_def_id == cred_def_id)
    if (accessCredentials.length == 0){
      deviceCredentials = credentials.results.filter(credential => credential.cred_def_id.includes('access') == true)
    }
    return accessCredentials;
  }
}

module.exports.HLindyAccessVC = HLindyAccessVC;