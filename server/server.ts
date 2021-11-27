const functions = require("firebase-functions");
const { default: next } = require("next");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const isDev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: ".next",
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.createUserDocument = functions.auth.user().onCreate(user => {
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

exports.nextApp = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => {
    return nextjsHandle(req, res);
  });
});
