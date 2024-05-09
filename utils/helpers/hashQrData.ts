import CryptoES from "crypto-es";
import CryptoJS from "crypto-js";

const encryptUserRecord = async (data: string) => {
  return new Promise<unknown>((resolve, reject) => {
    const encrypted = CryptoES.AES.encrypt(data, "User record").toString();

    if (!encrypted) {
      reject();
    }
    resolve(encrypted);
  });
};

const decryptUserRecord = async (data: string | unknown) => {
  return new Promise<unknown>((resolve, reject) => {
    const decrypted = CryptoJS.AES.decrypt(data, "User record");

    if (!decrypted) {
      reject();
    }
    resolve(decrypted.toString(CryptoJS.enc.Utf8));
  });
};

export { encryptUserRecord, decryptUserRecord };
