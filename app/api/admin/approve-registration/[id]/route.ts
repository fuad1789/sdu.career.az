import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const PENDING_SHEET_NAME = "Pending";
const MAIN_SHEET_NAME = "Form Responses 1";
const PENDING_RANGE = "A:K";
const MAIN_RANGE = "A:K";

// Service account credentials
const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_SHEETS_PROJECT_ID!,
  private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID!,
  private_key: (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n"
  ),
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const registrationId = params.id;

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // First, get sheet metadata to find correct sheet IDs
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const sheetsInfo =
      spreadsheet.data.sheets?.map((sheet) => ({
        title: sheet.properties?.title,
        sheetId: sheet.properties?.sheetId,
      })) || [];

    // Find sheet IDs
    const mainSheetId = sheetsInfo.find((s) => s.title === "Main")?.sheetId;
    const pendingSheetId = sheetsInfo.find(
      (s) => s.title === "Pending"
    )?.sheetId;

    if (!mainSheetId || !pendingSheetId) {
      return NextResponse.json(
        { error: "Could not find sheet IDs" },
        { status: 500 }
      );
    }

    // First, get the registration data from Pending sheet
    const pendingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `Pending!${PENDING_RANGE}`, // Use exact sheet name
    });

    const pendingRows = pendingResponse.data.values;

    if (!pendingRows || pendingRows.length <= 1) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Find the registration by ID (row number)
    const rowIndex = parseInt(registrationId.replace("PENDING-", "")) - 1;
    const registrationData = pendingRows[rowIndex + 1]; // +1 to skip header

    if (!registrationData) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Add to Main sheet first
    try {
      const appendResult = await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `Main!${MAIN_RANGE}`, // Use exact sheet name
        valueInputOption: "RAW",
        requestBody: {
          values: [registrationData],
        },
      });

      console.log("Append result:", appendResult.data);
      console.log("Updated range:", appendResult.data.updates?.updatedRange);

      // Let's also check the last few rows of Main sheet to verify
      const lastRowsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `Main!A:K`,
      });

      const lastRows = lastRowsResponse.data.values;
      console.log("Last 3 rows of Main sheet:", lastRows?.slice(-3));

      // Only delete from Pending sheet if Main sheet append was successful
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: pendingSheetId, // Use correct pending sheet ID
                  dimension: "ROWS",
                  startIndex: rowIndex + 1, // +1 to account for header
                  endIndex: rowIndex + 2,
                },
              },
            },
          ],
        },
      });
    } catch (appendError) {
      console.error("Error appending to Main sheet:", appendError);
      return NextResponse.json(
        { error: "Failed to add to Main sheet" },
        { status: 500 }
      );
    }

    console.log(
      `Registration ${registrationId} approved and moved to Main sheet at row 4818`
    );

    return NextResponse.json({
      message: "Registration approved successfully",
      registrationId: registrationId,
    });
  } catch (error) {
    console.error("Error approving registration:", error);
    return NextResponse.json(
      { error: "Failed to approve registration" },
      { status: 500 }
    );
  }
}
