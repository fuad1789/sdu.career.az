import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = "10ZkghKWs2CjbVuTHcvf22wR9lH7MxSriDITpWEBpE2w";
const PENDING_SHEET_NAME = "Pending"; // Pending sheet name
const PENDING_RANGE = "A:K"; // Columns A to K

// Service account credentials
const credentials = {
  type: "service_account",
  project_id: "fuad-app-398909",
  private_key_id: "e6c2ef1d7a6c38c599a4fd4b1a083cf05b2b7873",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC09qZzWpN6D+KE\n6YBrZjd+RSrocxrD9XnuwENO3WgVqd41/U9gyDYvutINn3jkWaSkeNyh8JH5oKEj\naqrUjd37Un94LPoAbnEfGSffhurVSo/1s9bSPh4MQtRNCySTL0a+XwLNpxOJis6i\niA55/t4EIWPeq/QMCeG9/RPxeIpPYKjNPSspSceRtbBnFsqZNwS+95GAqWhvXLBo\nAs8WJvt4YyrgcG7F/7dPyaD4qAKFBBhHTtlYaOcAq3ZYY8/5thhNxEQkCLTrRV7C\ntvyJHpSlqRI/iNYgJFF6wKmeaYVBGEXxZEFxlzwkGP/OdCapDjOapvm2l9zEChGJ\nh/gJtxKfAgMBAAECggEAEQPH7ryrdSSdNcYGrxJzUUoLmMOJ1rbz+gDV00p6CN9p\n50Wj+wOYJLC6I1HFOiM7mcNLa2aFMyVpQT08RrP4FTNSjOgdsYCw3i2tVBUJa3iR\nRJbeMfJpPNnjwEK186jUS/3+83ssGRiWCS4lvk66bUT+cOdWEPO05/otr9yXlJLn\nkRfztKClWtxqARTgw9WlYv0pObK3g5yhyMtDOMqeIUFfOhPqKfH7Ie/MDq3SvbXt\n61YYNEByB71PWbJEVDvoNlfntz5sJBCfx8PtIgZIR6AcrOjMG3t46srfAI6L5yWm\nzBSBfFfaiDZEjMNlupKYvF8Crp2E0D3+vF4IV2bCEQKBgQDa7y8+51yNo+6kA23z\n16tEr31Xza7OOyWseWNeP+orI8lRfYVOA6EUMrDdlXRnq4wDD36kVV4FzNC1Z08Y\nnxEJROfz3nTcj8ghoKeih09iPTYcDKf//bRI77ukgYU+CbxNUkDAQoTK4KTzcu2X\n+Nf8GTDU/i/aAu8r5AngWnQMRQKBgQDTmcZEJH+MX96cJ+GYffoK+y5FtiOD7BY4\nTXfOZNOVbM0DNBdnpAktC9vGhm/JO6dLFz3SXqnm7ZZ92Ksbn27y21KMTE1TzwkV\n5f+G9fOpJbYrQDHOj80pGnELnh2CDn9eqszcIc4bLfuejYxFJ656BUCsQWnHhWm1\ncHMDGhHbkwKBgHKxjSG6GO2G7PT1avush2fTO6ns8d/Ocp0Zdqogd6+j7sqHJHfL\nRO6M48Uhj7rjztSnoGO86SXGt6vg9Dnk0wr1E0LZzoThuimLvWZS1o6TnK4zHyvn\noDP5i2bSB5iJhyFGru9JqcGS0DdNhRTxY00JcWCTzUO798oZi+cB2/u1AoGAbFLW\nit/cY/JYNby84qHrNV/tCkb523kqztvpr0Eyh9ZRBYjPSoFRKTxe4DzGUVA2jlxx\ni5ZmiA+s8PPQdK2j0LOyiJwvIe5lCk7aBy8186uYnH+af9JiBt7AbGAfXwso7T+m\n7DJqHsPlgf+YhXaQ/Wpe90/tZPTJbtcIKdhYt/0CgYBdO+KvM6H22YOIYBvMmqYV\npWxFSVFfq/vkMT0035W6VLgsYt+u+C2X37nl/M42hm+N/azskWCUxrp3UhlPZnTn\niwX//ILnD8MEkOgxpbeWP2AzswPY8r6b8i2oEqutrrDgv4JPRvjYjc+nSqqddFNY\n3zbGl5DxdbQwPgs2vAXqWq==\n-----END PRIVATE KEY-----\n",
  client_email: "sdu-career-az@fuad-app-398909.iam.gserviceaccount.com",
  client_id: "114506861498146604610",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/sdu-career-az%40fuad-app-398909.iam.gserviceaccount.com",
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
