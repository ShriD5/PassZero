import bcrypt from "bcrypt";
import crypto from "crypto";
export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

// returns encrypted text
const algorithm = "aes-256-ctr";

const getHashFromKey = (key) => {
  return crypto.createHash("md5").update(key).digest("hex").toString();
};

export const encrypt = (text, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, getHashFromKey(key), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (encryptedData, iv, key) => {
  iv = Buffer.from(iv, "hex");
  const encryptedText = Buffer.from(encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, getHashFromKey(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// console.log(encrypt("lowda aa", "test"));

// module.exports = {
//   encrypt,
// };
// // returns decryprTed text
