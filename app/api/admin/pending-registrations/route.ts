import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const PENDING_SHEET_NAME = "Pending";
const PENDING_RANGE = "A:K";

export async function GET(request: NextRequest) {
  try {
    // Initialize Google Sheets API
    const sheets = getGoogleSheets();

    // Read data from Pending sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `Pending!${PENDING_RANGE}`, // Use exact sheet name
    });

    const rows = response.data.values;

    if (!rows || rows.length <= 1) {
      return NextResponse.json({
        registrations: [],
        total: 0,
      });
    }

    // Get headers (first row)
    const headers = rows[0];

    // Map data rows to registration objects
    const registrations = rows.slice(1).map((row, index) => {
      const registration: any = {
        id: `PENDING-${index + 1}`,
        rowNumber: index + 2, // +2 because we skip header and start from 1
      };

      // Map each column to registration property
      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";

        switch (header) {
          case "Timestamp":
            registration.timestamp = value;
            break;
          case "Ad, Ata adı, Soyad:":
            registration.fullName = value;
            break;
          case "Elektron ünvan:":
            registration.email = value;
            break;
          case "Məzun olduğunuz il:":
            registration.graduationYear = value;
            break;
          case "Əlaqə nömrəsi:":
            registration.phone = value;
            break;
          case "İxtisas":
            registration.specialty = value;
            break;
          case "İxtisasınıza uyğun işləyirsinizmi?":
            registration.workingInField = value;
            break;
          case "Hansı sahə üzrə işləyirsiniz?":
            registration.workField = value;
            break;
          case "İş yeriniz və vəzifəniz":
            registration.workplace = value;
            break;
          case "SDU-nun təklif etdiyi Karyera xidmətlərindən hansı sizə uyğundur?":
            registration.careerServices = value;
            break;
          case "Əlavə qeydiniz":
            registration.additionalNotes = value;
            break;
          default:
            // For any other columns, use the header as key
            registration[header.toLowerCase().replace(/[^a-z0-9]/g, "_")] =
              value;
        }
      });

      return registration;
    });

    return NextResponse.json({
      registrations,
      total: registrations.length,
    });
  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending registrations" },
      { status: 500 }
    );
  }
}
