# TWILIGHT_INTERN_PROJ_1

**Problem Statement:** Bus Scheduling, Hault Management, and Driver Payment Tracking Using Google Sheets
**Objective:** Create an automated system in Google Sheets using Google Apps Script to manage bus schedules, driver assignments, hault statuses, and driver payment tracking across multiple days in a seamless and efficient manner.

**System Overview:** The solution involves four interconnected Google Sheets:

Bus Schedule - Contains predefined schedules for buses traveling between two cities over two days.
Today - Dynamic sheet updated daily to reflect the current day's bus schedule and statuses.
Date Wise Driver Details - A historical log recording daily bus schedules and statuses.
Driver Payments - Tracks payment statuses for drivers based on daily operations.
Key Features:

1. Daily Bus Schedule Management
Bus Schedule Setup:

Each bus travels from City 1 to City 2 on Day 1 and from City 2 to City 1 on Day 2, maintaining the same service ID.
Example schedule:

1	231	KA 01 AQ 7951	Hyderabad	Benguluru
1	232	(AP 39 VD 6284) XXXXXX	Bengaluru	Hyderabad
1	1046	TG 13 T 1984	Hyderabad	Benguluru
1	1047	TG 13 T 1985	Bengaluru	Hyderabad
1	709	 KA 01 AQ 7950	Hyderabad	Tirupathi
1	708	AP 39 VD 6283	Tirupathi	Hyderabad
1	980	TG 13 T 2615	Tirupathi	Hyderabad
1	981	TG 13 T 2616	Hyderabad	Tirupathi
1	474	AP 39 UX 7897	Hyderabad	Goa
1	475	AP 39 UX 7896	Goa	Hyderabad
1	484	KA 01 AQ 7948	Hyderabad	Benguluru
1	485	KA 01 AQ 7949	Bengaluru	Hyderabad
1	889	TG 13 T 2614	Nagpur 	Hyderabad
1	890	TG 13 T 2617	Hyderabad	Nagpur
1	974	TG 13 T 1986	Hyderabad	Pune
1	976	TG 13 T 1983	Pune	Hyderabad
2	231	(AP 39 VD 6284) XXXXXX	Hyderabad	Benguluru
2	232	KA 01 AQ 7951	Bengaluru	Hyderabad
2	1046	TG 13 T 1985	Hyderabad	Benguluru
2	1047	TG 13 T 1984	Bengaluru	Hyderabad
2	709	AP 39 VD 6283	Hyderabad	Tirupathi
2	708	 KA 01 AQ 7950	Tirupathi	Hyderabad
2	980	TG 13 T 2616	Tirupathi	Hyderabad
2	981	TG 13 T 2615	Hyderabad	Tirupathi
2	474	AP 39 UX 7896	Hyderabad	Goa
2	475	AP 39 UX 7897	Goa	Hyderabad
2	484	KA 01 AQ 7949	Hyderabad	Benguluru
2	485	KA 01 AQ 7948	Bengaluru	Hyderabad
2	889	TG 13 T 2617	Nagpur 	Hyderabad
2	890	TG 13 T 2614	Hyderabad	Nagpur
2	974	TG 13 T 1983	Hyderabad	Pune
2	976	TG 13 T 1986	Pune	Hyderabad


Today Sheet Setup:

Dynamically populated with details for the current day’s operations.
Includes Bus Number, Drivers, Helper, Service ID, Source, Destination, and Status.
Example:

Bus Number	Driver 1	Driver 2	Helper	Service ID	Source	Destination	STATUS
KA 01 AQ 7951	NAVEED	KHALEEL 2	SURESH	231	Hyderabad	Benguluru	RUN
(AP 39 VD 6284) XXXXXX				232	Bengaluru	Hyderabad	RUN
TG 13 T 1984	KHALEEL 1	MASOOD	KASI	1046	Hyderabad	Benguluru	RUN
TG 13 T 1985	ANJI	VENKATAIAH	RAVI KIRAN	1047	Bengaluru	Hyderabad	RUN
 KA 01 AQ 7950	PRAKASHAN	STEPHEN	VENKATESH	709	Hyderabad	Tirupathi	RUN
AP 39 VD 6283	CHANDRA	KUMAR	TARUN KUMAR	708	Tirupathi	Hyderabad	RUN
TG 13 T 2615	KISHORE	BALAJI	(TG 13 T 2615) H1	980	Tirupathi	Hyderabad	RUN
TG 13 T 2616	BABU	JAI RAJU	MOIN	981	Hyderabad	Tirupathi	RUN
AP 39 UX 7897	NAVEED PASHA 	ISMAIL	ERUKALI VENKATESH	474	Hyderabad	Goa	RUN
AP 39 UX 7896	NAGESH	MANIK	TARUN NAIK	475	Goa	Hyderabad	RUN
KA 01 AQ 7948	HANUMANTH	MUNNER	NAGESH	484	Hyderabad	Benguluru	RUN
KA 01 AQ 7949	GANESH	MAHESH	NARASIMHA	485	Bengaluru	Hyderabad	RUN
TG 13 T 2614	LINGA SWAMI 	 IFRAN 	LANKESH	889	Nagpur 	Hyderabad	RUN
TG 13 T 2617	SHAKEEL	AFEEZ	SAIDA RAO	890	Hyderabad	Nagpur	RUN
TG 13 T 1986	MOHAMMED RIYAZ	ANAVEERAYYA MATAPATI (Swami)	RAJU	974	Hyderabad	Pune	RUN
TG 13 T 1983	MOHD GHOUSE UDDIN	MD SIRAJUDDIN	RAJESH	976	Pune	Hyderabad	RUN
Today's Date: 12/10/2024							
Daily Transitions:

At the end of the day, the Today sheet data is logged into Date Wise Driver Details, and the next day’s schedule is updated with:
Interchanged Service ID, Source, and Destination based on conjugate buses.
2. Hault Management
Initial Setup:

On Day 1, all buses are marked as RUN in the Today sheet.

Hault Detection:

If a bus is marked as hault on Day 1, its status is retained for subsequent days until resolved. For instance:

Date	Bus Number	Driver 1	Driver 2	Helper	Service ID	Source	Destination	STATUS
1	KA 01 AQ 7951	NAVEED	KHALEEL 2	SURESH	231	Hyderabad	Benguluru	RUN
1	(AP 39 VD 6284) XXXXXX				232	Bengaluru	Hyderabad	RUN
1	TG 13 T 1984	KHALEEL 1	MASOOD	KASI	1046	Hyderabad	Benguluru	RUN
1	TG 13 T 1985	ANJI	VENKATAIAH	RAVI KIRAN	1047	Bengaluru	Hyderabad	RUN
1	 KA 01 AQ 7950	PRAKASHAN	STEPHEN	VENKATESH	709	Hyderabad	Tirupathi	RUN
1	AP 39 VD 6283	CHANDRA	KUMAR	TARUN KUMAR	708	Tirupathi	Hyderabad	RUN
1	TG 13 T 2615	KISHORE	BALAJI	(TG 13 T 2615) H1	980	Tirupathi	Hyderabad	RUN
1	TG 13 T 2616	BABU	JAI RAJU	MOIN	981	Hyderabad	Tirupathi	RUN
1	AP 39 UX 7897	NAVEED PASHA 	ISMAIL	ERUKALI VENKATESH	474	Hyderabad	Goa	RUN
1	AP 39 UX 7896	NAGESH	MANIK	TARUN NAIK	475	Goa	Hyderabad	RUN
1	KA 01 AQ 7948	HANUMANTH	MUNNER	NAGESH	484	Hyderabad	Benguluru	RUN
1	KA 01 AQ 7949	GANESH	MAHESH	NARASIMHA	485	Bengaluru	Hyderabad	RUN
1	TG 13 T 2614	LINGA SWAMI 	 IFRAN 	LANKESH	889	Nagpur 	Hyderabad	RUN
1	TG 13 T 2617	SHAKEEL	AFEEZ	SAIDA RAO	890	Hyderabad	Nagpur	RUN
1	TG 13 T 1986	MOHAMMED RIYAZ	ANAVEERAYYA MATAPATI (Swami)	RAJU	974	Hyderabad	Pune	RUN
1	TG 13 T 1983	MOHD GHOUSE UDDIN	MD SIRAJUDDIN	RAJESH	976	Pune	Hyderabad	RUNHault buses are not interchanged or logged into Date Wise Driver Details but remain in the Today sheet for tracking.
3. Driver Payment Tracking
Driver Payments Sheet:
A matrix where:
Rows represent driver names.
Columns represent dates.
Cells contain the format: Service ID | Payment Status (e.g., 231 | Pending).
Example:
Driver/Helper	1
 IFRAN 	889 | Pending
(TG 13 T 2615) H1	980 | Pending
AFEEZ	890 | Pending
ANAVEERAYYA MATAPATI (Swami)	974 | Pending
ANJI	1047 | Pending
BABU	981 | Pending
BALAJI	980 | Pending
CHANDRA	708 | Pending
ERUKALI VENKATESH	474 | Pending
GANESH	485 | Pending
HANUMANTH	484 | Pending
ISMAIL	474 | Pending
JAI RAJU	981 | Pending
KASI	1046 | Pending
KHALEEL 1	1046 | Pending
KHALEEL 2	231 | Pending
KISHORE	980 | Pending
KUMAR	708 | Pending
LANKESH	889 | Pending
LINGA SWAMI 	889 | Pending
MAHESH	485 | Pending
MANIK	475 | Pending
MASOOD	1046 | Pending
MD SIRAJUDDIN	976 | Pending
MOHAMMED RIYAZ	974 | Pending
MOHD GHOUSE UDDIN	976 | Pending
MOIN	981 | Pending
MUNNER	484 | Pending
NAGESH	484 | Pending
NARASIMHA	485 | Pending
NAVEED	231 | Pending
NAVEED PASHA 	474 | Pending
PRAKASHAN	709 | Pending
RAJESH	976 | Pending
RAJU	974 | Pending
RAVI KIRAN	1047 | Pending
SAIDA RAO	890 | Pending
SHAKEEL	890 | Pending
STEPHEN	709 | Pending
SURESH	231 | Pending
TARUN KUMAR	708 | Pending
TARUN NAIK	475 | Pending
VENKATAIAH	1047 | Pending
VENKATESH	709 | Pending

Workflow Summary:

Day 1: Initial Setup

Populate the Today sheet with Day 1 schedules, marking all buses as RUN.
Log the data into Date Wise Driver Details.
Daily Transitions:

At the end of each day:
Dump the Today sheet data into Date Wise Driver Details (excluding hault buses).
Interchange Service ID, Source, and Destination for the next day in the Today sheet.
Hault Management:

Retain hault buses in the Today sheet until resolved.
These buses are excluded from the Date Wise Driver Details sheet until their status changes back to RUN.
Driver Payment Tracking:

Update the Driver Payments sheet with daily entries of Service ID | Payment Status.
Goals:

Efficiently manage daily bus schedules and maintain historical records.
Seamlessly handle hault buses without disrupting schedules.
Provide a transparent and automated tracking system for driver payments.
