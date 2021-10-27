

class MockAccessVC {
  async get(did) {
    let deviceCredential = {
        did: "AzdL98985yfEFKD2YsgzRc",
        endpointUrl: "http://localhost:6000",
        registerAt: "1634880668181"
      }
    return deviceCredential;
  }

  async getList() {
    let deviceCredentials = [
      {
        did: "AzdL98985yfEFKD2YsgzRc",
        endpointUrl: "http://localhost:6000",
        registerAt: "1634880668181"
      },
      {
        did: "BzdL98985yfEFKD2YsgzRc",
        endpointUrl: "http://localhost:6666",
        registerAt: "1634880668181"
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