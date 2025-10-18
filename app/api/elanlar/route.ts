import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Force dynamic rendering for this route since it uses search parameters
export const dynamic = "force-dynamic";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "elanlar"; // Worksheet name
const RANGE = "A:G"; // Columns A to G

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are loaded
    if (!process.env.GOOGLE_SHEETS_SHEET_ID) {
      console.error("Missing GOOGLE_SHEETS_SHEET_ID environment variable");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      console.error("Missing GOOGLE_SHEETS_PRIVATE_KEY environment variable");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "Aktiv";
    const limit = parseInt(searchParams.get("limit") || "0");

    // Initialize Google Sheets API
    const sheets = getGoogleSheets();

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
        id: index + 1,
        rowNumber: index + 2, // +2 because we skip header and start from 1
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
          default:
            // For any other columns, use the header as key
            announcement[header.toLowerCase().replace(/[^a-z0-9]/g, "_")] =
              value;
        }
      });

      return announcement;
    });

    // Filter by status (default: only active announcements)
    let filteredAnnouncements = allAnnouncements.filter(
      (announcement) => announcement.status === status
    );

    // Filter by category if specified
    if (category) {
      filteredAnnouncements = filteredAnnouncements.filter(
        (announcement) => announcement.category === category
      );
    }

    // Sort by date (newest first)
    filteredAnnouncements.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Apply limit if specified
    if (limit > 0) {
      filteredAnnouncements = filteredAnnouncements.slice(0, limit);
    }

    return NextResponse.json({
      announcements: filteredAnnouncements,
      total: filteredAnnouncements.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching announcements from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements data" },
      { status: 500 }
    );
  }
}
