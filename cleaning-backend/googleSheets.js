require('dotenv').config();
const { google } = require('googleapis');
const credentials = require('./credentials.json'); // Path to your Google API credentials file

async function appendToSheet(bookingData) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Make sure the environment variable is being referenced correctly
    const spreadsheetId = process.env.SPREADSHEET_ID; // Correctly reference spreadsheetId here
    if (!spreadsheetId) {
      throw new Error("spreadsheetId is not defined in the environment variables.");
    }

    const range = 'Sheet1!A1'; // Change this to the correct range of your sheet
    const valueInputOption = 'RAW';

    const request = {
      spreadsheetId,
      range,
      valueInputOption,
      resource: {
        values: [bookingData],
      },
    };

    const response = await sheets.spreadsheets.values.append(request);
    console.log('Data appended successfully to Google Sheets');
    return response;
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error.message); // Log the error message
    throw new Error('Failed to append data to Google Sheets');
  }
}

module.exports = appendToSheet;
