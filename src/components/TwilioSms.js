import React, { useState } from 'react';

const TwilioSms = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendSMS = async () => {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: phoneNumber, body: message }),
      });
      const result = await response.json();
      setStatus(result.success ? 'SMS sent successfully!' : 'Failed to send SMS.');
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h3>Send SMS</h3>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendSMS}>Send SMS</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default TwilioSms;   