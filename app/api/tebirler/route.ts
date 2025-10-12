import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "tedbirler"; // Worksheet name for events - make sure this sheet exists in your Google Sheet
const RANGE = "A:I"; // Columns A to I (ID, Başlıq, Tarix, Saat, Katiqorya, Məkan, tesvir, Şirkətlər, qeydiyat-link)

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "upcoming"; // upcoming, past, all
    const limit = parseInt(searchParams.get("limit") || "0");

    // Initialize Google Sheets API
    const sheets = getGoogleSheets();

    // Get sheet info to verify access
    await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    // Read data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        events: [],
        total: 0,
      });
    }

    // Get headers (first row)
    const headers = rows[0];

    // Map data rows to event objects
    const allEvents = rows.slice(1).map((row, index) => {
      const event: any = {
        id: index + 1,
        rowNumber: index + 2, // +2 because we skip header and start from 1
      };

      // Map each column to event property
      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";

        switch (header) {
          case "ID":
            event.id = value;
            break;
          case "Başlıq":
            event.title = value;
            break;
          case "Tarix":
            // Convert date format if needed
            event.date = value;
            break;
          case "Saat":
            // Check if this is actually a date (in case of data misalignment)
            if (value && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
              // This looks like a date, use it as date
              event.date = value;
            } else {
              event.time = value;
            }
            break;
          case "Katiqorya":
            event.category = value;
            break;
          case "Məkan":
            event.location = value;
            break;
          case "tesvir":
            event.description = value;
            break;
          case "Şirkətlər":
            // Split companies by comma and clean up
            if (value && value.trim() !== "") {
              // Try comma first, then space as fallback
              const separator = value.includes(",") ? "," : " ";
              event.companies = value
                .split(separator)
                .map((company: string) => company.trim())
                .filter((company: string) => company !== "");
            } else {
              event.companies = [];
            }
            break;
          case "qeydiyat-link":
            event.registrationLink = value;
            break;
          default:
            // For any other columns, use the header as key
            event[header.toLowerCase().replace(/[^a-z0-9]/g, "_")] = value;
        }
      });

      // Determine event status based on date
      if (event.date && event.date.trim() !== "") {
        try {
          // Parse date properly to avoid timezone issues
          const [year, month, day] = event.date.split("-").map(Number);
          const eventDate = new Date(year, month - 1, day); // month is 0-indexed
          eventDate.setHours(0, 0, 0, 0);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // Check if date is valid
          if (!isNaN(eventDate.getTime())) {
            if (eventDate >= today) {
              event.status = "upcoming";
            } else {
              event.status = "past";
            }
          } else {
            event.status = "upcoming"; // Default if date is invalid
          }
        } catch (error) {
          event.status = "upcoming"; // Default if date parsing fails
        }
      } else {
        event.status = "upcoming"; // Default to upcoming if no date
      }

      return event;
    });

    // Filter by status
    let filteredEvents = allEvents;
    if (status !== "all") {
      filteredEvents = allEvents.filter((event) => event.status === status);
    }

    // Filter by category if specified
    if (category) {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === category
      );
    }

    // Sort by date (upcoming events: earliest first, past events: latest first)
    filteredEvents.sort((a, b) => {
      if (!a.date || !b.date) return 0;

      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (status === "upcoming") {
        return dateA.getTime() - dateB.getTime(); // Earliest first
      } else {
        return dateB.getTime() - dateA.getTime(); // Latest first
      }
    });

    // Apply limit if specified
    if (limit > 0) {
      filteredEvents = filteredEvents.slice(0, limit);
    }

    return NextResponse.json({
      events: filteredEvents,
      total: filteredEvents.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching events from Google Sheets:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to fetch events data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
