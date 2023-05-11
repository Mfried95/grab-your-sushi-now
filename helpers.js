const accountSid = 'ACa5bb62a133fb76403ae9591938b950b6';
const authToken = '547e39c6f1baac63cdbac6487415e0de';

const sendSms = (phone, message) => {
  console.log('sendSms');
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: message,
       from: +12705174026,
       to: phone
     })
    .then(message => console.log(message.sid));
}

module.exports = sendSms;
