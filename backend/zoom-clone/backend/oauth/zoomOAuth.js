// backend/oauth/zoomOAuth.js

// const express = require('express');
import express from 'express'
// const axios = require('axios');
import axios from 'axios'
// const qs = require('querystring');
import qs from 'querystring'
// const dotenv = require('dotenv');
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

// Create an Express router
const router = express.Router();

// Define the Zoom OAuth endpoint to redirect users for authorization
router.get('/auth/zoom', (req, res) => {
  // Redirect users to the Zoom OAuth authorization URL
  const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.ZOOM_REDIRECT_URI)}`;
  res.redirect(authUrl);
});

// Define the callback endpoint to handle Zoom OAuth callback
router.get('/auth/zoom/callback', async (req, res) => {
  try {
    // Extract authorization code from query parameters
    const code = req.query.code;

    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://zoom.us/oauth/token', qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.ZOOM_REDIRECT_URI,
      client_id: process.env.ZOOM_CLIENT_ID,
      client_secret: process.env.ZOOM_CLIENT_SECRET
    }));

    // Extract access token from token response
    const accessToken = tokenResponse.data.access_token;

    // Respond with the obtained access token
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error('Error obtaining access token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
