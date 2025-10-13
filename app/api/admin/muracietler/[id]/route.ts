import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status tələb olunur" },
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

    // Get all applications to find the correct row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "muracietler!A:H",
    });

    const rows = response.data.values || [];
    if (rows.length <= 1) {
      return NextResponse.json(
        { error: "Müraciət tapılmadı" },
        { status: 404 }
      );
    }

    // Find the row with the matching ID (assuming ID is in column A)
    const targetRowIndex = parseInt(id);
    if (targetRowIndex < 1 || targetRowIndex >= rows.length) {
      return NextResponse.json(
        { error: "Müraciət tapılmadı" },
        { status: 404 }
      );
    }

    // Update the status in column G (7th column, 0-indexed)
    const rowNumber = targetRowIndex + 1; // +1 because Google Sheets is 1-indexed
    const range = `muracietler!G${rowNumber}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[status]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Status uğurla yeniləndi",
      data: {
        id: targetRowIndex,
        status,
      },
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: "Status yenilənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}

