//importing packages
const express = require("express");
const app = express();
const FCM = require("fcm-node");

//add server key
const serverKey = "add server key here from firebase";

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
      body: "this is body",
    },
  };

  fcm.send(payload, (err, response) => {
    //check for error
    if (err) throw err;
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
