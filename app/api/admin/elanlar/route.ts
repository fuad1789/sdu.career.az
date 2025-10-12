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

// Helper function to get next available ID
async function getNextId() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return "1";
    }

    // Get all IDs and find the maximum
    const ids = rows.slice(1).map((row) => parseInt(row[0]) || 0);
    const maxId = Math.max(...ids);
    return (maxId + 1).toString();
  } catch (error) {
    console.error("Error getting next ID:", error);
    return Date.now().toString();
  }
}

// POST - Add new announcement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, date, status, priority } = body;

    // Validate required fields
    if (!title || !description || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get next available ID
    const id = await getNextId();

    // Convert date to DD.MM.YYYY format
    const formattedDate = new Date(date).toLocaleDateString("az-AZ");

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Add new row to the sheet
    const values = [
      [id, title, description, category, formattedDate, status, priority],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Elan uğurla əlavə edildi",
      id,
    });
  } catch (error) {
    console.error("Error adding announcement:", error);
    return NextResponse.json(
      { error: "Failed to add announcement" },
      { status: 500 }
    );
  }
}

// GET - Get all announcements
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "Aktiv";

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Read data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        announcements: [],
        total: 0,
      });
    }

    // Get headers (first row)
    const headers = rows[0];

    // Map data rows to announcement objects
    const allAnnouncements = rows.slice(1).map((row, index) => {
      const announcement: any = {
        id: row[0] || (index + 1).toString(),
        rowNumber: index + 2,
      };

      // Map each column to announcement property
      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";

        switch (header) {
          case "ID":
            announcement.id = value;
            break;
          case "Başlıq":
            announcement.title = value;
            break;
          case "Təsvir":
            announcement.description = value;
            break;
          case "Kateqoriya":
            announcement.category = value;
            break;
          case "Tarix":
            // Convert DD.MM.YYYY to YYYY-MM-DD format
            if (value && value.includes(".")) {
              const [day, month, year] = value.split(".");
              announcement.date = `${year}-${month.padStart(
                2,
                "0"
              )}-${day.padStart(2, "0")}`;
            } else {
              announcement.date = value;
            }
            break;
          case "Status":
            announcement.status = value;
            break;
          case "Prioritet":
            announcement.priority = value;
            break;
        }
      });

      return announcement;
    });

    // Filter by status
    const filteredAnnouncements = allAnnouncements.filter(
      (announcement) => announcement.status === status
    );

    // Sort by date (newest first)
    filteredAnnouncements.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({
      announcements: filteredAnnouncements,
      total: filteredAnnouncements.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}
