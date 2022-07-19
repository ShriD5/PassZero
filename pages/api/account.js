import connectDB from "../middlewares/mongodb";
import modelAccount from "../../models/accountModel";
import modelUser from "../../models/userModel";
import checkAuth from "../middlewares/verify";
import { comparePassword } from "../src/utils/crypto.utils";
import { encrypt, decrypt } from "../src/utils/crypto.utils";

export default async function handler(req, res) {
  const { method } = req;
  const Account = modelAccount(await connectDB());
  const User = modelUser(await connectDB());
  const claims = await checkAuth(req, res);

  switch (method) {
    case "POST":
      const user = await User.findOne({ fid: claims.sub });

      try {
        if (comparePassword(req.body.MasterPassword, user.masterPassword)) {
          console.log(123);

          const { accountName, password, website, username } = req.body;
          const ecpt = encrypt(password, req.body.MasterPassword);

          const account = await Account.create({
            fid: claims.sub,
            name: accountName,
            password: ecpt.content,
            domain: website,
            iv: ecpt.iv,
            username,
          });

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
