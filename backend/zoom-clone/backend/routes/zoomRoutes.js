import express from 'express';
const router = express.Router();

import { ThirdPartyAPICall } from "../controllers/zoomControllers.js";

router.route('/').post(); // Ensure you define the appropriate route handlers here

// Test routes with Postman
router.route("/thirdparty").get(ThirdPartyAPICall);

export default router;
