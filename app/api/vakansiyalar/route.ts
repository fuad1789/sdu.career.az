import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Force dynamic rendering for this route since it uses search parameters
export const dynamic = "force-dynamic";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "vakansiyalar"; // Worksheet name
const RANGE = "A:M"; // Columns A to M (ID to muraciet_linki)

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
    const status = searchParams.get("status") || "Aktiv";
    const limit = parseInt(searchParams.get("limit") || "0");
    const category = searchParams.get("category") || "";

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
        vacancies: [],
        total: 0,
      });
    }

    // Get headers (first row)
    const headers = rows[0];

    // Map data rows to vacancy objects
    const allVacancies = rows.slice(1).map((row, index) => {
      const vacancy: any = {
        id: index + 1,
        rowNumber: index + 2, // +2 because we skip header and start from 1
      };

      // Map each column to vacancy property
      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";

        switch (header) {
          case "ID":
            vacancy.id = value;
            break;
          case "Basliq":
            vacancy.title = value;
            break;
          case "sirket":
            vacancy.company = value;
            break;
          case "yer":
            vacancy.location = value;
            break;
          case "is_saatti":
            vacancy.type = value;
            break;
          case "maas":
            vacancy.salary = value;
            break;
          case "tecrube":
            vacancy.experience = value;
            break;
          case "tesvir":
            vacancy.description = value;
            break;
          case "telebler":
            // Split requirements by newline or comma
            vacancy.requirements = value
              ? value
                  .split(/\n|,/)
                  .map((req: string) => req.trim())
                  .filter((req: string) => req.length > 0)
              : [];
            break;
          case "ustunlukler":
            // Split benefits by newline or comma
            vacancy.benefits = value
              ? value
                  .split(/\n|,/)
                  .map((benefit: string) => benefit.trim())
                  .filter((benefit: string) => benefit.length > 0)
              : [];
            break;
          case "yerlesdirilme_tarixi":
            // Convert DD.MM.YYYY to YYYY-MM-DD format
            if (value && value.includes(".")) {
              const [day, month, year] = value.split(".");
              vacancy.postedDate = `${year}-${month.padStart(
                2,
                "0"
              )}-${day.padStart(2, "0")}`;
            } else {
              vacancy.postedDate = value;
            }
            break;
          case "son_muraciet_tarixi":
            // Convert DD.MM.YYYY to YYYY-MM-DD format
            if (value && value.includes(".")) {
              const [day, month, year] = value.split(".");
              vacancy.deadline = `${year}-${month.padStart(
                2,
                "0"
              )}-${day.padStart(2, "0")}`;
            } else {
              vacancy.deadline = value;
            }
            break;
          case "muraciet_linki":
            vacancy.applicationLink = value;
            break;
          default:
            // For any other columns, use the header as key
            vacancy[header.toLowerCase().replace(/[^a-z0-9]/g, "_")] = value;
        }
      });

      // Set default status if not provided
      if (!vacancy.status) {
        vacancy.status = "Aktiv";
      }

      return vacancy;
    });

    // Filter by status (default: only active vacancies)
    let filteredVacancies = allVacancies.filter(
      (vacancy) => vacancy.status === status
    );

    // Filter by category if specified (you can add category logic based on your needs)
    if (category) {
      filteredVacancies = filteredVacancies.filter(
        (vacancy) =>
          vacancy.title?.toLowerCase().includes(category.toLowerCase()) ||
          vacancy.description?.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Sort by posted date (newest first)
    filteredVacancies.sort((a, b) => {
      const dateA = new Date(a.postedDate);
      const dateB = new Date(b.postedDate);
      return dateB.getTime() - dateA.getTime();
    });

    // Apply limit if specified
    if (limit > 0) {
      filteredVacancies = filteredVacancies.slice(0, limit);
    }

    return NextResponse.json({
      vacancies: filteredVacancies,
      total: filteredVacancies.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching vacancies from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch vacancies data" },
      { status: 500 }
    );
  }
}
