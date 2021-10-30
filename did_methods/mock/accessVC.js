

class MockAccessVC {
  async getCred(did) {
    let deviceCredential = {
        did: "AzdL98985yfEFKD2YsgzRc",
        endpointUrl: "http://localhost:6000",
        registerAt: "2021-10-27T14:04:38.272Z"
      }
    return deviceCredential;
  }

  async getCredList() {
    let deviceCredentials = [
      {
        did: "AzdL98985yfEFKD2YsgzRc",
        endpointUrl: "http://localhost:6000",
        registerAt: "2021-10-27T14:04:38.272Z"
      },
      {
        did: "BzdL98985yfEFKD2YsgzRc",
        endpointUrl: "http://localhost:6666",
        registerAt: "2021-10-27T14:04:38.272Z"
      }
    ]
    return deviceCredentials;
  }

  async send(tag, endpointUrl) {
    return;
  }

  async requestProof(tag) {
    let requestProof = {
        id: "84b7895a-9b1f-41e5-9321-ab87e35fa663",
        state: "request-sent",
        created_at: "2021-10-29 00:53:03.172835Z",
        updated_at: "2021-10-29 00:53:03.172835Z"
      }
    return requestProof;
  }

  async presentProof(tag) {
    return;
  }

  async verify(tag) {
    return;
  }

  async getRequestProofs() {
    let requestProofs = [
      {
        id: "84b7895a-9b1f-41e5-9321-ab87e35fa663",
        state: "request-received",
        created_at: "2021-10-29 00:53:03.172835Z",
        updated_at: "2021-10-29 00:53:03.172835Z"
      },
      {
        id: "11111111-1111-1111-1111-111111111111",
        state: "request-received",
        created_at: "2021-10-29 00:53:03.172835Z",
        updated_at: "2021-10-29 00:53:03.172835Z"
      }
    ]
    return requestProofs;
  }
}

module.exports.MockAccessVC = MockAccessVC;