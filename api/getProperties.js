// /api/getProperties.js
import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    // Parse service account JSON from Vercel environment
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SHEET_ID; // Set this in Vercel
    const range = "AvailableHomes!A2:M"; // Adjust if your sheet name is different

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    // Map rows to objects
    const properties = rows.map((row) => ({
      id: row[0],
      name: row[1],
      status: row[2],
      neighborhood: row[3],
      beds: Number(row[4]),
      baths: Number(row[5]),
      sqft: row[6],
      price: Number(row[7]),
      unitsLeft: Number(row[8]),
      lat: Number(row[9]),
      lng: Number(row[10]),
      img: row[11],
      url: row[12],
    }));

    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}
