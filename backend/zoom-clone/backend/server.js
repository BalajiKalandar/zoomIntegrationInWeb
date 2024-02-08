import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import zoomRoutes from './routes/zoomRoutes.js'
// const generateZoomJWT = require('./api/zoomJWT');
import generateZoomJWT from './api/zoomJWT.js';
// const zoomOAuthRouter = require('./oauth/zoomOAuth');
import zoomOAuthRouter from './oauth/zoomOAuth.js'


const app = express();

dotenv.config();
const port = process.env.PORT || 3020;

app.use(cors());
app.use(express.json());

// Registering the router middleware
app.use("/api/zoom", zoomRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  res.send('Welcome to Express');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
