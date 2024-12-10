function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("update_today")
    .addItem("Update Schedule", "updateSchedule")
    .addToUi();
}

function updateSchedule() {
  const sheetTodayName = "Today";
  const sheetTotalName = "Roster";
  const sheetBusScheduleName = "Initial Bus Schedule";
  const sheetDriverDetailsName = "Driver Details Vehicle Wise";

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetToday = ss.getSheetByName(sheetTodayName);
  const sheetBusSchedule = ss.getSheetByName(sheetBusScheduleName);
  const sheetDriverDetails = ss.getSheetByName(sheetDriverDetailsName);
  let sheetTotal = ss.getSheetByName(sheetTotalName);

  const busScheduleData = sheetBusSchedule.getDataRange().getValues();
  const driverDetailsData = sheetDriverDetails.getDataRange().getValues();

  if (!sheetToday) {
    sheetToday = ss.insertSheet(sheetTodayName);
    sheetToday.appendRow([
      "Bus Number",
      "Driver 1",
      "Driver 2",
      "Helper",
      "Service ID",
      "Source",
      "Destination",
      "STATUS",
    ]);
  }

  const totalRows = sheetTotal ? sheetTotal.getLastRow() : 0;
  const lastDate =
    totalRows > 1 ? sheetTotal.getRange(totalRows - 1, 1).getValue() : 0;
  const nextDate = lastDate + 1;
  const dayToLoad = nextDate % 2 === 0 ? 2 : 1;

  const todayData = busScheduleData.filter((row) => row[0] === dayToLoad);
  const driverMap = {};
  for (let i = 1; i < driverDetailsData.length; i++) {
    const row = driverDetailsData[i];
    driverMap[row[0]] = {
      driver1: row[1],
      driver2: row[2],
      helper: row[3],
    };
  }

  const todaySheetData = []; // Maintain order of buses
  const lastTodayData =
    sheetToday.getLastRow() > 1 ? sheetToday.getDataRange().getValues() : [];

  todayData.forEach((row) => {
    let serviceID = row[1];
    let busNumber = row[2];
    let source = row[3];
    let destination = row[4];

    const driverDetails = driverMap[busNumber] || {};
    const driver1 = driverDetails.driver1 || "";
    const driver2 = driverDetails.driver2 || "";
    const helper = driverDetails.helper || "";

    let status = "RUN";

    // Check if the bus was marked as hault on the previous day
    for (let i = 1; i < lastTodayData.length; i++) {
      if (lastTodayData[i][0] === busNumber && lastTodayData[i][7] != "RUN") {
        status = "HAULT";
        serviceID = lastTodayData[i][4];
        source = lastTodayData[i][5];
        destination = lastTodayData[i][6];
        break;
      }
    }

    // Maintain order in todaySheetData
    todaySheetData.push([
      busNumber,
      driver1,
      driver2,
      helper,
      serviceID,
      source,
      destination,
      status,
    ]);
  });

  // Clear and update the "Today" sheet
  sheetToday.clear();
  sheetToday
    .getRange(1, 1, todaySheetData.length + 1, 8)
    .setValues([
      [
        "Bus Number",
        "Driver 1",
        "Driver 2",
        "Helper",
        "Service ID",
        "Source",
        "Destination",
        "STATUS",
      ],
      ...todaySheetData,
    ]);

  // Add a footer row with the current date
  const today = new Date();
  sheetToday.appendRow([`Today's Date: ${today.toLocaleDateString()}`]);

  // Ensure "Date Wise driver details" sheet exists
  if (!sheetTotal) {
    sheetTotal = ss.insertSheet(sheetTotalName);
    sheetTotal.appendRow([
      "Date",
      "Bus Number",
      "Driver 1",
      "Driver 2",
      "Helper",
      "Service ID",
      "Source",
      "Destination",
      "STATUS",
    ]);
  }

  // Append all buses to "Date Wise driver details"
  todaySheetData.forEach((row) => {
    sheetTotal.appendRow([nextDate, ...row]);
  });

  // Add a blank separator row in the "Date Wise driver details"
  sheetTotal.appendRow([" ", " ", " ", " ", " ", " ", " ", " "]);

  Logger.log(
    "Update completed with original order retained in the schedule and added to Date Wise driver details"
  );
}
