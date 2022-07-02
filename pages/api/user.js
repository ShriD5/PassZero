import connectDB from "../middlewares/mongodb";
import modelUser from "../../models/userModel";
import checkAuth from "../middlewares/verify";

export default async function handler(req, res) {
  const { method } = req;
  const User = modelUser(await connectDB());
  const claims = await checkAuth(req, res);

  switch (method) {
    case "POST":
      try {
        try {
          const user = await User.create({
            fid: claims.sub,
            email: claims.email,
            name: claims.name || req.body.displayName,
          });
          res.status(201).json({ success: true, data: user });
        } catch (e) {
          res.status(400).json({ success: false });

          // if (e.code === "E11000") {
          //   res.status(201).json({ success: true, data: user });
          // } else {
          //   throw e;
          // }
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      const claims = await checkAuth(req, res);
      const filter = { fid: claims.sub };
      const update = { masterPassword: req.body.masterPassword };
      try {
        const key = await User.findOneAndUpdate(filter, update, { new: true });
        res
          .status(201)
          .json({ success: true, message: "Password saved ", data: key });
      } catch (error) {
        res.status(400).json({ success: false });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
}
