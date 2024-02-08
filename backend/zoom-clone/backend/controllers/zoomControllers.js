import { thirdPartyAPICall } from "../api/zoomAPI.js";
import asyncHandler from "express-async-handler";

const ThirdPartyAPICall = asyncHandler(async (req, res) => {
  try {
    const thirdPartyAPI = await thirdPartyAPICall();

    if (thirdPartyAPI === undefined) {
      res.status(400).json({ error: "No API Call found" });
    } else {
      res.status(201).json({ thirdPartyAPI });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { ThirdPartyAPICall };
