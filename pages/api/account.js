import connectDB from "../middlewares/mongodb";
import modelAccount from "../../models/accountModel";
import modelUser from "../../models/userModel";
import checkAuth from "../middlewares/verify";
import { comparePassword } from "../src/utils/crypto.utils";
import "mongoose-field-encryption";

import { fieldEncryption } from "mongoose-field-encryption";

export default async function handler(req, res) {
  const { method } = req;
  const Account = modelAccount(await connectDB());
  const User = modelUser(await connectDB());
  const claims = await checkAuth(req, res);

  switch (method) {
    case "POST":
      // const hashedMP = hashPassword();
      const user = await User.findOne({ fid: claims.sub });

      try {
        console.log(req.body.MasterPassword, user.masterPassword);
        if (comparePassword(req.body.MasterPassword, user.masterPassword)) {
          console.log(123);

          const { accountName, password, website, username } = req.body;

          // const { createHmac } = await import("crypto");
          // const secret = User.masterPassword;
          // const hash = createHmac("sha256", secret)
          //   .update({ password })
          //   .digest("hex");
          // console.log(hash, "shrithan");

          const account = await Account.create({
            fid: claims.sub,
            name: accountName,
            password,
            domain: website,
            username,
          });
          console.log("chal Lwde");

          return res
            .status(201)
            .json({ success: true, message: "account created", data: account });
        } else {
          return res.status(400).json({ success: false });
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }

      break;

    default:
      break;
  }
}
