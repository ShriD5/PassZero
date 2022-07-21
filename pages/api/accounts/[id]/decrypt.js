import connectDB from "../../../middlewares/mongodb";
import modelAccount from "../../../../models/accountModel";
import modelUser from "../../../../models/userModel";
import checkAuth from "../../../middlewares/verify";
import { comparePassword } from "../../../src/utils/crypto.utils";
import { decrypt } from "../../../src/utils/crypto.utils";

export default async function handler(req, res) {
  const { method } = req;
  const Account = modelAccount(await connectDB());
  const User = modelUser(await connectDB());
  const claims = await checkAuth(req, res);

  switch (method) {
    case "POST":
      const user = await User.findOne({ fid: claims.sub });

      try {
        if (comparePassword(req.body.masterPassword, user.masterPassword)) {
          const account = await Account.findById(req.query.id);

          const dcpt = decrypt(
            account.password,
            account.iv,
            req.body.masterPassword
          );
          return res.status(201).json({ success: true, data: dcpt });
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
