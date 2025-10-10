import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = "10ZkghKWs2CjbVuTHcvf22wR9lH7MxSriDITpWEBpE2w";
const PENDING_SHEET_NAME = "Pending";
const PENDING_RANGE = "A:K";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const registrationId = params.id;
    const body = await request.json();
    const { reason } = body;

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get sheet metadata to find correct sheet ID
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const sheetsInfo =
      spreadsheet.data.sheets?.map((sheet) => ({
        title: sheet.properties?.title,
        sheetId: sheet.properties?.sheetId,
      })) || [];

    const pendingSheetId = sheetsInfo.find(
      (s) => s.title === "Pending"
    )?.sheetId;

    if (!pendingSheetId) {
      return NextResponse.json(
        { error: "Could not find Pending sheet ID" },
        { status: 500 }
      );
    }

    // Find the registration by ID (row number)
    const rowIndex = parseInt(registrationId.replace("PENDING-", "")) - 1;

    // Delete from Pending sheet
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: pendingSheetId, // Use correct pending sheet ID
                dimension: "ROWS",
                startIndex: rowIndex + 1, // +1 to account for header
                endIndex: rowIndex + 2,
              },
            },
          },
        ],
      },
    });

    console.log(
      `Registration ${registrationId} rejected with reason: ${reason}`
    );

    return NextResponse.json({
      message: "Registration rejected successfully",
      registrationId: registrationId,
      reason: reason,
    });
  } catch (error) {
    console.error("Error rejecting registration:", error);
    return NextResponse.json(
      { error: "Failed to reject registration" },
      { status: 500 }
    );
  }
}
