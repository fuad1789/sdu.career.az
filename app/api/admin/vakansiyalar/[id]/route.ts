import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "vakansiyalar";
const RANGE = "A:M"; // Columns A to M

// Helper function to convert vacancy object to sheet row
function vacancyToRow(vacancy: any): string[] {
  return [
    vacancy.id || "",
    vacancy.title || "",
    vacancy.company || "",
    vacancy.location || "",
    vacancy.type || "",
    vacancy.salary || "",
    vacancy.experience || "",
    vacancy.description || "",
    vacancy.requirements ? vacancy.requirements.join(", ") : "",
    vacancy.benefits ? vacancy.benefits.join(", ") : "",
    vacancy.postedDate || "",
    vacancy.deadline || "",
    vacancy.applicationLink || "",
  ];
}

// Helper function to convert sheet row to vacancy object
function rowToVacancy(row: string[], headers: string[]): any {
  const vacancy: any = {};

  headers.forEach((header, index) => {
    const value = row[index] || "";

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
        vacancy.requirements = value
          ? value
              .split(",")
              .map((req: string) => req.trim())
              .filter((req: string) => req.length > 0)
          : [];
        break;
      case "ustunlukler":
        vacancy.benefits = value
          ? value
              .split(",")
              .map((benefit: string) => benefit.trim())
              .filter((benefit: string) => benefit.length > 0)
          : [];
        break;
      case "yerlesdirilme_tarixi":
        vacancy.postedDate = value;
        break;
      case "son_muraciet_tarixi":
        vacancy.deadline = value;
        break;
      case "muraciet_linki":
        vacancy.applicationLink = value;
        break;
    }
  });

  // Set default status
  vacancy.status = vacancy.status || "Aktiv";

  return vacancy;
}

// PUT - Update vacancy
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vacancyId = params.id;
    const updatedVacancy = await request.json();

    const sheets = getGoogleSheets();

    // Get current data to find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Vakansiya tapılmadı" },
        { status: 404 }
      );
    }

    const headers = rows[0];
    let targetRowIndex = -1;

    // Find the row with matching ID
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] === vacancyId) {
        // ID is in column A
        targetRowIndex = i;
        break;
      }
    }

    if (targetRowIndex === -1) {
      return NextResponse.json(
        { error: "Vakansiya tapılmadı" },
        { status: 404 }
      );
    }

    // Ensure the ID is preserved
    updatedVacancy.id = vacancyId;

    // Convert vacancy to row format
    const updatedRow = vacancyToRow(updatedVacancy);

    // Update the specific row
    const rowNumber = targetRowIndex + 1; // +1 because sheets are 1-indexed
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:M${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [updatedRow],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Vakansiya uğurla yeniləndi",
      vacancy: { ...updatedVacancy, rowNumber },
    });
  } catch (error) {
    console.error("Error updating vacancy:", error);
    return NextResponse.json(
      { error: "Failed to update vacancy" },
      { status: 500 }
    );
  }
}

// DELETE - Delete vacancy
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vacancyId = params.id;

    const sheets = getGoogleSheets();

    // Get current data to find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Vakansiya tapılmadı" },
        { status: 404 }
      );
    }

    let targetRowIndex = -1;

    // Find the row with matching ID
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] === vacancyId) {
        // ID is in column A
        targetRowIndex = i;
        break;
      }
    }

    if (targetRowIndex === -1) {
      return NextResponse.json(
        { error: "Vakansiya tapılmadı" },
        { status: 404 }
      );
    }

    // Delete the row by clearing it (Google Sheets doesn't have a direct delete API)
    const rowNumber = targetRowIndex + 1; // +1 because sheets are 1-indexed
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:M${rowNumber}`,
    });

    return NextResponse.json({
      success: true,
      message: "Vakansiya uğurla silindi",
    });
  } catch (error) {
    console.error("Error deleting vacancy:", error);
    return NextResponse.json(
      { error: "Failed to delete vacancy" },
      { status: 500 }
    );
  }
}


