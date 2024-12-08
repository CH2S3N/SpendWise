BEGIN TRANSACTION;
DROP TABLE IF EXISTS "Categories";
CREATE TABLE "Categories" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"type"	TEXT NOT NULL CHECK("type" IN ('Essential', 'Non_Essential')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "Goals";
CREATE TABLE "Goals" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"amount"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "Income";
CREATE TABLE "Income" (
	"id"	INTEGER,
	"incomeCategoryId"	INTEGER,
	"amount"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	"frequency"	TEXT NOT NULL CHECK("frequency" IN ('Daily', 'Weekly', 'Bi-Weekly', 'Monthly')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "IncomeCategory";
CREATE TABLE "IncomeCategory" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "Transactions";
CREATE TABLE "Transactions" (
	"id"	INTEGER,
	"category_id"	INTEGER,
	"description"	TEXT NOT NULL,
	"frequency"	TEXT NOT NULL CHECK("frequency" IN ('Daily', 'Weekly', 'Bi-Weekly', 'Monthly')),
	"prioritization"	BLOB NOT NULL CHECK("prioritization" IN ('High', 'Medium', 'Low')),
	"isfixedamount"	TEXT NOT NULL CHECK("isfixedamount" IN ('Yes', 'No')),
	"amount"	INTEGER,
	"type"	TEXT NOT NULL CHECK("type" IN ('Essential', 'Non_Essential')),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("category_id") REFERENCES "Categories"("id")
);
DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
	"userName"	INTEGER NOT NULL,
	"id"	INTEGER,
	"budget_Amount"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "Categories" VALUES (1,'Housing','Essential');
INSERT INTO "Categories" VALUES (2,'Transportation','Essential');
INSERT INTO "Categories" VALUES (3,'Food','Essential');
INSERT INTO "Categories" VALUES (4,'Healthcare','Essential');
INSERT INTO "Categories" VALUES (5,'Entertainment','Non_Essential');
INSERT INTO "Categories" VALUES (6,'Dining out','Non_Essential');
INSERT INTO "Categories" VALUES (7,'Shopping','Non_Essential');
INSERT INTO "Categories" VALUES (8,'Travel','Non_Essential');
INSERT INTO "Categories" VALUES (9,'Subscription','Non_Essential');
INSERT INTO "Goals" VALUES (1,'new Phone',10000);
INSERT INTO "Goals" VALUES (2,'clothing',1200);
INSERT INTO "Goals" VALUES (3,'book',700);
INSERT INTO "Goals" VALUES (4,'new shoes',1000);
INSERT INTO "Income" VALUES (1,1,1000,'my weekly allowance','Weekly');
INSERT INTO "Income" VALUES (2,2,10000,'monthly salary','Monthly');
INSERT INTO "IncomeCategory" VALUES (1,'allowance');
INSERT INTO "IncomeCategory" VALUES (2,'Salary');
INSERT INTO "IncomeCategory" VALUES (3,'others');
INSERT INTO "Transactions" VALUES (1,1,'rent','Monthly','High','Yes',1000,'Essential');
INSERT INTO "Transactions" VALUES (2,2,'commute','Daily','High','Yes',40,'Essential');
INSERT INTO "Transactions" VALUES (3,3,'food','Daily','High','Yes',100,'Essential');
INSERT INTO "Transactions" VALUES (4,4,'medicine','Monthly','High','Yes',500,'Essential');
INSERT INTO "Transactions" VALUES (5,5,'hobby','Weekly','Medium','Yes',700,'Non_Essential');
INSERT INTO "Transactions" VALUES (6,6,'Eating out','Bi-Weekly','Low','Yes',400,'Non_Essential');
INSERT INTO "Transactions" VALUES (7,7,'SMShopping','Monthly','Medium','Yes',1000,'Non_Essential');
INSERT INTO "Transactions" VALUES (9,9,'netflix','Monthly','High','Yes',500,'Non_Essential');
INSERT INTO "Transactions" VALUES (10,8,'RoadTrip','Monthly','High','Yes',1500,'Non_Essential');
INSERT INTO "User" VALUES ('User',1,10000);
COMMIT;
