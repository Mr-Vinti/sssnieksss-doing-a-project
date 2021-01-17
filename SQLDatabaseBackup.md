# SQL Database Backup

## Reasons
In order to save expenses, the database will be created on a need basis.

## Main Details

The sql database link is: `student-portal.database.windows.net`

The sql database name is: `StudentPortal`

The sql database user is: `yyystudport1234`

The sql database pass is: `ProiectIP$2020`

## List of tables

1. Certificate
2. Certificate_Status
3. Contract
4. Course
5. Department
6. Faculty
7. Group
8. Series
9. Student

## DDLs

1.  Certificate

```sql
CREATE TABLE StudentPortal.dbo.Certificate (
	CERT_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	STD_ID numeric(18,0) NOT NULL,
	PRPSE varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	STA_ID numeric(18,0) NOT NULL,
	SBM_AT datetime NOT NULL,
	APRV_AT datetime NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Certificate_PK PRIMARY KEY (CERT_ID)
) GO;


-- StudentPortal.dbo.Certificate foreign keys

ALTER TABLE StudentPortal.dbo.Certificate ADD CONSTRAINT Certificate_FK FOREIGN KEY (STD_ID) REFERENCES StudentPortal.dbo.Student(STD_ID) ON DELETE CASCADE GO
ALTER TABLE StudentPortal.dbo.Certificate ADD CONSTRAINT Certificate_FK_1 FOREIGN KEY (STA_ID) REFERENCES StudentPortal.dbo.Certificate_Status(STA_ID) GO;
```

2. Certificate_Status

```sql
CREATE TABLE StudentPortal.dbo.Certificate_Status (
	STA_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	STA varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CONSTRAINT Certificate_Status_PK PRIMARY KEY (STA_ID)
) GO;
```

3. Contract

```sql
CREATE TABLE StudentPortal.dbo.Contract (
	STD_ID numeric(18,0) NOT NULL,
	STDY_TYPE varchar(9) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CTR_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	STDY_YR numeric(18,0) NOT NULL,
	[YEAR] numeric(18,0) NOT NULL,
	CONSTRAINT Contract_PK PRIMARY KEY (CTR_ID)
) GO;


-- StudentPortal.dbo.Contract foreign keys

ALTER TABLE StudentPortal.dbo.Contract ADD CONSTRAINT Contract_FK FOREIGN KEY (STD_ID) REFERENCES StudentPortal.dbo.Student(STD_ID) ON DELETE CASCADE GO;
```

4. Course

```sql
CREATE TABLE StudentPortal.dbo.Course (
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SRS_ID numeric(18,0) NOT NULL,
	CRDT_PTS numeric(18,0) NOT NULL,
	TCHR varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SMSTR numeric(18,0) NOT NULL,
	STDY_YR numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	CRS_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	CONSTRAINT Course_PK PRIMARY KEY (CRS_ID)
) GO;


-- StudentPortal.dbo.Course foreign keys

ALTER TABLE StudentPortal.dbo.Course ADD CONSTRAINT Course_FK FOREIGN KEY (SRS_ID) REFERENCES StudentPortal.dbo.Series(SRS_ID) ON DELETE CASCADE GO;
```

5. Department

```sql
CREATE TABLE StudentPortal.dbo.Department (
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	FAC_ID numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	DEPT_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	CONSTRAINT Department_PK PRIMARY KEY (DEPT_ID)
) GO;


-- StudentPortal.dbo.Department foreign keys

ALTER TABLE StudentPortal.dbo.Department ADD CONSTRAINT Department_FK FOREIGN KEY (FAC_ID) REFERENCES StudentPortal.dbo.Faculty(FAC_ID) ON DELETE CASCADE GO;
```

6. Faculty

```sql
CREATE TABLE StudentPortal.dbo.Faculty (
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	FAC_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	CONSTRAINT Faculty_PK PRIMARY KEY (FAC_ID)
) GO;
```

7. Group

```sql
CREATE TABLE StudentPortal.dbo.[Group] (
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SRS_ID numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	GRP_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	CONSTRAINT Group_PK PRIMARY KEY (GRP_ID)
) GO;


-- StudentPortal.dbo.[Group] foreign keys

ALTER TABLE StudentPortal.dbo.[Group] ADD CONSTRAINT Group_FK FOREIGN KEY (SRS_ID) REFERENCES StudentPortal.dbo.Series(SRS_ID) ON DELETE CASCADE GO;
```

8. Series

```sql
CREATE TABLE StudentPortal.dbo.Series (
	NAME varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	STDY_YR numeric(18,0) NOT NULL,
	DEPT_ID numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	SRS_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	CONSTRAINT Series_PK PRIMARY KEY (SRS_ID)
) GO;


-- StudentPortal.dbo.Series foreign keys

ALTER TABLE StudentPortal.dbo.Series ADD CONSTRAINT Series_FK FOREIGN KEY (DEPT_ID) REFERENCES StudentPortal.dbo.Department(DEPT_ID) ON DELETE CASCADE GO;
```

9. Student
```sql
-- StudentPortal.dbo.Student definition

-- Drop table

-- DROP TABLE StudentPortal.dbo.Student GO

CREATE TABLE StudentPortal.dbo.Student (
	FRSTNAM varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	LSTNAM varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	USRNAM varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	FTHR_INIT varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CNP varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	PHN_NBR varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	EMAIL varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	GRP_ID numeric(18,0) NOT NULL,
	STDY_YR numeric(18,0) NOT NULL,
	CREAT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CREAT_DT datetime NULL,
	UPDT_BY char(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	UPDT_DT datetime NULL,
	STD_ID numeric(18,0) IDENTITY(0,1) NOT NULL,
	CONSTRAINT Student_PK PRIMARY KEY (STD_ID)
) GO;


-- StudentPortal.dbo.Student foreign keys

ALTER TABLE StudentPortal.dbo.Student ADD CONSTRAINT Student_FK FOREIGN KEY (GRP_ID) REFERENCES StudentPortal.dbo.[Group](GRP_ID) ON DELETE CASCADE GO;
```

## Model Data

1. Certificate

```sql
INSERT INTO StudentPortal.dbo.Certificate
(CERT_ID, STD_ID, PRPSE, STA_ID, SBM_AT, APRV_AT, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(0, 6, 'Internship', 1, '2020-05-14 06:14:24.127', '2020-05-14 08:13:04.353', NULL, NULL, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 08:13:04.737');
INSERT INTO StudentPortal.dbo.Certificate
(CERT_ID, STD_ID, PRPSE, STA_ID, SBM_AT, APRV_AT, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(1, 6, 'Adeverinta de student', 2, '2020-05-14 06:14:47.967', '2020-05-14 08:13:16.340', NULL, NULL, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 08:13:16.777');
INSERT INTO StudentPortal.dbo.Certificate
(CERT_ID, STD_ID, PRPSE, STA_ID, SBM_AT, APRV_AT, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(2, 7, 'Asigurare medicala', 1, '2020-05-14 06:15:15.347', '2020-05-15 15:35:11.337', NULL, NULL, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-15 15:35:11.717');
INSERT INTO StudentPortal.dbo.Certificate
(CERT_ID, STD_ID, PRPSE, STA_ID, SBM_AT, APRV_AT, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(3, 6, 'Employment', 1, '2020-05-21 07:45:41.507', '2020-05-21 09:02:21.863', 'alex.dumitru@ipsssnieksss.onmicrosoft.com                                                           ', '2020-05-21 07:45:41.507', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 09:02:22.250');
INSERT INTO StudentPortal.dbo.Certificate
(CERT_ID, STD_ID, PRPSE, STA_ID, SBM_AT, APRV_AT, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(4, 6, 'Health Ensurance', 0, '2020-05-21 09:03:56.173', NULL, 'alex.dumitru@ipsssnieksss.onmicrosoft.com                                                           ', '2020-05-21 09:03:56.173', 'alex.dumitru@ipsssnieksss.onmicrosoft.com                                                           ', '2020-05-21 09:03:56.173');
```

2. Certificate_Status

```sql
INSERT INTO StudentPortal.dbo.Certificate_Status
(STA_ID, STA, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(0, 'PENDING', 'marius.vintila                                                                                      ', '2020-05-14 04:53:04.110', 'marius.vintila                                                                                      ', '2020-05-14 04:53:04.110');
INSERT INTO StudentPortal.dbo.Certificate_Status
(STA_ID, STA, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(1, 'ACCEPTED', 'marius.vintila                                                                                      ', '2020-05-14 04:53:04.110', 'marius.vintila                                                                                      ', '2020-05-14 04:53:04.110');
INSERT INTO StudentPortal.dbo.Certificate_Status
(STA_ID, STA, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT)
VALUES(2, 'REJECTED', 'marius.vintila                                                                                      ', '2020-05-14 04:53:04.110', 'marius.vintila                                                                                      ', '2020-05-14 04:53:04.110');
```

3. Contract

```sql
INSERT INTO StudentPortal.dbo.Contract
(STD_ID, STDY_TYPE, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, CTR_ID, STDY_YR, [YEAR])
VALUES(6, 'budget', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 05:09:16.617', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 05:09:16.617', 3, 1, 2019);
INSERT INTO StudentPortal.dbo.Contract
(STD_ID, STDY_TYPE, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, CTR_ID, STDY_YR, [YEAR])
VALUES(6, 'tax', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 05:09:26.003', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 05:09:26.003', 4, 2, 2020);
```

4. Course

```sql
INSERT INTO StudentPortal.dbo.Course
(NAME, SRS_ID, CRDT_PTS, TCHR, SMSTR, STDY_YR, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, CRS_ID)
VALUES('Matematica 1', 12, 5, 'Cristian Ghiu', 1, 1, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:12:57.493', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:12:57.493', 6);
```

5. Department

```sql
INSERT INTO StudentPortal.dbo.Department
(NAME, FAC_ID, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, DEPT_ID)
VALUES('CTI', 16, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:09:36.160', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:09:36.160', 31);
INSERT INTO StudentPortal.dbo.Department
(NAME, FAC_ID, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, DEPT_ID)
VALUES('IS', 16, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:09:43.507', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:09:43.507', 32);
INSERT INTO StudentPortal.dbo.Department
(NAME, FAC_ID, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, DEPT_ID)
VALUES('ETTI', 17, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:10:01.577', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:10:01.577', 33);
```

6. Faculty

```sql
INSERT INTO StudentPortal.dbo.Faculty
(NAME, CREAT_BY, CREAT_DT, UPDT_DT, UPDT_BY, FAC_ID)
VALUES('ACSSS', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:09:24.317', '2020-05-21 08:59:31.163', 'marius.vintila@stud.acs.upb.ro                                                                      ', 16);
INSERT INTO StudentPortal.dbo.Faculty
(NAME, CREAT_BY, CREAT_DT, UPDT_DT, UPDT_BY, FAC_ID)
VALUES('ETTI', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:09:51.877', '2020-05-14 06:09:51.877', 'marius.vintila@stud.acs.upb.ro                                                                      ', 17);
```

7. Group

```sql
INSERT INTO StudentPortal.dbo.[Group]
(NAME, SRS_ID, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, GRP_ID)
VALUES('311CDD', 12, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:11:12.760', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 08:11:46.723', 4);
INSERT INTO StudentPortal.dbo.[Group]
(NAME, SRS_ID, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, GRP_ID)
VALUES('311AC', 13, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 00:41:47.880', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 00:41:47.880', 5);
```

8. Series

```sql
INSERT INTO StudentPortal.dbo.Series
(NAME, STDY_YR, DEPT_ID, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, SRS_ID)
VALUES('CD', 1, 31, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:10:54.263', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:10:54.263', 12);
INSERT INTO StudentPortal.dbo.Series
(NAME, STDY_YR, DEPT_ID, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, SRS_ID)
VALUES('AC', 1, 32, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 00:41:33.297', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 00:41:33.297', 13);
```

9. Student

```sql
INSERT INTO StudentPortal.dbo.Student
(FRSTNAM, LSTNAM, USRNAM, FTHR_INIT, CNP, PHN_NBR, EMAIL, GRP_ID, STDY_YR, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, STD_ID)
VALUES('Alex', 'Dumitru', 'alex.dumitru', 'C', '1392139839211', '+0724494732', 'alex.dumitru@ipsssnieksss.onmicrosoft.com', 4, 1, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:11:59.977', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:11:59.977', 6);
INSERT INTO StudentPortal.dbo.Student
(FRSTNAM, LSTNAM, USRNAM, FTHR_INIT, CNP, PHN_NBR, EMAIL, GRP_ID, STDY_YR, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, STD_ID)
VALUES('Ciprian', 'Popescu', 'ciprian.popescu', 'D', '1249852349839', '0723487432', 'ciprian.popescu@ipsssnieksss.onmicrosoft.com', 4, 1, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:12:35.467', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-14 06:12:35.467', 7);
INSERT INTO StudentPortal.dbo.Student
(FRSTNAM, LSTNAM, USRNAM, FTHR_INIT, CNP, PHN_NBR, EMAIL, GRP_ID, STDY_YR, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, STD_ID)
VALUES('Cornel', 'Popescu', 'cornel.popescu', 'C', '1982318923198', '0723827382', 'cornel.popescu@ipsssnieksss.onmicrosoft.com', 5, 1, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 00:42:20.770', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 00:42:20.770', 8);
INSERT INTO StudentPortal.dbo.Student
(FRSTNAM, LSTNAM, USRNAM, FTHR_INIT, CNP, PHN_NBR, EMAIL, GRP_ID, STDY_YR, CREAT_BY, CREAT_DT, UPDT_BY, UPDT_DT, STD_ID)
VALUES('Costin', 'Lucian', 'costin.lucian', 'C', '1941842148183', '+0734284324', 'costin.lucian@ipsssnieksss.onmicrosoft.com', 4, 1, 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 09:00:32.247', 'marius.vintila@stud.acs.upb.ro                                                                      ', '2020-05-21 09:00:32.247', 9);
```
