const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Creating a MySQL database connection:
const db = mysql.createConnection({
  host     : 'localhost',
  port     :'3306',
  user     : 'AngularCaseStudy',
  password : 'Pass@12345',
  database : 'AngularCaseStudy'
});

db.connect((err) => {
    if (err) {
        console.error("Database connection error", err)
    } else {
        console.log("Connected to database");
    }
});
app.use('/home', (req, res) => {
    res.json("Hi this is done");
});

app.post('/submit-employee', (req, res) => {
    const { firstName, lastName, contactNo, email, dob, address, id } = req.body;

    const sql = 'INSERT INTO AngularCaseStudy.emp_info (Fname, Lname, ContactNo, Email, Dob, Address, id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, contactNo, email, dob, address, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err)
            res.status(500).json({ message: 'Error inserting data' })
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ message: 'Data inserted successfully' })
        }
    });
});

app.get('/get-all-employees', (req, res) => {
   
    const sql = 'SELECT * FROM AngularCaseStudy.emp_info';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data: ', err);
            res.status(500).json({ message: 'Error fetching data' });
        } else {
            res.status(200).json(results);
        }
    });
});
// app.put('/update-employee/:id', (req, res) => {
//     const employeeId = req.params.id;
//     const { firstName, lastName, contactNo, email, dob, address, id } = req.body;

//     const sql = `
//         UPDATE AngularCaseStudy.emp_info 
//         SET Fname = ?, Lname = ?, ContactNo = ?, Email = ?, Dob = ?, Address = ?, id = ? 
//         WHERE id = ?
//     `;
//     const values = [firstName, lastName, contactNo, email, dob, address, id, employeeId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error updating data: ', err);
//             res.status(500).json({ message: 'Error updating data' });
//         } else {
//             if (result.affectedRows === 0) {
//                 // No employee with the provided ID was found   
//                 res.status(404).json({ message: 'Employee not found' });
//             } else {
//                 console.log("Data updated successfully");
//                 res.status(200).json({ message: 'Data updated successfully' });
//             }
//         }
//     });
// });


app.put('/update-employee/:id', (req, res) => {
    const employeeId = req.params.id;
    const { firstName, lastName, contactNo, email, dob, address, id } = req.body;

    if(isNaN(employeeId)) {
        return res.status(400).json({
            message: 'Invalid Employee ID'
        })
    }

    const sql = `
        UPDATE AngularCaseStudy.emp_info 
        SET Fname = ?, Lname = ?, ContactNo = ?, Email = ?, Dob = ?, Address = ?, id = ? 
        WHERE id = ?
    `;
    const values = [firstName, lastName, contactNo, email, dob, address, id, employeeId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data: ', err);
            res.status(500).json({ message: 'Error updating data', error: err }); // Send an error response with details
        } else {
            if (result.affectedRows === 1) {
                // No employee with the provided ID was found
                res.status(404).json({ message: 'Employee not found' });
            } else {
                console.log("Data updated successfully");
                res.status(200).json({ message: 'Data updated successfully' });
            }
        }
    });
});
// Add a new route to delete an employee by ID
app.delete('/delete-employee/:id', (req, res) => {
    const employeeId = req.params.id;

    // SQL query to delete the employee by ID
    const sql = 'DELETE FROM AngularCaseStudy.emp_info WHERE id = ?';
    
    db.query(sql, [employeeId], (err, result) => {
        if (err) {
            console.error('Error deleting data: ', err);
            res.status(500).json({ message: 'Error deleting data', error: err });
        } else {
            if (result.affectedRows === 0) {
                // No employee with the provided ID was found
                res.status(404).json({ message: 'Employee not found' });
            } else {
                console.log("Data deleted successfully");
                res.status(200).json({ message: 'Data deleted successfully' });
            }
        }
    });
});

// Combine login and token generation into a single route
app.post('/api/login', (req, res) => {
    const { UserName, Password } = req.body;

    // Add a console.log to see the received data from the frontend
    console.log('Received data from frontend:', UserName, Password);

    const sql = 'SELECT * FROM emp_info WHERE Fname = ? AND Dob = ?';
    const values = [UserName, Password];

    // Add a console.log to see the SQL query and values being used
    console.log('Executing SQL query:', sql, values);

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ message: 'Error during login' });
        } else {
            if (results.length === 1) {
                const user = results[0];

                // Generate the JWT token
                jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.error('Error generating JWT token:', err);
                        res.status(500).json({ message: 'Error during login' });
                    } else {
                        // Send the JWT token along with the user data
                        res.status(200).json({ message: 'Login successful', user, token });
                        console.log(userName, password);
                    }
                });
            } else {
                // Username and password don't match
                res.status(401).json({ message: 'Invalid username or password' });
            }
        }
    });
});

// Secret key for signing and verifying tokens (keep this secret)
const secretKey = 'my_secret_key';

// Middleware to verify JWT token before accessing protected routes
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Error verifying JWT token:', err);
            return res.status(401).json({ message: 'Access denied, invalid token' });
        }

        req.user = decoded.user;
        next();
    });
}

app.get('/api/protected-route', verifyToken, (req, res) => {
    // Access granted if the token is valid

    // Extract user information from the JWT token
    const { user } = req;

    // Use the user information (e.g., user.UserName) to filter data from the database
    // Modify your SQL query accordingly to filter data based on the logged-in user
    const sql = 'SELECT * FROM emp_info WHERE Fname = ?';
    const values = [user.Fname];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ message: 'Error fetching data' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});