import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "xeberler";
const RANGE = "A:I";

async function getNextId() {
  try {
    const sheets = getGoogleSheets();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return "1";
    }

    const ids = rows.slice(1).map((row) => parseInt(row[0]) || 0);
    const maxId = Math.max(...ids);
    return (maxId + 1).toString();
  } catch (error) {
    console.error("Error getting next ID:", error);
    return Date.now().toString();
  }
}

// POST - Add new news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      date,
      status,
      priority,
      link_url,
      photo_uri,
    } = body;

    if (!title || !description || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const id = await getNextId();
    const formattedDate = new Date(date).toLocaleDateString("az-AZ");

    const sheets = getGoogleSheets();

    const values = [
      [
        id,
        title,
        description,
        category,
        formattedDate,
        status,
        priority,
        link_url || "",
        photo_uri || "",
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Xəbər uğurla əlavə edildi",
      id,
    });
  } catch (error) {
    console.error("Error adding news:", error);
    return NextResponse.json(
      { error: "Failed to add news" },
      { status: 500 }
    );
  }
}

// GET - Get all news (admin: all statuses)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    const sheets = getGoogleSheets();

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

    const headers = rows[0];

    const allNews = rows
      .slice(1)
      .map((row, index) => {
        const newsItem: any = {
          id: row[0] || (index + 1).toString(),
          rowNumber: index + 2,
        };

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
          }
        });

        return newsItem;
      })
      .filter((newsItem) => newsItem.title && newsItem.title.trim() !== "");

    const filteredNews = status
      ? allNews.filter((item) => item.status === status)
      : allNews;

    filteredNews.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({
      news: filteredNews,
      total: filteredNews.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
