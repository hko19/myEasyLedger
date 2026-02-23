# myEasyLedger

myEasyLedger is a full-stack responsive webapp that allows users to keep track of their bookkeeping. It offers a simple-to-use single-entry interface for personal users, and a double-entry interface for enterprise users that automatically generates financial statements.

## Contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Dev setup](#dev-setup)
- [Technical Documentation](docs/TECHNICAL_DOCS.md)

## Features
- Full authentication with JWT
- Single-entry bookkeeping interface for personal use
- Double-entry interface for enterprise use
- Chart of Accounts system with support for account codes and two levels of user-customizable accounts
- Supports initialization of ledger accounts with non-zero debit and credit values for ease of import
- Customizable fiscal year begin date
- Generate balance sheets, income statements, and cash flow statements, and compare different time periods on your financial statement in a Enterprise EasyLedger
- Calculate your net worth and view your income and expense report in a Personal EasyLedger
- Responsive layout
- Create multiple EasyLedgers for a single user
- Invite multiple users to collaborate on a single EasyLedger
- View the edit history for any journal entry or transaction
- Supports English and Chinese (Traditional)
- Supports light and dark appearance themes, and supports automatic switching based on system settings


## Tech Stack
- Front end
    - Certain assets from Color Admin 4.6
    - Bootstrap 5
    - React 17
- Back end
    - Spring
        - Spring Boot 2.6.1
        - Spring Security
        - Spring Mail
        - Thymeleaf
    - PostgreSQL 13

## Dev Setup
These instructions assume you are using a recent version of MacOS (10.13 or newer) and that you have cloned this repository to your device. For development and demo purposes please clone the 'master' branch.
- [Local DB](#local-db-setup)
- [Backend Development Environment](#backend-development-environment-setup)
- [Frontend Development Environment](#frontend-development-environment-setup)

### Local DB Setup
#### Install a local PostgreSQL Database
myEasyLedger uses PostgreSQL 13. It is recommended to use the [EnterpriseDB installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
1. Go to https://www.postgresql.org/download/macosx/ and click on 'download the installer'.
2. Download version 13.x for MacOS
3. Double-click on the downloaded postgresql-13-osx.dmg then click on postgresql-13-osx to start installing.

During the installation process, use the default installation settings: 
```
Default Locale
Installation Directory: /Library/PostgreSQL/13
Server Installation Directory: /Library/PostgreSQL/13
Data Directory: /Library/PostgreSQL/13/data
Database Port: 5432
Database Superuser: postgres
Operating System Account: postgres
Database Service: postgresql-13
Command Line Tools Installation Directory: /Library/PostgreSQL/13
pgAdmin4 Installation Directory: /Library/PostgreSQL/13/pgAdmin 4
Stack Builder Installation Directory: /Library/PostgreSQL/13
```

Now use pgAdmin4 (or some other method) to...

##### Create a database in pgAdmin named 'easyledger'
1. Right-click Servers/PostgreSQL 13/Databases
2. Create -> Database
3. Name your database 'easyledger' and leave other settings at default

##### Create a schema in your 'easyledger' database named 'public'
1. Right click Servers/PostgreSQL 13/Databases/easyledger/Schemas
2. Create -> Schemas...
3. name your schema 'public' and leave other settings at default

##### Import the myEasyLedger database
1. If you are not beginning from an empty schema, drop-cascade your 'public' schema and create a new one.
2. You may need to configure PgAdmin's binary paths if this is a fresh installation of PostgreSQL. Click "Dashboard" on the toolbar at the top of the page, and click "Configure PgAdmin" on the dashboard. From the sidebar, choose Paths -> Binary Paths, and in the "PostgreSQL Binary Path" field, enter the path to your pg_dump and pg_restore utilities. By default on MacOS this is `/Library/PostgreSQL/13/bin`. Click save.
3. Right click on the 'public' schema and click "Restore..."
4. Change "Format" to "All Files", and restore from the `db/db_schema_and_metadata` file for an clean db, or `db/db_full` for sample data.

##### ER diagram for DB
An ER diagram for this db can be found in the `db/` directory. This file can be opened at https://online.visual-paradigm.com/ - requires a free account.

### Backend Development Environment Setup
The recommended IDE for this project is Spring Tool Suite 4 for Eclipse. STS can be downloaded at https://spring.io/tools and includes a full Eclipse-based IDE.

Alternatively, install Spring Tool Suite 4 on an existing installation of Eclipse by clicking Help > Eclipse Marketplace... and searching for STS. Select the version that matches your Eclipse version and hit Install. All features are selected by default. After installing STS4 with all features, you will need to restart Eclipse.

#### Open the project in STS4:
1. File > Open Projects from File System
2. Click the “Directory…” button
3. Select `rest_api/`, then click open
4. Click Finish
5. STS may take a few moments to update dependencies for the project build.

#### Setting up application properties
You will need to configure the application properties of the backend before launching the app. The application properties file is found in the following directory: `rest_api/src/main/resources/application.properties`.
- `spring.datasource.url` should be set to `jdbc:postgresql://[YOUR DATABASE URL HERE]`. If you are running PostgreSQL on a local machine and have set it up according to the previous instructions, this should be set to `jdbc:postgresql://localhost:5432/easyledger`.
- `spring.datasource.password` should be set to the password that you set up for the 'easyledger' database. The default password in the `application.properties` file is `KoPostgres`, but you should change this to your own database password.
- `app.jwtSecret` should be set to your API signing key.
- `spring.mail.host` and `spring.mail.port` should be the URL and port of your smtp service. The committed application.properties file uses Gmail.
- `spring.mail.username` and `spring.mail.password` are the username and password for your smtp service. The app will work without spring.mail properties set up, but you will be unable to use endpoints that require mail such as registration, "forgot password", and email verification.

#### Setting up application properties using command-line arguments
Instead of directly editing application.properties, you can use command line arguments to set application properties.  This is useful for sensitive information you would prefer not to hardcode. Command-line arguments override the properties hardcoded into application.properties.
##### Using Eclipse/STS4
1. Go to Run > Run Configurations... and click on the 'Arguments' tab.
2. In the 'Program arguments' textarea, enter your properties in the format `--{PROPERTYNAME}={PROPERTYVALUE}`, separated by spaces. For example: 
```
--spring.mail.username=example@example.com --spring.mail.password=VerySecurePassword
```
##### Using the command line
If you use Maven to run your program, navigate to the `rest_api` folder where `pom.xml` is located. Run the following command using the application properties you wish to set. Prefix your properties with `-Dspring-boot.run.jvmArguments=`, encapsulate your properties in single quots, and separate them with whitespace and -D. For example: 
```
mvn spring-boot:run -Dspring-boot.run.jvmArguments='
-Dspring.datasource.password=KoPostgres 
-Dspring.mail.username=example@example.com 
-Dspring.mail.password=VerySecurePassword'
```

#### Run the project from STS4:
1. Make sure to click EasyLedgerApplication.java from the Package Explorer sidebar to select it. If this file is not selected, occasionally STS will fail to run the project.
2. Hit the play button in the top toolbar.
3. If prompted, choose "Run as Spring Boot App".

### Frontend Development Environment Setup
The recommended text editor is [Visual Studio Code](https://code.visualstudio.com/).

You will need to have NodeJS 14 installed, which can be found [here](https://nodejs.org/en/
).

When running for the first time, initialize the frontend in the terminal by issuing the following commands: 
```
$ cd front_end
$ npm install
```

To start the front end, run the following commands: 
```
$ cd front_end
$ npm start 
```

Please make sure that the backend server is running before starting the frontend.

### User setup
This webapp features full user authentication. In order to demo the app, you will need to create an account and log in. Because this webapp uses an email verification system, you must set up an SMTP service to allow the server to send registration emails before you can create a user account. For easy of demonstration, the `db_full` database backup file includes a user with sample data. The credentials of this sample user are as follows:
```
username: sampleuser@example.com
password: admin
```
