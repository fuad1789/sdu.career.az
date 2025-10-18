import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Force dynamic rendering for this route since it uses search parameters
export const dynamic = "force-dynamic";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "kurslar"; // Worksheet name
const RANGE = "A:H"; // Columns A to H (Basliq, tesvir, muellim, qiymet, movzular, seviyye, muddet, qeydiyyat_linki)

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
    const level = searchParams.get("level") || "";
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
