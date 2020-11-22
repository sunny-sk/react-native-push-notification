//importing packages
const express = require("express");
const app = express();
const FCM = require("fcm-node");

//add server key
const serverKey =
  "AAAAx8Ieekc:APA91bEq9vLJXIoQYFBNJKSRQRpiFpuavN-J8k4zCyxDu7_qVy9xdenUUO2rjw2iF1Gr59hsDAzZ6o-DHNahufC7Vd_q72g8c0u317EWXvqOTgbQyY8xkb4KY-XhzaE-1DiXRsxrbB7y";

let fcm = new FCM(serverKey);

//route for send push notification
app.get("/send-push", (req, res, next) => {
  const { sendToken } = req.query;
  if (!sendToken) {
    res
      .status(400)
      .send({ success: false, message: "please attach push token" });
    return;
  }

  //creating payLoad
  const payload = {
    to: sendToken,
    notification: {
      title: "this is title",
      body: "This is message",
      sound: true,
      vibrate: true,
    },
  };

  fcm.send(payload, (err, response) => {
    //check for error
    if (err) {
      console.log(err);
      throw err;
    }
    // sending success resposne
    res.status(200).send({
      success: true,
      message: "push notification send successfully",
      response,
    });
  });
});

//server created
app.listen("3000", () => {
  console.log("server started at 3000");
});
