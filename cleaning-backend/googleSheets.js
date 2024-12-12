const { google } = require('googleapis');
const credentials = require('./credentials.json');  // Add your credentials file here

const sheets = google.sheets('v4');

async function appendToSheet(data) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const request = {
    spreadsheetId: sheetId,
    range: 'Sheet1!A1', // Change the range to your specific sheet and range
    valueInputOption: 'RAW',
    resource: {
      values: [data],
    },
    auth: authClient,
  };

  try {
    await sheets.spreadsheets.values.append(request);
    console.log('Data appended successfully');
  } catch (err) {
    console.error('Error appending data:', err);
  }
}

module.exports = appendToSheet;
