import admin from "../src/lib/firebase";

async function checkAuth(req, res) {
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    return admin.auth().verifyIdToken(idToken);
  } catch (e) {
    res.status(401).send("Still Unauthorized bro");
  }
}
export default checkAuth;
