import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const PENDING_SHEET_NAME = "Pending";
const PENDING_RANGE = "A:K";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const registrationId = params.id;
    const body = await request.json();
    const { reason } = body;

    // Initialize Google Sheets API
    const sheets = getGoogleSheets();

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
      requestBody: {
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
