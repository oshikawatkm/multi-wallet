
class MockDeviceVC {

  async getCred(did) {
    let deviceCredential = {
        did: "CzdL98985yfEFKD2YsgzRc",
        name: "camera",
        description: "This is test",
        serviceEndpoint: "http://localhost:6000",
        registerAt: "2021-10-27T14:04:38.272Z"
      }
    return deviceCredential;
  }

  async getCredList() {
    let deviceCredentials = [
      {
        did: "CzdL98985yfEFKD2YsgzRc",
        name: "camera",
        description: "This is test",
        serviceEndpoint: "http://localhost:6000",
        registerAt: "2021-10-27T14:04:38.272Z"
      },
      {
        did: "DzdL98985yfEFKD2YsgzRc",
        name: "camera2",
        description: "This is test2",
        serviceEndpoint: "http://localhost:6666",
        registerAt: "2021-10-27T14:04:38.272Z"
      }
    ]
    return deviceCredentials;
  }

  async send(tag, serviceEndpoint, description) {
    return;
  }

  async requestProof(tag) {
    return;
  }

  async presentProof(tag) {
    return;
  }

  async verify(tag) {
    return;
  }
}



module.exports.MockDeviceVC = MockDeviceVC;