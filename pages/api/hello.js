import checkAuth from "../middlewares/verify";
import { auth } from "../src/lib/firebase";

const api = async (req, res) => {
  try {
    const decodedClaims = await checkAuth(req, res);
    return res.json(decodedClaims);
  } catch (e) {
    console.log(e);
  }
  res.send("shrithan is gay");
};

export default api;
