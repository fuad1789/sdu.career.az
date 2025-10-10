import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = "10ZkghKWs2CjbVuTHcvf22wR9lH7MxSriDITpWEBpE2w";
const SHEET_NAME = "elanlar";
const RANGE = "A:G";

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

// Helper function to get sheet ID
async function getSheetId() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const sheets_data = response.data.sheets;
    if (!sheets_data) return null;

    // Find the sheet with the matching name
    const targetSheet = sheets_data.find(
      (sheet) => sheet.properties?.title === SHEET_NAME
    );

    return targetSheet?.properties?.sheetId || 0;
  } catch (error) {
    console.error("Error getting sheet ID:", error);
    return 0;
  }
}

// Helper function to find row number by ID
async function findRowByID(id: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = response.data.values;
    if (!rows) return null;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === id) {
        return i + 1; // +1 because Google Sheets is 1-indexed
      }
    }
    return null;
  } catch (error) {
    console.error("Error finding row by ID:", error);
    return null;
  }
}

// PUT - Update announcement
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Find the row number for this ID
    const rowNumber = await findRowByID(id);
    if (!rowNumber) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get current data to merge with updates
    const currentResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:G${rowNumber}`,
    });

    const currentRow = currentResponse.data.values?.[0] || [];
    const currentData = {
      id: currentRow[0] || id,
      title: currentRow[1] || "",
      description: currentRow[2] || "",
      category: currentRow[3] || "",
      date: currentRow[4] || "",
      status: currentRow[5] || "",
      priority: currentRow[6] || "",
    };

    // Merge with new data
    const updatedData = {
      ...currentData,
      ...body,
    };

    // Convert date to DD.MM.YYYY format if it's being updated
    let formattedDate = updatedData.date;
    if (body.date && body.date.includes("-")) {
      formattedDate = new Date(body.date).toLocaleDateString("az-AZ");
    }

    // Prepare values for update
    const values = [
      [
        updatedData.id,
        updatedData.title,
        updatedData.description,
        updatedData.category,
        formattedDate,
        updatedData.status,
        updatedData.priority,
      ],
    ];

    // Update the row
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:G${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Elan uğurla yeniləndi",
    });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { error: "Failed to update announcement" },
      { status: 500 }
    );
  }
}

// DELETE - Delete announcement
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find the row number for this ID
    const rowNumber = await findRowByID(id);
    if (!rowNumber) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    // Get the correct sheet ID
    const sheetId = await getSheetId();
    if (sheetId === null) {
      return NextResponse.json({ error: "Sheet not found" }, { status: 404 });
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Delete the row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId, // Use the correct sheet ID
                dimension: "ROWS",
                startIndex: rowNumber - 1, // Convert to 0-indexed
                endIndex: rowNumber,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Elan uğurla silindi",
    });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Failed to delete announcement" },
      { status: 500 }
    );
  }
}
