// Replace these with your actual Azure app values
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // e.g., "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // e.g., "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" or "common" for multi-tenant
    redirectUri: window.location.href, // Ensure this matches your Azure App's Redirect URI
  }
};

// Create an instance of PublicClientApplication
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Attach click event to the Sign In button
document.getElementById("signInButton").addEventListener("click", signIn);

async function signIn() {
  const loginRequest = {
    scopes: ["Files.Read"] // Add or adjust scopes as needed
  };

  try {
    // Trigger the login popup
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    
    // Retrieve the access token (if needed for further API calls)
    const accessToken = loginResponse.accessToken;
    console.log("Access token acquired:", accessToken);
    
    // Retrieve account info and update the UI
    const account = msalInstance.getAllAccounts()[0];
    if (account) {
      document.getElementById("userInfo").innerHTML = `
        <p class="text-lg">Signed in as: <strong>${account.username}</strong></p>
      `;
    }
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById("userInfo").innerHTML = `<p class="text-red-500">Login failed. Check the console for details.</p>`;
  }
}
