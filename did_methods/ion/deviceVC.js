let axios = require('axios');
const ngrok = require("ngrok");

let url = ngrok.getUrl;
    console.log(url)
class IonDeviceVC {

  async get() {

  }

  async getList() {
    
  }

  async issue() {
    let url = ngrok.getUrl;
    await axios.post(url + '/issue-request')
  }

  async verify() {
    let url = ngrok.getUrl;
    await axios.post(url + '/presentation-request')
  }

}

module.exports.IonDeviceVC = IonDeviceVC;