import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "kurslar"; // Worksheet name
const RANGE = "A:H"; // Columns A to H (Basliq, tesvir, muellim, qiymet, movzular, seviyye, muddet, qeydiyyat_linki)

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
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level") || "";
    const limit = parseInt(searchParams.get("limit") || "0");

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
        courses: [],
        total: 0,
      });
    }

    // Get headers (first row)
    const headers = rows[0];

    // Map data rows to course objects
    const allCourses = rows.slice(1).map((row, index) => {
      const course: any = {
        id: index + 1,
        rowNumber: index + 2, // +2 because we skip header and start from 1
      };

      // Map each column to course property
      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";

        switch (header) {
          case "Basliq":
            course.title = value;
            break;
          case "tesvir":
            course.description = value;
            break;
          case "muellim":
            course.instructor = value;
            break;
          case "qiymet":
            course.price = value;
            break;
          case "movzular":
            // Split topics by comma and trim whitespace
            course.topics = value
              ? value.split(",").map((topic: string) => topic.trim())
              : [];
            break;
          case "seviyye":
            course.level = value;
            break;
          case "muddet":
            course.duration = value;
            break;
          case "qeydiyyat_linki":
            course.registrationLink = value;
            break;
          default:
            // For any other columns, use the header as key
            course[header.toLowerCase().replace(/[^a-z0-9]/g, "_")] = value;
        }
      });

      return course;
    });

    // Filter by level if specified
    let filteredCourses = allCourses;
    if (level) {
      filteredCourses = allCourses.filter((course) => course.level === level);
    }

    // Apply limit if specified
    if (limit > 0) {
      filteredCourses = filteredCourses.slice(0, limit);
    }

    return NextResponse.json({
      courses: filteredCourses,
      total: filteredCourses.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching courses from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses data" },
      { status: 500 }
    );
  }
}
