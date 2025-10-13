import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adSoyad, email, telefon, movzu, mesaj } = body;

    // Validate required fields
    if (!adSoyad || !email || !telefon || !movzu || !mesaj) {
      return NextResponse.json(
        { error: "Bütün sahələr doldurulmalıdır" },
        { status: 400 }
      );
    }

    // Get Google Sheets instance
    const sheets = getGoogleSheets();

    // Get the spreadsheet ID from environment variable
    const spreadsheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Google Sheets ID not configured");
    }

    // Prepare the data to insert
    const timestamp = new Date().toLocaleString("az-AZ", {
      timeZone: "Asia/Baku",
    });

    const values = [
      [
        adSoyad,
        email,
        telefon,
        movzu,
        mesaj,
        timestamp,
        "Gözləyir", // Status
      ],
    ];

    // Append data to the "muracietler" sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "muracietler!A:G",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Müraciətiniz uğurla göndərildi",
      data: {
        adSoyad,
        email,
        telefon,
        movzu,
        mesaj,
        timestamp,
      },
    });
  } catch (error) {
    console.error("Error saving application:", error);
    return NextResponse.json(
      { error: "Müraciət göndərilərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get Google Sheets instance
    const sheets = getGoogleSheets();

    // Get the spreadsheet ID from environment variable
    const spreadsheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Google Sheets ID not configured");
    }

    // Get all applications from the "muracietler" sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "muracietler!A:G",
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];
    const applications = rows.slice(1).map((row, index) => {
      const application: any = {
        id: index + 1,
      };
      headers.forEach((header, colIndex) => {
        application[header] = row[colIndex] || "";
      });
      return application;
    });

    return NextResponse.json({
      success: true,
      applications,
      total: applications.length,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Müraciətlər yüklənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
