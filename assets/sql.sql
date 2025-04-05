BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Categories" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"initialProp"	INTEGER,
	"proportion"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "DataStates" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"value"	TEXT NOT NULL CHECK("value" IN ('True', 'Falsel')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Goals" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"amount"	INTEGER NOT NULL,
	"currentAmount"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Income" (
	"id"	INTEGER,
	"incomeCategoryId"	INTEGER,
	"amount"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	"frequency"	TEXT NOT NULL CHECK("frequency" IN ('Daily', 'Weekly', 'Bi-Weekly', 'Monthly')),
	"type"	TEXT NOT NULL CHECK("type" IN ('Allowance', 'Salary', 'Others')),
	"interval"	INTEGER,
	"intervalInput"	INTEGER,
	"subtype"	TEXT CHECK("subtype" IN ('Weekdays', 'Weekends', 'All', 'Custom')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "IncomeCategory" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"type"	TEXT CHECK("type" IN ('Allowance', 'Salary', 'Others')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Recurrence" (
	"id"	INTEGER,
	"name"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "Transactions" (
	"id"	INTEGER,
	"category_id"	INTEGER,
	"description"	TEXT NOT NULL,
	"frequency"	TEXT NOT NULL CHECK("frequency" IN ('Daily', 'Weekly', 'Bi-Weekly', 'Monthly')),
	"prioritization"	TEXT NOT NULL CHECK("prioritization" IN ('High', 'Medium', 'Low')),
	"isfixedamount"	TEXT CHECK("isfixedamount" IN ('Yes', 'No')),
	"amount"	INTEGER,
	"type"	TEXT CHECK("type" IN ('Essential', 'Non_Essential')),
	"interval"	INTEGER,
	"intervalInput"	INTEGER,
	"recurrence_id"	INTEGER,
	"subtype"	TEXT CHECK("subtype" IN ('Weekdays', 'Weekends', 'All', 'Custom')),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("category_id") REFERENCES "Categories"("id"),
	FOREIGN KEY("recurrence_id") REFERENCES "Recurrence"("id")
);
CREATE TABLE IF NOT EXISTS "User" (
	"id"	INTEGER,
	"userName"	INTEGER,
	"hasData"	INTEGER CHECK("hasData" IN ('True', 'False')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "Categories" VALUES (1,'Housing & Utilities','Rent, Mortgage, Electricity, Water, Internet, Gas)',30,30);
INSERT INTO "Categories" VALUES (2,'Transportation','Gas, Jeepney/Bus/Train Fare, Parking, Motorbike Maintenance',10,10);
INSERT INTO "Categories" VALUES (3,'Grocery','Food, Household Essentials',15,15);
INSERT INTO "Categories" VALUES (4,'Healthcare','Medical Checkups, Medicines, Insurance',10,10);
INSERT INTO "Categories" VALUES (5,'Childcare & Education','Tuition, School Supplies, Allowance, Daycare',5,5);
INSERT INTO "Categories" VALUES (6,'Debt Payments','Loan Repayments, Credit Card Payments',5,5);
INSERT INTO "Categories" VALUES (7,'Dining Out','Fast Food, Street Food, Cafés, Occasional Restaurant Meals',5,5);
INSERT INTO "Categories" VALUES (8,'Entertainment','Netflix, Mobile Load/Data, Gaming, Movies, Karaoke',5,5);
INSERT INTO "Categories" VALUES (9,'Shopping','Clothes, Shoes, Accessories, Basic Home Items',5,5);
INSERT INTO "Categories" VALUES (10,'Travel','Weekend Getaways, Flights, Hotels',5,5);
INSERT INTO "Categories" VALUES (11,'Hobbies','Gym, Cycling, Sports, Arts & Crafts, Music',5,5);
INSERT INTO "Categories" VALUES (12,'Personal Care','Haircuts, Skincare, Grooming, Salon, Gym Membership',5,5);
INSERT INTO "Categories" VALUES (13,'Others','Miscellaneous, Emergency Funds, Gifts, Unplanned Expenses',5,5);
INSERT INTO "DataStates" VALUES (1,'SplitStrat','True');
INSERT INTO "IncomeCategory" VALUES (1,'allowance','Allowance');
INSERT INTO "IncomeCategory" VALUES (2,'Salary','Salary');
INSERT INTO "IncomeCategory" VALUES (3,'others','Others');
INSERT INTO "Recurrence" VALUES (1,'Sun');
INSERT INTO "Recurrence" VALUES (2,'Mon');
INSERT INTO "Recurrence" VALUES (3,'Tue');
INSERT INTO "Recurrence" VALUES (4,'Wed');
INSERT INTO "Recurrence" VALUES (5,'Thu');
INSERT INTO "Recurrence" VALUES (6,'Fri');
INSERT INTO "Recurrence" VALUES (7,'Sat');
INSERT INTO "User" VALUES (1,'','False');
COMMIT;
