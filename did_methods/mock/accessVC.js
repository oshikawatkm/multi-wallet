

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
    return;
  }

  async presentProof() {
    return;
  }

  async verify() {
    return;
  }

}

module.exports.MockAccessVC = MockAccessVC;