BEGIN TRANSACTION;
DROP TABLE IF EXISTS "Categories";
CREATE TABLE "Categories" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"type"	TEXT NOT NULL CHECK("type" IN ('Essential', 'Non_Essential')),
	"proportion"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "Goals";
CREATE TABLE "Goals" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"amount"	INTEGER NOT NULL,
	"currentAmount"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "Income";
CREATE TABLE "Income" (
	"id"	INTEGER,
	"incomeCategoryId"	INTEGER,
	"amount"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	"frequency"	TEXT NOT NULL CHECK("frequency" IN ('Daily', 'Weekly', 'Bi-Weekly', 'Monthly')),
	"type"	TEXT NOT NULL CHECK("type" IN ('Allowance', 'Salary', 'Others')),
	"interval"	INTEGER,
	"subtype"	TEXT CHECK("subtype" IN ('Weekdays', 'Weekends', 'All', 'Custom')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "IncomeCategory";
CREATE TABLE "IncomeCategory" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"type"	TEXT CHECK("type" IN ('Allowance', 'Salary', 'Others')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "Recurrence";
CREATE TABLE "Recurrence" (
	"id"	INTEGER,
	"name"	TEXT,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "Transactions";
CREATE TABLE "Transactions" (
	"id"	INTEGER,
	"category_id"	INTEGER,
	"description"	TEXT NOT NULL,
	"frequency"	TEXT NOT NULL CHECK("frequency" IN ('Daily', 'Weekly', 'Bi-Weekly', 'Monthly')),
	"prioritization"	TEXT NOT NULL CHECK("prioritization" IN ('High', 'Medium', 'Low')),
	"isfixedamount"	TEXT CHECK("isfixedamount" IN ('Yes', 'No')),
	"amount"	INTEGER,
	"type"	TEXT NOT NULL CHECK("type" IN ('Essential', 'Non_Essential')),
	"interval"	INTEGER,
	"recurrence_id"	INTEGER,
	"subtype"	TEXT CHECK("subtype" IN ('Weekdays', 'Weekends', 'All', 'Custom')),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("category_id") REFERENCES "Categories"("id"),
	FOREIGN KEY("recurrence_id") REFERENCES "Recurrence"("id")
);
DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
	"userName"	INTEGER NOT NULL,
	"id"	INTEGER,
	"budget_Amount"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "Categories" VALUES (1,'Housing','Essential',35);
INSERT INTO "Categories" VALUES (2,'Transportation','Essential',10);
INSERT INTO "Categories" VALUES (3,'Groceries','Essential',25);
INSERT INTO "Categories" VALUES (4,'Healthcare','Essential',15);
INSERT INTO "Categories" VALUES (5,'Entertainment','Non_Essential',40);
INSERT INTO "Categories" VALUES (6,'Dining out','Non_Essential',30);
INSERT INTO "Categories" VALUES (7,'Shopping','Non_Essential',10);
INSERT INTO "Categories" VALUES (8,'Travel','Non_Essential',10);
INSERT INTO "Categories" VALUES (9,'Subscription','Non_Essential',10);
INSERT INTO "Categories" VALUES (10,'Utilities','Essential',15);
INSERT INTO "Goals" VALUES (1,'new Phone',1000,0);
INSERT INTO "Goals" VALUES (2,'clothing',100,0);
INSERT INTO "Goals" VALUES (3,'book',700,0);
INSERT INTO "Goals" VALUES (4,'new shoes',100,0);
INSERT INTO "Income" VALUES (1,1,1000,'Allowance','Monthly','Allowance',1,NULL);
INSERT INTO "Income" VALUES (2,2,16000,'Salary','Monthly','Salary',1,NULL);
INSERT INTO "Income" VALUES (3,3,3000,'Others','Monthly','Others',1,NULL);
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
INSERT INTO "Transactions" VALUES (1,1,'rent','Monthly','High','No','','Essential',1,NULL,'Custom');
INSERT INTO "Transactions" VALUES (2,2,'commute','Daily','High','No','','Essential',30,NULL,'Custom');
INSERT INTO "Transactions" VALUES (3,3,'food','Daily','High','No','','Essential',30,NULL,'Custom');
INSERT INTO "Transactions" VALUES (4,4,'medicine','Weekly','High','No','','Essential',7,NULL,'All');
INSERT INTO "Transactions" VALUES (5,10,'utility','Monthly','Medium','No','','Non_Essential',1,NULL,'Custom');
INSERT INTO "Transactions" VALUES (6,5,'entertainment','Bi-Weekly','Low','No','','Non_Essential',1,NULL,'Custom');
INSERT INTO "Transactions" VALUES (13,9,'Subscription','Monthly','High','Yes',450,'Non_Essential',1,NULL,'Custom');
INSERT INTO "User" VALUES ('User',1,10000);
COMMIT;
