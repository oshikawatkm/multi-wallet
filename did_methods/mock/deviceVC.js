

class MockDeviceVC {

  async get() {
    let deviceCredential = {
      "referent": "20ef6d33-659b-471a-8448-48c9fa1ff569",
      "attrs": {
        "did": "CzdL98985yfEFKD2YsgzRc",
        "name": "camera",
        "description": "This is test",
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

  async send(tag, endpointUrl, registerAt) {
    return;
  }

  async getList() {
    let deviceCredentials = [
      {
        "referent": "20ef6d33-659b-471a-8448-48c9fa1ff569",
        "attrs": {
          "did": "CzdL98985yfEFKD2YsgzRc",
          "name": "camera",
          "description": "This is test",
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
          "did": "DzdL98985yfEFKD2YsgzRc",
          "name": "camera2",
          "description": "This is test2",
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



module.exports.MockDeviceVC = MockDeviceVC;