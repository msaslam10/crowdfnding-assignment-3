
CREATE DATABASE crowdfunding_db;
USE crowdfunding_db;

-- create category table
CREATE TABLE CATEGORY(
    CATEGORY_ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

-- create fundraiser table
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

-- Insert records into the CATEGORY table
INSERT INTO CATEGORY (NAME) VALUES ('Healthcare Assistance'), ('Scholarships'), ('Environmental Support');

-- Insert records into the FUNDRAISER table
INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID)
VALUES
    ('Hope for All', 'Provide urgent medical care for underprivileged children', 22000, 16000, 'Sydney', TRUE, 1),
    ('Bright Futures', 'Support promising students through scholarships', 14000, 6200, 'Melbourne', TRUE, 2),
    ('Earth Guardians', 'Plant trees in areas devastated by deforestation', 35000, 29000, 'Perth', TRUE, 3),
    ('Unity Rebuild', 'Help families recover after severe flooding', 30000, 27000, 'Brisbane', TRUE, 1),
    ('Knowledge Bridge', 'Fund books for students in remote communities', 10000, 7500, 'Adelaide', TRUE, 2);
