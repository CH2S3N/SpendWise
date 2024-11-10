BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Categories" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"type"	TEXT NOT NULL CHECK("type" IN ('Essential', 'Non_Essential')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Goals" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"amount"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Transactions" (
	"id"	INTEGER,
	"category_id"	INTEGER,
	"description"	TEXT,
	"frequency"	TEXT NOT NULL CHECK("frequency" IN ('Daily', 'Weekly', 'Bi-Weekly', 'Monthly')),
	"prioritization"	TEXT NOT NULL CHECK("prioritization" IN ('High', 'Medium', 'Low')),
	"isfixedamount"	TEXT NOT NULL CHECK("isfixedamount" IN ('Yes', 'No')),
	"amount"	INTEGER,
	"type"	TEXT NOT NULL CHECK("type" IN ('Essential', 'Non_Essential')),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("category_id") REFERENCES "Categories"("id")
);
CREATE TABLE IF NOT EXISTS "User" (
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
INSERT INTO "Transactions" VALUES (1,1,'rent','Monthly','High','Yes',1000,'Essential');
INSERT INTO "Transactions" VALUES (2,2,'commute','Daily','High','Yes',40,'Essential');
INSERT INTO "Transactions" VALUES (3,3,'food','Daily','High','Yes',100,'Essential');
INSERT INTO "Transactions" VALUES (4,4,'medicine','Monthly','High','Yes',500,'Essential');
INSERT INTO "Transactions" VALUES (5,5,'hobby','Weekly','Medium','Yes',700,'Non_Essential');
INSERT INTO "Transactions" VALUES (6,6,'Eating out','Bi-Weekly','Low','Yes',400,'Non_Essential');
INSERT INTO "Transactions" VALUES (7,7,'SMShopping','Monthly','Medium','Yes',1000,'Non_Essential');
INSERT INTO "Transactions" VALUES (9,9,'netflix','Monthly','High','Yes',500,'Non_Essential');
INSERT INTO "Transactions" VALUES (10,8,'RoadTrip','Monthly','High','Yes',1500,'Non_Essential');
COMMIT;
