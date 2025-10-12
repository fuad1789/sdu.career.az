import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "elanlar";
const RANGE = "A:G";

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

// Helper function to get sheet ID
async function getSheetId() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const sheets_data = response.data.sheets;
    if (!sheets_data) return null;

    // Find the sheet with the matching name
    const targetSheet = sheets_data.find(
      (sheet) => sheet.properties?.title === SHEET_NAME
    );

    return targetSheet?.properties?.sheetId || 0;
  } catch (error) {
    console.error("Error getting sheet ID:", error);
    return 0;
  }
}

// Helper function to find row number by ID
async function findRowByID(id: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = response.data.values;
    if (!rows) return null;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === id) {
        return i + 1; // +1 because Google Sheets is 1-indexed
      }
    }
    return null;
  } catch (error) {
    console.error("Error finding row by ID:", error);
    return null;
  }
}

// PUT - Update announcement
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Find the row number for this ID
    const rowNumber = await findRowByID(id);
    if (!rowNumber) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get current data to merge with updates
    const currentResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:G${rowNumber}`,
    });

    const currentRow = currentResponse.data.values?.[0] || [];
    const currentData = {
      id: currentRow[0] || id,
      title: currentRow[1] || "",
      description: currentRow[2] || "",
      category: currentRow[3] || "",
      date: currentRow[4] || "",
      status: currentRow[5] || "",
      priority: currentRow[6] || "",
    };

    // Merge with new data
    const updatedData = {
      ...currentData,
      ...body,
    };

    // Convert date to DD.MM.YYYY format if it's being updated
    let formattedDate = updatedData.date;
    if (body.date && body.date.includes("-")) {
      formattedDate = new Date(body.date).toLocaleDateString("az-AZ");
    }

    // Prepare values for update
    const values = [
      [
        updatedData.id,
        updatedData.title,
        updatedData.description,
        updatedData.category,
        formattedDate,
        updatedData.status,
        updatedData.priority,
      ],
    ];

    // Update the row
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:G${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Elan uğurla yeniləndi",
    });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { error: "Failed to update announcement" },
      { status: 500 }
    );
  }
}

// DELETE - Delete announcement
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find the row number for this ID
    const rowNumber = await findRowByID(id);
    if (!rowNumber) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    // Get the correct sheet ID
    const sheetId = await getSheetId();
    if (sheetId === null) {
      return NextResponse.json({ error: "Sheet not found" }, { status: 404 });
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Delete the row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId, // Use the correct sheet ID
                dimension: "ROWS",
                startIndex: rowNumber - 1, // Convert to 0-indexed
                endIndex: rowNumber,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Elan uğurla silindi",
    });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Failed to delete announcement" },
      { status: 500 }
    );
  }
}
