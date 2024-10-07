-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS crowdfunding_db;
USE crowdfunding_db;

-- Step 2: Drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS DONATION;
DROP TABLE IF EXISTS FUNDRAISER;
DROP TABLE IF EXISTS CATEGORY;

-- Step 3: Create the CATEGORY table
CREATE TABLE CATEGORY(
    CATEGORY_ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

-- Step 4: Create the FUNDRAISER table
CREATE TABLE FUNDRAISER (
    FUNDRAISER_ID INT AUTO_INCREMENT PRIMARY KEY,
    ORGANIZER VARCHAR(100) NOT NULL,
    CAPTION VARCHAR(255) NOT NULL,
    TARGET_FUNDING DECIMAL(10, 2) NOT NULL,
    CURRENT_FUNDING DECIMAL(10, 2) NOT NULL DEFAULT 0,
    CITY VARCHAR(100) NOT NULL,
    ACTIVE BOOLEAN DEFAULT TRUE,
    CATEGORY_ID INT,
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);

-- Step 5: Create the DONATION table
CREATE TABLE DONATION (
    DONATION_ID INT AUTO_INCREMENT PRIMARY KEY,
    DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    AMOUNT DECIMAL(10, 2) NOT NULL,
    GIVER VARCHAR(255) NOT NULL,
    FUNDRAISER_ID INT,
    FOREIGN KEY (FUNDRAISER_ID) REFERENCES FUNDRAISER(FUNDRAISER_ID)
);

-- Step 6: Insert records into the CATEGORY table
INSERT INTO CATEGORY (NAME) VALUES
    ('Medical'),
    ('Education'),
    ('Environmental Support');

-- Step 7: Insert records into the FUNDRAISER table
INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID)
VALUES
    ('Hope for All', 'Provide urgent medical care for underprivileged children', 22000, 16000, 'Sydney', TRUE, 1),
    ('Bright Futures', 'Support promising students through scholarships', 14000, 6200, 'Melbourne', TRUE, 2),
    ('Earth Guardians', 'Plant trees in areas devastated by deforestation', 35000, 29000, 'Perth', TRUE, 3),
    ('Unity Rebuild', 'Help families recover after severe flooding', 30000, 27000, 'Brisbane', TRUE, 1),
    ('Knowledge Bridge', 'Fund books for students in remote communities', 10000, 7500, 'Adelaide', TRUE, 2),
    ('Healing Hands', 'Provide healthcare services in remote areas', 18000, 8500, 'Canberra', TRUE, 1),
    ('Future Leaders', 'Offer scholarships to deserving students', 20000, 13000, 'Sydney', TRUE, 2),
    ('Green Earth', 'Plant trees and restore deforested lands', 25000, 17000, 'Perth', TRUE, 3),
    ('River Cleanup', 'Organize river cleanup activities', 12000, 6000, 'Brisbane', TRUE, 3),
    ('Study Support', 'Scholarship fund for underprivileged youth', 15000, 4000, 'Melbourne', TRUE, 2),
    ('Life Savers', 'Provide essential healthcare equipment', 28000, 15000, 'Sydney', TRUE, 1),
    ('Ocean Rescuers', 'Cleanup and protect marine life', 32000, 25000, 'Perth', TRUE, 3),
    ('Youth Education', 'Build schools in rural communities', 24000, 16000, 'Adelaide', TRUE, 2),
    ('Healthcare for All', 'Ensure accessible medical facilities', 35000, 20000, 'Sydney', TRUE, 1),
    ('Clean Water Access', 'Provide clean water to rural areas', 27000, 19000, 'Brisbane', TRUE, 3);

-- Step 8: Insert records into the DONATION table
INSERT INTO DONATION (AMOUNT, GIVER, FUNDRAISER_ID)
VALUES
    (500, 'Jacob Smith', 1),
    (300, 'Isabella Moore', 2),
    (150, 'Ava Thompson', 13),
    (1000, 'Mason Brown', 4),
    (250, 'Mia White', 2),
    (750, 'Ethan Harris', 15),
    (400, 'Amelia Lewis', 7),
    (1200, 'Daniel Walker', 8),
    (600, 'Noah Clark', 9),
    (300, 'Lily Young', 10);

