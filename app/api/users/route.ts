import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "Main"; // Worksheet name
const RANGE = "A:K"; // Columns A to K

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    // Initialize Google Sheets API
    const sheets = getGoogleSheets();

    // Read data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `Main!${RANGE}`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        users: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasMore: false,
      });
    }

    // Get headers (first row)
    const headers = rows[0];
    const totalUsers = rows.length - 1; // Exclude header row

    // Map data rows to user objects
    const allUsers = rows.slice(1).map((row, index) => {
      const user: any = {
        id: index + 1,
        rowNumber: index + 2, // +2 because we skip header and start from 1
      };

      // Map each column to user property
      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";

        switch (header) {
          case "Timestamp":
            user.timestamp = value;
            break;
          case "Ad, Ata adı, Soyad:":
            user.fullName = value;
            break;
          case "Elektron ünvan:":
            user.email = value;
            break;
          case "Məzun olduğunuz il:":
            user.graduationYear = value;
            break;
          case "İxtisas":
            user.specialty = value;
            break;
          case "İxtisasınıza uyğun işləyirsinizmi?":
            user.workingInField = value;
            break;
          case "Hansı sahə üzrə işləyirsiniz?":
            user.workField = value;
            break;
          case "İş yeriniz və vəzifəniz":
            user.workplace = value;
            break;
          case "SDU-nun təklif etdiyi Karyera xidmətlərindən hansı sizə uyğundur?":
            user.careerServices = value;
            break;
          case "Əlavə qeydiniz":
            user.additionalNotes = value;
            break;
          default:
            // For any other columns, use the header as key
            user[header.toLowerCase().replace(/[^a-z0-9]/g, "_")] = value;
        }
      });

      return user;
    });

    // Apply search filter if search term provided
    let filteredUsers = allUsers;
    if (search.trim()) {
      // Configure Fuse.js for powerful fuzzy search with Azerbaijani support
      const fuseOptions = {
        keys: [
          {
            name: "fullName",
            weight: 0.7, // Highest priority for name
          },
          {
            name: "email",
            weight: 0.2,
          },
          {
            name: "workField",
            weight: 0.1,
          },
        ],
        threshold: 0.4, // Slightly more fuzzy for better results
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 1, // Allow single character matches
        ignoreLocation: true, // Search anywhere in the string
        findAllMatches: true,
        useExtendedSearch: true, // Enable advanced search patterns
        shouldSort: true, // Sort results by relevance
        getFn: (obj: any, path: string | string[]) => {
          // Custom function to handle Azerbaijani characters
          const value = Fuse.config.getFn(obj, path);
          if (typeof value === "string") {
            // Normalize Azerbaijani characters for better matching
            return value
              .toLowerCase()
              .replace(/ə/g, "e")
              .replace(/ü/g, "u")
              .replace(/ö/g, "o")
              .replace(/ı/g, "i")
              .replace(/ş/g, "s")
              .replace(/ğ/g, "g")
              .replace(/ç/g, "c");
          }
          return value;
        },
      };

      // Create Fuse instance
      const fuse = new Fuse(allUsers, fuseOptions);

      // Normalize search term for Azerbaijani characters
      const normalizedSearch = search
        .trim()
        .toLowerCase()
        .replace(/ə/g, "e")
        .replace(/ü/g, "u")
        .replace(/ö/g, "o")
        .replace(/ı/g, "i")
        .replace(/ş/g, "s")
        .replace(/ğ/g, "g")
        .replace(/ç/g, "c");

      // Perform search
      const searchResults = fuse.search(normalizedSearch);

      // Extract the items from search results
      filteredUsers = searchResults.map((result) => result.item);

      console.log(
        `Fuse.js search for "${search.trim()}" found ${
          filteredUsers.length
        } results`
      );

      // Log first few results for debugging
      if (searchResults.length > 0) {
        console.log("Top results:");
        searchResults.slice(0, 3).forEach((result, index) => {
          console.log(
            `${index + 1}. ${result.item.fullName} (score: ${result.score})`
          );
        });
      }
    }

    // Apply pagination to all results (both search and normal browsing)
    const paginatedUsers = filteredUsers.slice(offset, offset + limit);
    const totalPages = Math.ceil(filteredUsers.length / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      users: paginatedUsers,
      total: search.trim() ? filteredUsers.length : totalUsers,
      page,
      totalPages,
      hasMore,
      limit,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching users from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch users data" },
      { status: 500 }
    );
  }
}
