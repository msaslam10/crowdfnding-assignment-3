require('dotenv').config(); // to load env
const cors = require('cors');

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; // Default to port 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(cors());

app.use(
  cors({
    origin: true,
  })
);

// API to get fundraiser information
app.get('/api/fundraisers', (req, res) => {
  const query = `
      SELECT FUNDRAISER.FUNDRAISER_ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, NAME as CATEGORY
      FROM FUNDRAISER
      JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to fetch all the categories
app.get('/api/categories', (req, res) => {
  const query = `SELECT * FROM CATEGORY`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to search fundraisers
app.get('/api/fundraisers/search', (req, res) => {
  // query parameters for search filters
  const { organizer, city, category } = req.query;

  // Query to fetch active fundraisers
  let query = `
      SELECT 
          FUNDRAISER.FUNDRAISER_ID, 
          ORGANIZER, 
          CAPTION, 
          TARGET_FUNDING, 
          CURRENT_FUNDING, 
          CITY, 
          CATEGORY.NAME AS CATEGORY
      FROM 
          FUNDRAISER
      JOIN 
          CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
      WHERE 
          ACTIVE = true
  `;

  // Array to hold query parameters
  const params = [];

  // Organizer filter
  if (organizer) {
    query += ` AND ORGANIZER LIKE ?`;
    params.push(`%${organizer}%`);
  }

  // City Filter
  if (city) {
    query += ` AND CITY LIKE ?`;
    params.push(`%${city}%`);
  }

  // Category Filter
  if (category) {
    query += ` AND CATEGORY.NAME = ?`;
    params.push(category);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res
        .status(500)
        .json({ error: 'An error occurred while searching for fundraisers.' });
    }
    res.json(results);
  });
});

// Getting Fundraiser by ID 
app.get('/api/fundraisers/:id', (req, res) => {
  const fundraiserId = req.params.id;
  const query = `
      SELECT 
          FUNDRAISER.FUNDRAISER_ID, 
          ORGANIZER, 
          CAPTION, 
          TARGET_FUNDING, 
          CURRENT_FUNDING, 
          CITY, 
          CATEGORY.CATEGORY_ID,
          CATEGORY.NAME AS CATEGORY, 
          DONATION.DONATION_ID, 
          DONATION.DATE, 
          DONATION.AMOUNT, 
          DONATION.GIVER
      FROM 
          FUNDRAISER
      JOIN 
          CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
      LEFT JOIN 
          DONATION ON FUNDRAISER.FUNDRAISER_ID = DONATION.FUNDRAISER_ID
      WHERE 
          FUNDRAISER.FUNDRAISER_ID = ?;
  `;
  db.query(query, [fundraiserId], (err, results) => {
    if (err) {
      console.error(err);  
      return res.status(500).send('Error retrieving fundraiser'); // Send error response
    }
    res.json(results);
  });
});


// Adds donation to donation table
app.post('/api/donation', (req, res) => {
  const { amount, giver, fundraiserId } = req.body;
  
  const query = `
      INSERT INTO DONATION (AMOUNT, GIVER, FUNDRAISER_ID)
      VALUES (?, ?, ?)
  `;
  
  db.query(query, [amount, giver, fundraiserId], (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'Donation added successfully.' });
  });
});

// Insert a new fundraiser
app.post('/api/fundraisers', (req, res) => {
  const { organizer, caption, target_funding, current_funding, city, category_id } = req.body;

  if (!organizer || !caption || !target_funding || !city || !category_id) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
}

  const query = `
      INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID)
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [organizer, caption, target_funding, current_funding, city, category_id], (err, results) => {
      if (err) {
          console.error('Error inserting fundraiser: ', err);
          return res.status(500).json({ error: 'An error occurred while inserting the fundraiser.' });
      }

      res.status(201).json({
          message: 'Fundraiser created successfully!',
          fundraiserId: results.insertId
      });
  });
});

// Update fundraiser information
app.put('/api/fundraisers/:id', (req, res) => {
  const fundraiserId = req.params.id;
  const { organizer, caption, target_funding, current_funding, city, active, category_id } = req.body;

    //   // Validation of fields
    if (!organizer || !caption || !target_funding || !city || !category_id) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields.' });
    }

  const query = `
      UPDATE FUNDRAISER
      SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ?
      WHERE FUNDRAISER_ID = ?
  `;

  db.query(query, [organizer, caption, target_funding, current_funding, city, active, category_id, fundraiserId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'An error occurred while updating the fundraiser.' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Fundraiser not found.' });
      }

      res.status(200).json({
          message: 'Fundraiser updated successfully!',
          fundraiserId: fundraiserId
      });
  });
});


// Remove existing fundraiser by ID
app.delete('/api/fundraisers/:id', (req, res) => {
  const fundraiserId = req.params.id;

  // Any donation check
  const donationCheckQuery = `
      SELECT COUNT(*) AS noOfDonations 
      FROM DONATION 
      WHERE FUNDRAISER_ID = ?;
  `;

  db.query(donationCheckQuery, [fundraiserId], (err, results) => {
    if (err) {
      console.error('Error checking donations: ', err);
      return res
        .status(500)
        .json({ error: 'An error occurred while checking for donations.' });
    }

    const noOfDonations = results[0].noOfDonations;

    // Dont delete if there are donations
    if (noOfDonations > 0) {
      return res
        .status(400)
        .json({ error: 'Cannot delete fundraiser with existing donations.' });
    }

    // Delete Query
    const deleteQuery = `
          DELETE FROM FUNDRAISER 
          WHERE FUNDRAISER_ID = ?;
      `;

    db.query(deleteQuery, [fundraiserId], (err, results) => {
      if (err) {
        console.error('Error deleting fundraiser: ', err);
        return res
          .status(500)
          .json({ error: 'An error occurred while deleting the fundraiser.' });
      }

      res.status(200).json({
        message: 'Fundraiser deleted successfully!',
      });
    });
  });
});
