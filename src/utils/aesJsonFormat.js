import CryptoJS from 'crypto-js'

const CryptoJSAesJson = {
  stringify(cipherParams) {
    const jsonData = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
    }
    if (cipherParams.iv) {
      jsonData.iv = cipherParams.iv.toString()
    }
    if (cipherParams.salt) {
      jsonData.s = cipherParams.salt.toString()
    }
    return JSON.stringify(jsonData).replace(/\s/g, '')
  },
  parse(jsonStr) {
    const jsonData = JSON.parse(jsonStr)
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonData.ct)
    })
    if (jsonData.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(jsonData.iv)
    }
    if (jsonData.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(jsonData.s)
    }
    return cipherParams
  }
}

export default CryptoJSAesJson
