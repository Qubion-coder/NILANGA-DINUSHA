var SPREADSHEET_ID = '1Ns7ltsvd8ppP2CxtN4DYkhFZsudxHQVm8YSqeYn50-4';

var SHEETS = {
  rsvp: {
    name: 'RSVP',
    headers: ['Submitted At', 'Name', 'Guests', 'Dietary Notes', 'Source'],
    widths: [170, 220, 80, 280, 120],
  },
  wish: {
    name: 'Wishes',
    headers: ['Submitted At', 'Name', 'Message', 'Source'],
    widths: [170, 220, 480, 120],
  },
};

// Run this once from the Apps Script editor to create both sheets with headers.
// It is also safe to skip: the sheets are created on the first submission.
function setup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  getOrCreateSheet(ss, SHEETS.rsvp);
  getOrCreateSheet(ss, SHEETS.wish);
}

function getOrCreateSheet(ss, config) {
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }

  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(1, 1, 1, config.headers.length)
      .setValues([config.headers])
      .setFontWeight('bold')
      .setFontColor('#ffffff')
      .setBackground('#6d1424');
    sheet.setFrozenRows(1);
    sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    for (var i = 0; i < config.widths.length; i++) {
      sheet.setColumnWidth(i + 1, config.widths[i]);
    }
  }

  return sheet;
}

// Stops guest input such as "=IMPORTXML(...)" from being run as a formula.
function safeText(value) {
  var text = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Open the web app URL in a browser to confirm the deployment is live.
function doGet() {
  return jsonResponse({ success: true, message: 'Wedding sheet endpoint is running.' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    // Serialise writes so two guests submitting together cannot clash.
    lock.waitLock(20000);

    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(body);

    var formType = String(payload.formType || '').toLowerCase();
    var config = SHEETS[formType];
    if (!config) {
      throw new Error('Invalid formType. Expected rsvp or wish.');
    }

    var submittedAt = payload.submittedAt ? new Date(payload.submittedAt) : new Date();
    if (isNaN(submittedAt.getTime())) {
      submittedAt = new Date();
    }

    var name = safeText(payload.name);
    if (!name) {
      throw new Error('Name is required.');
    }

    var source = safeText(payload.source) || 'website';
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = getOrCreateSheet(ss, config);

    if (formType === 'rsvp') {
      sheet.appendRow([
        submittedAt,
        name,
        safeText(payload.guests),
        safeText(payload.dietary),
        source,
      ]);
    } else {
      sheet.appendRow([submittedAt, name, safeText(payload.message), source]);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
