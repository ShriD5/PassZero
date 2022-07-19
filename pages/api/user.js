import connectDB from "../middlewares/mongodb";
import modelUser from "../../models/userModel";
import checkAuth from "../middlewares/verify";
import { hashPassword } from "../src/utils/crypto.utils";
// import { hash } from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  const User = modelUser(await connectDB());

  switch (method) {
    case "POST":
      try {
        const claims = await checkAuth(req, res);

        try {
          const user = await User.create({
            fid: claims.sub,
            email: claims.email,
            name: claims.name || req.body.displayName,
          });
          res.status(201).json({ success: true, data: user });
        } catch (e) {
          if (e.code === 11000) {
            res.status(201).json({
              success: true,
              data: await User.findOne({ fid: claims.sub }),
            });
          } else {
            throw e;
          }
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      const claims = await checkAuth(req, res);

      const filter = { fid: claims.sub };
      const update = {
        masterPassword: hashPassword(req.body.masterPassword),
      };
      try {
        const key = await User.findOneAndUpdate(filter, update, { new: true });
        return res
          .status(201)
          .json({ success: true, message: "Password saved", data: key });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
}
