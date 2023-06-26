const accountSid = "ACa5bb62a133fb76403ae9591938b950b6";
const authToken = "54f83c45d9279299325dc574f18ce075";

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
