
import admin from "../src/lib/firebase"

async function checkAuth(req,res) { 

try {
    console.log(req.headers);
    const idToken = req.headers.authorization.split('Bearer ')[1];
    console.log(idToken)
    return admin.auth().verifyIdToken(idToken)

} catch(e) { 
    res.status(401).send('Still Unauthorized bro') 
}



}
export default checkAuth;