const CryptoJS = require("crypto-js");

class Helper {
  constructor() {
  }
  encryptPassword(password, key) {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key).toString()
  }
  decryptPassword(password, key) {
    return CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8)
  }
}

module.exports = Helper
