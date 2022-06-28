const admin = require("firebase-admin");
const fcm_admin = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

// const registrationToken =
//   "cfedau_OQX-5DUv4t5w5lY:APA91bGxisUAPpumvfgI-0gXbBs8TJ2KAvwH-SHA6-s95ud58yItANaNmeg-nNi3Dk0LAXtvvg7FPwSVJNwRhaCO88k50lGHbeSs8pGipDOqXakbzw69Bbz2zmWDmx6EUVHwSco8sBjb";

const chatPush = ({
  user_id,
  fcm_token,
  title,
  body,
  avatar_path,
  category,
  created_at,
  target_url,
}) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcm_token,
    data: {
      title,
      body,
      pushData: JSON.stringify({
        user_id,
        fcm_token,
        title,
        body,
        avatar_path,
        category,
        created_at,
        target_url,
      }),
    },
  };
  fcm_admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

module.exports = {
  chatPush,
};

// Send a message to the device corresponding to the provided
// registration token.
