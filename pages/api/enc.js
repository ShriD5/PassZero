import { decrypt, encrypt } from "../src/utils/crypto.utils";
const { createHmac } = import("crypto");

export default async function handler(req, res) {
  const { method } = req;
  console.log(encrypt("Shrithan is gay", "gay@123"));
  console.log(
    decrypt(
      "5f57470e6cd2cbe55f7ef1ac35bea7",
      "80de1c2a758c32fe63aa4ada5f9a0a12",
      "gay@123"
    )
  );
  switch (method) {
    case "POST":
      // const hashedMP = hashPassword();

      try {
        console.log();
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }

      break;

    default:
      break;
  }
}
