// zoomAPI.js

const thirdPartyAPICall = async () => {
    try {
      // Make API Call Here 
      return "Third Party API Call";
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  
 export { thirdPartyAPICall }; // Exporting the function correctly
  