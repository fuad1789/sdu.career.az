import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import Fuse from "fuse.js";

// Google Sheets configuration
const SHEET_ID = "10ZkghKWs2CjbVuTHcvf22wR9lH7MxSriDITpWEBpE2w";
const SHEET_NAME = "Main"; // Worksheet name
const RANGE = "A:K"; // Columns A to K

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

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

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
