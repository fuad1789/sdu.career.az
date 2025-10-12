import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const PENDING_SHEET_NAME = "Pending"; // Pending sheet name
const PENDING_RANGE = "A:K"; // Columns A to K

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
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

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
