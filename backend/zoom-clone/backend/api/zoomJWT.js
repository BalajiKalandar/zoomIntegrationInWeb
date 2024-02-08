// zoomJWT.js

// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

function generateZoomJWT(apiKey, apiSecret) {
  // Set the JWT payload
  const payload = {
    iss: apiKey, // API key
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiration time (1 hour from now)
  };

  // Generate the JWT token using the payload and API secret
  const token = jwt.sign(payload, apiSecret);

  return token;
}

export  default  generateZoomJWT;
