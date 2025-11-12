import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "xeberler"; // Worksheet name
const RANGE = "A:Z"; // Include all columns

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  priority?: string;
  link_url?: string;
  photo_uri?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are loaded
    if (!process.env.GOOGLE_SHEETS_SHEET_ID) {
      console.error("Missing GOOGLE_SHEETS_SHEET_ID environment variable");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      console.error("Missing GOOGLE_SHEETS_PRIVATE_KEY environment variable");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "Aktiv";
    const limit = parseInt(searchParams.get("limit") || "0");

    // Initialize Google Sheets API
    const sheets = getGoogleSheets();

    // Read data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        news: [],
        total: 0,
      });
    }

    // Get headers (first row)
    const headers = rows[0];

    // Map data rows to news objects
    const allNews = rows
      .slice(1)
      .map((row, index) => {
        const newsItem: any = {
          id: `row_${index + 2}`,
          rowNumber: index + 2,
        };

        // Map each column to news property
        headers.forEach((header, colIndex) => {
          const value = row[colIndex] || "";

          switch (header) {
            case "ID":
              newsItem.id = value || newsItem.id;
              break;
            case "Başlıq":
              newsItem.title = value;
              break;
            case "Təsvir":
              newsItem.description = value;
              break;
            case "Kateqoriya":
              newsItem.category = value;
              break;
            case "Tarix":
              // Convert DD.MM.YYYY to YYYY-MM-DD format
              if (value && value.includes(".")) {
                const [day, month, year] = value.split(".");
                newsItem.date = `${year}-${month.padStart(
                  2,
                  "0"
                )}-${day.padStart(2, "0")}`;
              } else {
                newsItem.date = value;
              }
              break;
            case "Status":
              newsItem.status = value;
              break;
            case "Prioritet":
              newsItem.priority = value;
              break;
            case "link_url":
              newsItem.link_url = value;
              break;
            case "photo_uri":
              newsItem.photo_uri = value;
              break;
            default:
              // For any other columns, use the header as key
              newsItem[header.toLowerCase().replace(/[^a-z0-9]/g, "_")] = value;
          }
        });

        return newsItem;
      })
      .filter((newsItem) => {
        // Filter out entries without a title (empty rows)
        return newsItem.title && newsItem.title.trim() !== "";
      })
      .map((newsItem, index) => {
        // Ensure each news item has a unique ID
        if (!newsItem.id || newsItem.id === `row_${index + 2}`) {
          newsItem.id = `news_${newsItem.rowNumber}_${index}`;
        }
        return newsItem;
      });

    // Filter by status (default: only active news)
    let filteredNews = allNews.filter((newsItem) => newsItem.status === status);

    // Filter by category if specified
    if (category) {
      filteredNews = filteredNews.filter(
        (newsItem) => newsItem.category === category
      );
    }

    // Sort by date (newest first)
    filteredNews.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Apply limit if specified
    if (limit > 0) {
      filteredNews = filteredNews.slice(0, limit);
    }

    // Log for debugging
    console.log(
      `Found ${allNews.length} total news items, ${filteredNews.length} after filtering`
    );

    return NextResponse.json({
      news: filteredNews,
      total: filteredNews.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching news from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
}

