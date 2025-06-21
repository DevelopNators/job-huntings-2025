import CryptoJS from 'crypto-js';
 
const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_ENCRYPTION_KEY);
const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_ENCRYPTION_IV);


const CryptoService = {
  
  encrypt: (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
    return encryptedData;
  },

  decrypt: (encryptedData) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  },

  encryptForUrl: (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
    const urlEncodedData = encodeURIComponent(encryptedData).replace(/\//g, '_');
    return urlEncodedData;
  },

  decryptFromUrl: (urlEncodedData) => {
    const encryptedData = decodeURIComponent(urlEncodedData.replace(/_/g, '/'));
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  },
};

export default CryptoService;












// import CryptoJS from 'crypto-js';

// const secretKey = 'MySecretKey123!@#';

// const cryptoSerice = {
//   encrypt: (data) => {
//     const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//     return encryptedData;
//   },

//   decrypt: (encryptedData) => {
//     const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//     const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
//     return decryptedData;
//   },
//   encryptForUrl: (data) => {
//     const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//     const urlEncodedData = encodeURIComponent(encryptedData).replace(/\//g, '_');
//     return urlEncodedData;
//   },

//   decryptFromUrl: (urlEncodedData) => {
//     const encryptedData = decodeURIComponent(urlEncodedData.replace(/_/g, '/'));
//     const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//     const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
//     return decryptedData;
//   },
// };

// export default cryptoSerice;
