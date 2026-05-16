import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheets } from "@/lib/google-sheets-auth";

const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID!;
const SHEET_NAME = "xeberler";

async function getSheetId() {
  try {
    const sheets = getGoogleSheets();

    const response = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const sheets_data = response.data.sheets;
    if (!sheets_data) return null;

    const targetSheet = sheets_data.find(
      (sheet) => sheet.properties?.title === SHEET_NAME
    );

    return targetSheet?.properties?.sheetId || 0;
  } catch (error) {
    console.error("Error getting sheet ID:", error);
    return 0;
  }
}

async function findRowByID(id: string) {
  try {
    const sheets = getGoogleSheets();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = response.data.values;
    if (!rows) return null;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === id) {
        return i + 1;
      }
    }
    return null;
  } catch (error) {
    console.error("Error finding row by ID:", error);
    return null;
  }
}

// PUT - Update news
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const rowNumber = await findRowByID(id);
    if (!rowNumber) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const sheets = getGoogleSheets();

    const currentResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:I${rowNumber}`,
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
      link_url: currentRow[7] || "",
      photo_uri: currentRow[8] || "",
    };

    const updatedData = {
      ...currentData,
      ...body,
    };

    let formattedDate = updatedData.date;
    if (body.date && body.date.includes("-")) {
      formattedDate = new Date(body.date).toLocaleDateString("az-AZ");
    }

    const values = [
      [
        updatedData.id,
        updatedData.title,
        updatedData.description,
        updatedData.category,
        formattedDate,
        updatedData.status,
        updatedData.priority,
        updatedData.link_url,
        updatedData.photo_uri,
      ],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:I${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Xəbər uğurla yeniləndi",
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

// DELETE - Delete news
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const rowNumber = await findRowByID(id);
    if (!rowNumber) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const sheetId = await getSheetId();
    if (sheetId === null) {
      return NextResponse.json({ error: "Sheet not found" }, { status: 404 });
    }

    const sheets = getGoogleSheets();

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: rowNumber - 1,
                endIndex: rowNumber,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Xəbər uğurla silindi",
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
