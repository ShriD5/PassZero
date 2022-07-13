import bcrypt from "bcrypt";

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

// returns encrypted text
// const algorithm = "aes-256-ctr";

// const getHashFromKey = (key) => {
//   const hash = crypto.createHash("sha1");
//   hash.update(key);

//   return hash.digest().prototype.slice(0, 16);
// };

// const encrypt = (text, key) => {
//   const iv = crypto.randomBytes(16);
//   const salt = "foobar";
//   const hash = crypto.createHash("sha1");

//   hash.update(salt);

// // `hash.digest()` returns a Buffer by default when no encoding is given
// let key = hash.digest().slice(0, 16);

// const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
//   const cipher = crypto.createCipheriv(algorithm, getHashFromKey(key), iv);
//   const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

//   return {
//     iv: iv.toString("hex"),
//     content: encrypted.toString("hex"),
//   };
// };

// console.log(encrypt("lowda aa", "test"));

// module.exports = {
//   encrypt,
// };
// // returns decryprTed text
