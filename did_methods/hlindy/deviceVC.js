const { PresentProofV2, Credential, IssueCredentialV2 } = require("indy-request-js");
const { HLindyDidObject } = require("./_hlindyDid");

class HLindyDeviceVC extends HLindyDidObject {

  async getCred(did) {
    let credentials = await this.getCredList()
    credentials = credentials.filter(credential => credential.did == did)
    return await credentials[0];
  }

  async getCredList() {
    let credential = new Credential(this.agent);
    let credentials = await credential.getList({});
    let cred_def_id = await this.getDeviceCredDefId();
    let deviceCredentials = credentials.results.filter(credential => credential.cred_def_id == cred_def_id)
    if (deviceCredentials.length == 0){
      deviceCredentials = credentials.results.filter(credential => credential.cred_def_id.includes('device') == true)
    }
    return deviceCredentials;
  }

  async send(tag, serviceEndpoint, description){
    let did = await this.getDid();
    let connection_id = await this.getConnectionIdByTag(tag);
    let issueCredential = new IssueCredentialV2(this.agent);
    let schema_id = await this.getDeviceSchemaId();
    let cred_def_id = await this.getDeviceCredDefId();

    let body = {
      auto_remove: true,
      trace: false,
      connection_id,
      credential_preview: {
        "@type":  "/issue-credential/2.0/credential-preview",
        attributes: [
          { name: "did", value: did },
          { name: "name", value: tag },
          { name: "serviceEndpoint", value: serviceEndpoint },
          { name: "description", value: description },
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
          schema_name: "device"
        }
      },
    }
    console.log(JSON.stringify(body))
    return await issueCredential.send(body)
  }

  async requestProof(did) {
    let presentProof = new PresentProofV2(this.agent);
    let connection_id = await this.getConnectionIdByDID(did);
    let cred_def_id = await this.getDeviceCredDefId();

    let proofRequestBody = {
      comment: "device proof request",
      trace: false,
      connection_id,
      presentation_request: {
        indy: {
          name: "deviceVC",
          version: "1.0",
          requested_attributes: {
            "0_did_uuid": {
              name: "did",
              restrictions: [{
                cred_def_id
              }],
            },
            "0_name_uuid": {
              name: "name",
              restrictions: [{
                cred_def_id
              }],
            },
            "0_serviceEndpoint_uuid": {
              name: "serviceEndpoint",
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

    let requestProofs = result.results.map(requestProof => {
      if (requestProof.by_format.pres_request.indy.name == "deviceVC") {
        return {
          id: requestProof.pres_ex_id,
          state: requestProof.state,
          created_at: requestProof.created_at,
          updated_at: requestProof.updated_at
        }
      }
    })
    return requestProofs;
  }

  async presentProof(tag){
    let presentProof = new PresentProofV2(this.agent);
    let credential = await this.getLatestCred();
    let cred_id = credential.referent;
    let pres_ex_id = await this.getPresExId(tag, 'request-received');

    let presentProofBody = {
      indy: {
        requested_attributes: {
          "0_did_uuid": {
            cred_id,
            revealed: true
          },
          "0_name_uuid": {
            cred_id,
            revealed: true
          },
          "0_serviceEndpoint_uuid": {
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

  async verify(tag) {
    let presentProof = new PresentProofV2(this.agent);
    let pres_ex_id = await this.getPresExId(tag, 'presentation-received');
    let result = await presentProof.recordsVerifyPresentation(pres_ex_id);
    return result;
  }

  async getRequestProofs() {
    let presentProof = new PresentProofV2(this.agent);
    let records = await presentProof.records({ role: 'prover' }) 
    let requestProofs = records.results.map(requestProof => {
      if (requestProof.by_format.pres_request.indy.name == "deviceVC") {
        return {
          id: requestProof.pres_ex_id,
          state: requestProof.state,
          created_at: requestProof.created_at,
          updated_at: requestProof.updated_at
        }
      }
    })
    return requestProofs;
  }

  async delete() {
    let credential = new Credential(this.agent);
    let result = credential.delete({});
    return result;
  }


  // private

  async getDeviceSchemaId() {
    let schema_id = await this.getSchemaId(this.agent, {schema_name: 'device'});
    return schema_id;
  }

  async getDeviceCredDefId() {
    let cred_def_id = await this.getCredDefId(this.agent, {schema_name: 'device'});
    return cred_def_id;
  }

  async getLatestCred() {
    let credenials = await this.getCredList();
    return credenials[0];
  }

  async getPresExId(tag, status_filter) {
    let presentProof = new PresentProofV2(this.agent);
    let connection_id = await this.getConnectionIdByTag(tag);
    let presExs = await presentProof.records({ connection_id, state: status_filter });
    let presEx = presExs.results.results.filter(presEx => presEx.state == status_filter)
    let latestPresEx = presEx[0];
    return latestPresEx.pres_ex_id;
  }
}

module.exports.HLindyDeviceVC = HLindyDeviceVC;