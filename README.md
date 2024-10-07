# Crowdfunding Project

## Setup

### Step 1: Create a MySQL Database

Create a new MySQL database and run the `crowdfunding_db.sql` script to create the tables with data.

### Step 2: Configure Environment Variables

Set the following environment variables:

Replace the .env.example with .env & add your env variables
* `DB_HOST`: the hostname of your MySQL server (default: `localhost`)
* `DB_USER`: the username of your MySQL user (default: `root`)
* `DB_PASSWORD`: the password of your MySQL user (default: empty)
* `DB_NAME`: the name of your MySQL database (default: `crowdfunding_db`)

### Step 3: Start the Server

* Run `npm install` in the server folder
* Run `node crowdfunding_db.js` to start the server.

### Step 4: Open the Client Application

Open the client application in your web browser.

