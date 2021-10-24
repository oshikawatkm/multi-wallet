
class MockDid {

  async get() {
    return;
  }

  async getList() {
    return;
  }

  async issue(keyType) {
    return;
  }

  async resolve(did) {
    return;
  }

  async getPublicKeys() {
    return;
  }

  async createPublicKey(did) {
    return;
  }

  async getDidEndpoint(did) {
    return;
  }

  async setDidEndpoint(did, endpoint, endpointType) {
  return;
  }

}

module.exports.MockDid = MockDid;