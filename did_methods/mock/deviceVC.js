
class MockDeviceVC {

  async getCred(did) {
    let deviceCredential = {
        did: "CzdL98985yfEFKD2YsgzRc",
        name: "camera",
        description: "This is test",
        serviceEndpoint: "http://localhost:6000",
        registerAt: "1635341222291"
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
        registerAt: "1635341222291"
      },
      {
        did: "DzdL98985yfEFKD2YsgzRc",
        name: "camera2",
        description: "This is test2",
        serviceEndpoint: "http://localhost:6666",
        registerAt: "1635341222291"
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

  async presentProof() {
    return;
  }

  async verify() {
    return;
  }
}



module.exports.MockDeviceVC = MockDeviceVC;