const mysql = require("mysql2");

const db = mysql.createConnection(
    {hoost: "localhost", user: "root", password: "secret", database: "test"}
);