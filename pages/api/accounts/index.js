import connectDB from "../../middlewares/mongodb";
import modelAccount from "../../../models/accountModel";
import modelUser from "../../../models/userModel";
import checkAuth from "../../middlewares/verify";

export default async function handler(req, res) {
  const { method } = req;
  const Account = modelAccount(await connectDB());
  const User = modelUser(await connectDB());
  const claims = await checkAuth(req, res);

  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({ fid: claims.sub });

        const accounts = await Account.find({ fid: user.fid });
        return res.status(200).json({ success: true, data: accounts });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }

    default:
      break;
  }
}
