import React, {useEffect} from "react";
const ZoomMtg = window.ZoomMtg; // Import ZoomMtg
window.onload = function () {
  // Initialize ZoomMtg
  if (window.ZoomMtg) {
    console.log('HI');
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.6.0/lib", "/av");

  // Optional: Preload Wasm module if needed
  ZoomMtg.preLoadWasm();

  // Prepare the Zoom Web SDK
  ZoomMtg.prepareWebSDK();

  // Now you can use ZoomMtg for further operations
  // For example, you can call join or init methods when needed
  } else{
    console.error("ZoomMtg is not defined",window.ZoomMtg);
  }
};


function ZoomMSDK() {
// Get Zoom MSDK KEY, Signature endpoint, and leave URL environment variables
const {
  REACT_APP_ZOOM_MSDK_KEY = "",
  REACT_APP_MSDK_SIGNATURE_ENDPOINT = "",
  LEAVE_URL = "http://localhost:3000/",
 } = process.env;

 // Get the meeting number and password from the URL parameters
 const queryParams = new URLSearchParams(window.location.search);
 const mn = queryParams.get("mn");
 const pw = queryParams.get("pw");

// Assign meeting role based on user type
const role = "1"; // 1 for host, 0 for attendee


  const getSignature = (e) => {

    if (e) e.preventDefault();


    const SIGNATURE_OPTIONS = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        meetingNumber: mn,
        role:  parseInt(role, 10),
      }),
    };

    fetch(REACT_APP_MSDK_SIGNATURE_ENDPOINT, SIGNATURE_OPTIONS)
      .then((data) => data.json())
      .then(({ signature }) => !!signature && startMeeting(signature));
  };


const startMeeting = (signature) => {
  document.getElementById("zmmtg-root").style.display = "block";

  ZoomMtg.init({
      leaveUrl: LEAVE_URL,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature,
          meetingNumber: mn,
          sdkKey: REACT_APP_ZOOM_MSDK_KEY,
          userName: "Your-UserName",
          passWord: pw,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


useEffect(() => {
  const mn = queryParams.get("mn");
  const pw = queryParams.get("pw");
  console.log(mn, pw)


  if (mn && pw) getSignature();

 }, []);


  return (
    <div>zoomMSDK</div>
  )
}

export default ZoomMSDK
