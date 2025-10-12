import { google } from "googleapis";

// Google Sheets authentication helper
export function getGoogleSheetsAuth() {
  // Validate required environment variables
  const requiredEnvVars = [
    "GOOGLE_SHEETS_PROJECT_ID",
    "GOOGLE_SHEETS_PRIVATE_KEY_ID",
    "GOOGLE_SHEETS_PRIVATE_KEY",
    "GOOGLE_SHEETS_CLIENT_EMAIL",
    "GOOGLE_SHEETS_CLIENT_ID",
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  // Parse and format private key properly
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY!;

  // Remove any existing quotes and normalize line breaks
  privateKey = privateKey.replace(/^["']|["']$/g, ""); // Remove surrounding quotes
  privateKey = privateKey.replace(/\\n/g, "\n"); // Convert \n to actual newlines

  // Ensure the private key has proper formatting
  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
  }

  // Service account credentials
  const credentials = {
    type: "service_account" as const,
    project_id: process.env.GOOGLE_SHEETS_PROJECT_ID!,
    private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID!,
    private_key: privateKey,
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
    client_id: process.env.GOOGLE_SHEETS_CLIENT_ID!,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL!
    )}`,
    universe_domain: "googleapis.com",
  };

  // Create Google Auth instance with proper configuration
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });

  return auth;
}

// Helper function to get Google Sheets instance
export function getGoogleSheets() {
  const auth = getGoogleSheetsAuth();
  return google.sheets({ version: "v4", auth });
}

// Helper function to get Google Drive instance
export function getGoogleDrive() {
  const auth = getGoogleSheetsAuth();
  return google.drive({ version: "v3", auth });
}
