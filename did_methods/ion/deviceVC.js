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
    let response = await axios.get(url + '/issue-request');
    let url_strs = response.split('?request_uri=');
    let redirect_url = url_strs[1].replace('%3A%2F%2F', '://').replace('%2F', '/').replace('%3F', '?').replace('%3D', '=');
    console.log('========================')
    console.log(redirect_url)
    console.log('========================')
    let jwt = await axios.get(redirect_url);
  }

  async verify() {
    let url = ngrok.getUrl;
    await axios.post(url + '/presentation-request')
  }

}

module.exports.IonDeviceVC = IonDeviceVC;