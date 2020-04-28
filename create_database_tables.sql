CREATE TABLE StudentPortal.dbo.Faculty (
	FAC_ID numeric(18,0) NOT NULL,
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT Faculty_PK PRIMARY KEY (FAC_ID)
) GO;

CREATE TABLE StudentPortal.dbo.Department (
	DEPT_ID numeric(18,0) NOT NULL,
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	FAC_ID numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Department_PK PRIMARY KEY (DEPT_ID)
) GO;

ALTER TABLE StudentPortal.dbo.Department ADD CONSTRAINT Department_FK FOREIGN KEY (FAC_ID) REFERENCES StudentPortal.dbo.Faculty(FAC_ID) GO;

CREATE TABLE StudentPortal.dbo.Series (
	SRS_ID numeric(18,0) NOT NULL,
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[YEAR] numeric(18,0) NOT NULL,
	DEPT_ID numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Series_PK PRIMARY KEY (SRS_ID)
) GO;

ALTER TABLE StudentPortal.dbo.Series ADD CONSTRAINT Series_FK FOREIGN KEY (DEPT_ID) REFERENCES StudentPortal.dbo.Department(DEPT_ID) GO;

CREATE TABLE StudentPortal.dbo.[Group] (
	GRP_ID numeric(18,0) NOT NULL,
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SRS_ID numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Group_PK PRIMARY KEY (GRP_ID)
) GO;

ALTER TABLE StudentPortal.dbo.[Group] ADD CONSTRAINT Group_FK FOREIGN KEY (SRS_ID) REFERENCES StudentPortal.dbo.Series(SRS_ID) GO;

CREATE TABLE StudentPortal.dbo.Course (
	CRS_ID numeric(18,0) NOT NULL,
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SRS_ID numeric(18,0) NOT NULL,
	CRDT_PTS numeric(18,0) NOT NULL,
	TCHR varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SMSTR numeric(18,0) NOT NULL,
	[YEAR] numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Course_PK PRIMARY KEY (CRS_ID)
) GO;

ALTER TABLE StudentPortal.dbo.Course ADD CONSTRAINT Course_FK FOREIGN KEY (SRS_ID) REFERENCES StudentPortal.dbo.Series(SRS_ID) GO;

CREATE TABLE StudentPortal.dbo.Student (
	STD_ID numeric(18,0) NOT NULL,
	FRSTNAM varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	LSTNAM varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	USRNAM varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	FTHR_INIT varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CNP varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	PHN_NBR varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	EMAIL varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	GRP_ID numeric(18,0) NOT NULL,
	[YEAR] numeric(18,0) NOT NULL,
	CTR_ID numeric(18,0) NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Student_PK PRIMARY KEY (STD_ID)
) GO;

ALTER TABLE StudentPortal.dbo.Student ADD CONSTRAINT Student_FK FOREIGN KEY (GRP_ID) REFERENCES StudentPortal.dbo.[Group](GRP_ID) GO;
ALTER TABLE StudentPortal.dbo.Student ADD CONSTRAINT Student_FK_1 FOREIGN KEY (CTR_ID) REFERENCES StudentPortal.dbo.Contract(CTR_ID) GO;

CREATE TABLE StudentPortal.dbo.Contract (
	CTR_ID numeric(18,0) NOT NULL,
	STD_ID numeric(18,0) NOT NULL,
	STDY_TYPE numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Contract_PK PRIMARY KEY (CTR_ID)
) GO;

ALTER TABLE StudentPortal.dbo.Contract ADD CONSTRAINT Contract_FK FOREIGN KEY (STD_ID) REFERENCES StudentPortal.dbo.Student(STD_ID) GO;
