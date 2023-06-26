const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = (phone, message) => {
  console.log("sendSms");
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: +12705174026,
      to: phone,
    })
    .then((message) => console.log(message.sid));
};

module.exports = sendSms;
