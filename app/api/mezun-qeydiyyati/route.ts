import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const PENDING_SHEET_NAME = "Pending"; // Pending sheet name
const PENDING_RANGE = "A:K"; // Columns A to K

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "ad",
      "ataAdi",
      "soyad",
      "elektronUnvan",
      "mezunOlduguIl",
      "elaqeNomresi",
      "ixtisas",
      "ixtisasaUygunIsleyir",
    ];

    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          { error: `${field} sahəsi tələb olunur` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.elektronUnvan)) {
      return NextResponse.json(
        { error: "Düzgün elektron ünvan daxil edin" },
        { status: 400 }
      );
    }

    // Validate graduation year
    const currentYear = new Date().getFullYear();
    const graduationYear = parseInt(body.mezunOlduguIl);
    if (graduationYear < 1990 || graduationYear > currentYear) {
      return NextResponse.json(
        { error: "Məzun olduğunuz il 1990-2024 arasında olmalıdır" },
        { status: 400 }
      );
    }

    // Generate unique ID
    const registrationId = `SDU-${Date.now()}`;
    const currentDate = new Date().toLocaleString("az-AZ");

    // Initialize Google Sheets API
    const sheets = getGoogleSheets();

    // Prepare data for Pending sheet (matching Main sheet structure)
    const pendingRowData = [
      currentDate, // A: Timestamp
      `${body.ad} ${body.ataAdi} ${body.soyad}`, // B: Ad, Ata adı, Soyad
      body.elektronUnvan, // C: Elektron ünvan
      body.mezunOlduguIl, // D: Məzun olduğunuz il
      body.elaqeNomresi, // E: Əlaqə nömrəsi
      body.ixtisas, // F: İxtisas
      body.ixtisasaUygunIsleyir, // G: İxtisasınıza uyğun işləyirsinizmi?
      body.hansiSaheUzreIsleyir || "", // H: Hansı sahə üzrə işləyirsiniz?
      body.isYeriVeVezife || "", // I: İş yeriniz və vəzifəniz
      body.karyeraXidmetleri || "", // J: SDU-nun təklif etdiyi Karyera xidmətlərindən hansı sizə uyğundur?
      body.elaveQeyd || "", // K: Əlavə qeydiniz
    ];

    // Add data to Pending sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `Pending!${PENDING_RANGE}`, // Use exact sheet name
      valueInputOption: "RAW",
      requestBody: {
        values: [pendingRowData],
      },
    });

    console.log("New graduate registration added to Pending sheet:", {
      registrationId,
      ...body,
      registrationDate: currentDate,
    });

    return NextResponse.json(
      {
        message: "Qeydiyyat uğurla göndərildi. Admin tərəfindən baxılacaq.",
        registrationId: registrationId,
        status: "pending",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Server xətası baş verdi" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Məzun qeydiyyatı API endpoint-i" },
    { status: 200 }
  );
}
