const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'manager', // Replace with your MySQL password
  database: 'admin_panel'
});

connection.getConnection((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection.promise();
