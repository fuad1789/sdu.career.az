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

    // Add aggressive cache busting and force refresh
    const cacheBuster = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    console.log(
      `[${new Date().toISOString()}] Fetching pending registrations with cache buster: ${cacheBuster}, randomId: ${randomId}`
    );

    // Try multiple approaches to get fresh data
    let response;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(
          `[${new Date().toISOString()}] Attempt ${attempts}/${maxAttempts} to fetch data`
        );

        // Use different approaches for each attempt
        const dynamicRange =
          attempts === 1
            ? `Pending!A1:K1000`
            : attempts === 2
            ? `Pending!A:K`
            : `Pending!A1:Z1000`; // Even wider range on last attempt

        console.log(
          `[${new Date().toISOString()}] Attempt ${attempts} - Fetching from range: ${dynamicRange}`
        );

        response = await sheets.spreadsheets.values.get(
          {
            spreadsheetId: SHEET_ID,
            range: dynamicRange,
            majorDimension: "ROWS",
            valueRenderOption: "UNFORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING",
          },
          {
            // Add request-level cache busting
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
              "If-None-Match": `"${cacheBuster}-${randomId}"`,
              "If-Modified-Since": new Date(0).toUTCString(),
            },
          }
        );

        // If we got data, break out of retry loop
        if (response.data.values && response.data.values.length > 0) {
          console.log(
            `[${new Date().toISOString()}] Successfully fetched data on attempt ${attempts}`
          );
          break;
        }
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] Attempt ${attempts} failed:`,
          error
        );
        if (attempts === maxAttempts) {
          throw error;
        }
        // Wait a bit before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
      }
    }

    const rows = response.data.values;
    console.log(
      `[${new Date().toISOString()}] Fetched ${
        rows ? rows.length : 0
      } rows from Google Sheets`
    );

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

      console.log(
        `[${new Date().toISOString()}] Processing row ${index + 2}:`,
        row
      );

      // Map each column to registration property
      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";

        switch (header) {
          case "Timestamp":
            registration.timestamp = value;
            break;
          case "Ad, Ata adı, Soyad":
            registration.fullName = value;
            break;
          case "Elektron ünvan":
            registration.email = value;
            break;
          case "Məzun olduğunuz il":
            registration.graduationYear = value;
            break;
          case "Əlaqə nömrəsi":
            registration.phone = value;
            break;
          case "İxtisas":
            registration.specialty = value;
            break;
          case "İxtisasınıza uyğun işləyirsinizmi":
            registration.workingInField = value;
            break;
          case "Hansı sahə üzrə işləyirsiniz":
            registration.workField = value;
            break;
          case "İş yeriniz və vəzifəniz":
            registration.workplace = value;
            break;
          case "SDU-nun təklif etdiyi Karyera xidmətlərindən hansı sizə uyğundur":
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

    console.log(
      `[${new Date().toISOString()}] Returning ${
        registrations.length
      } registrations to client`
    );

    // Add additional cache busting headers to response
    const response = NextResponse.json({
      registrations,
      total: registrations.length,
      cacheBuster: cacheBuster,
      randomId: randomId,
      fetchedAt: new Date().toISOString(),
      attempts: attempts,
    });

    // Set aggressive cache control headers
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Last-Modified", new Date().toUTCString());
    response.headers.set("ETag", `"${cacheBuster}-${randomId}"`);

    return response;
  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending registrations" },
      { status: 500 }
    );
  }
}
