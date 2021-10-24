

class MockAccessVC {
  async get(did) {
    let deviceCredential = {
      "referent": "20ef6d33-659b-471a-8448-48c9fa1ff569",
      "attrs": {
        "did": "AzdL98985yfEFKD2YsgzRc",
        "serviceEndpoint": "http://localhost:6000",
        "registerAt": "1634880668181"
      },
      "schema_id": "VnWEB4yT58y5R9RokxU5eB:2:device:1.0",
      "cred_def_id": "VnWEB4yT58y5R9RokxU5eB:3:CL:12:device",
      "rev_reg_id": null,
      "cred_rev_id": null
    }
    return deviceCredential;
  }

  async send(
    tag, 
    name, 
    serviceEndpoint, 
    description, 
    registerAt
  ) {
    return;
  }

  async getList() {
    let deviceCredentials = [
      {
        "referent": "20ef6d33-659b-471a-8448-48c9fa1ff569",
        "attrs": {
          "did": "AzdL98985yfEFKD2YsgzRc",
          "serviceEndpoint": "http://localhost:6000",
          "registerAt": "1634880668181"
        },
        "schema_id": "VnWEB4yT58y5R9RokxU5eB:2:device:1.0",
        "cred_def_id": "VnWEB4yT58y5R9RokxU5eB:3:CL:12:device",
        "rev_reg_id": null,
        "cred_rev_id": null
      },
      {
        "referent": "11111111-1111-1111-1111-111111111111",
        "attrs": {
          "did": "BzdL98985yfEFKD2YsgzRc",
          "serviceEndpoint": "http://localhost:6666",
          "registerAt": "1634880668181"
        },
        "schema_id": "VnWEB4yT58y5R9RokxU5eB:2:device:1.0",
        "cred_def_id": "VnWEB4yT58y5R9RokxU5eB:3:CL:12:device",
        "rev_reg_id": null,
        "cred_rev_id": null
      }
    ]
    return deviceCredentials;
  }
}

module.exports.MockAccessVC = MockAccessVC;