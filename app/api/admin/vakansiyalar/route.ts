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

// GET - Fetch all vacancies
export async function GET(request: NextRequest) {
  try {
    const sheets = getGoogleSheets();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ vacancies: [], total: 0 });
    }

    const headers = rows[0];
    const vacancies = rows.slice(1).map((row, index) => {
      const vacancy = rowToVacancy(row, headers);
      vacancy.rowNumber = index + 2; // +2 because we skip header and start from 1
      return vacancy;
    });

    return NextResponse.json({
      vacancies,
      total: vacancies.length,
    });
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return NextResponse.json(
      { error: "Failed to fetch vacancies" },
      { status: 500 }
    );
  }
}

// POST - Create new vacancy
export async function POST(request: NextRequest) {
  try {
    const vacancy = await request.json();

    // Generate new ID if not provided
    if (!vacancy.id) {
      vacancy.id = Date.now().toString();
    }

    const sheets = getGoogleSheets();

    // Get current data to find next row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });

    const rows = response.data.values || [];
    const nextRow = rows.length + 1;

    // Convert vacancy to row format
    const newRow = vacancyToRow(vacancy);

    // Append new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${nextRow}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [newRow],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Vakansiya uğurla əlavə edildi",
      vacancy: { ...vacancy, rowNumber: nextRow },
    });
  } catch (error) {
    console.error("Error creating vacancy:", error);
    return NextResponse.json(
      { error: "Failed to create vacancy" },
      { status: 500 }
    );
  }
}

