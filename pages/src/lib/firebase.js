import * as admin from 'firebase-admin'

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
            projectId: process.env.FIREBASE_PROJECT_ID,
            serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
})
} catch (error) {
   
    if (error instanceof Error && !/already exists/u.test(error.message)) {
        console.log(error)
        throw new Error('Firebase admin initialization error', error)
    }
}

export default admin
export const auth = admin.auth()