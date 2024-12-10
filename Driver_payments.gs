function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Driver Payments") // The menu will be named "Driver Payments"
    .addItem(
      "Populate Driver Payments",
      "populateDriverPaymentsSheetFromDetails"
    ) // Menu item and corresponding function
    .addToUi();
}

function populateDriverPaymentsSheetFromDetails() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheetName = "Roster"; // Source sheet with driver details
  const targetSheetName = "Driver Payments"; // Target sheet to populate

  // Get the source sheet and its data
  const sourceSheet = ss.getSheetByName(sourceSheetName);
  if (!sourceSheet) {
    SpreadsheetApp.getUi().alert(`Sheet "${sourceSheetName}" not found!`);
    return;
  }
  const sourceData = sourceSheet.getDataRange().getValues();

  // Get unique driver/helper names (Y-axis) and dates (X-axis)
  const driverSet = new Set(); // To store unique drivers/helpers
  const dateSet = new Set(); // To store unique dates
  const rowCount = sourceData.length;

  for (let i = 1; i < rowCount; i++) {
    // Start from 1 to skip the header
    const row = sourceData[i];

    // Skip empty rows (if the first column or essential columns are empty)
    if (!row[0] || !row[2] || !row[3] || !row[4] || !row[5]) {
      continue;
    }

    const date = row[0]; // Date column
    const driver1 = row[2]; // Driver 1
    const driver2 = row[3]; // Driver 2
    const helper = row[4]; // Helper

    // Add valid data to sets
    if (date != " ") dateSet.add(date);
    if (driver1 != " ") driverSet.add(driver1);
    if (driver2 != " ") driverSet.add(driver2);
    if (helper != " ") driverSet.add(helper);
  }

  // Convert sets to arrays and sort them
  const drivers = Array.from(driverSet).sort(); // Y-axis sorted drivers/helpers
  const dates = Array.from(dateSet).sort((a, b) => new Date(a) - new Date(b)); // X-axis sorted dates
  //Logger.log(drivers);

  // Create or clear the target sheet
  let targetSheet = ss.getSheetByName(targetSheetName);
  if (!targetSheet) {
    targetSheet = ss.insertSheet(targetSheetName);
  } else {
    targetSheet.clear();
  }

  // Prepare the header row with dates
  const headerRow = ["Driver/Helper", ...dates];
  targetSheet.appendRow(headerRow);

  // Prepare a map for quick lookup of Service IDs and statuses
  let serviceMap = {};
  for (let i = 1; i < rowCount; i++) {
    // Start from 1 to skip the header
    const row = sourceData[i];

    /* // Skip empty rows (if the first column or essential columns are empty)
    if (row[0]!=' ' || row[5] != ' ') {
      continue;
    }*/
    //Logger.log(row[0]);
    if (row[0] != " ") {
      //Logger.log(row[0]);
      const date = row[0];
      const serviceID = row[5];
      const driver1 = row[2];
      const driver2 = row[3];
      const helper = row[4];
      const status = row[8];

      if (!serviceMap[date]) serviceMap[date] = {};
      if (status == "RUN") {
        serviceMap[date][driver1] = `${serviceID} | Pending`;
        serviceMap[date][driver2] = `${serviceID} | Pending`;
        serviceMap[date][helper] = `${serviceID} | Pending`;
      } else {
        serviceMap[date][driver1] = `HAULT`;
        serviceMap[date][driver2] = `HAULT`;
        serviceMap[date][helper] = `HAULT`;
      }
      // Logger.log(serviceMap[0])
    }
  }

  // Populate the table with drivers/helpers and corresponding service IDs
  const rows = [];
  for (const driver of drivers) {
    const row = [driver];
    for (const date of dates) {
      // Ensure that the serviceMap is properly accessed
      row.push(serviceMap[date]?.[driver] || "N/A");
    }
    rows.push(row);
  }

  // Write the data to the sheet
  if (rows.length > 0) {
    //Logger.log(rows[0][0]);
    targetSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
  Logger.log("populated driver payments");
  // Delete the 2nd row completely
  //targetSheet.deleteRow(2);

  // Delete the 3rd column completely
  // targetSheet.deleteColumn(3);
  //SpreadsheetApp.getUi().alert(`Driver Payments sheet populated successfully!`);
}
