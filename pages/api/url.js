const mysql = require('mysql2/promise');
import { nanoid } from 'nanoid';

// TODO: Use connection pool
// TODO: Change sql connection login for prod

async function sqlCreateConnection() {
  return await mysql.createConnection({ // Var for global variable, so that connection is defined in the finally statement
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: {
      rejectUnauthorized: false
    }
  })
}
// rejectUnauthorized: false is used to bypass self-signed certificate error in the connection

export default async function Url(req, res) {
  if(req.method === "GET") {

    if(!req.query.uuid && !req.query.short) {
        return res.status(400).json({
            status: "Missing parameters",
            messge: "Missing UUID or short key in request's query parameters"
        })
    }

    if(req.query.uuid && req.query.short) {
      return res.status(400).end();
    }
    
    if(req.query.short && !req.query.uuid) {
      // Return matching long URL for short key
      const short = req.query.short

      try {
        var connection = await sqlCreateConnection();

        const [rows] = await connection.execute(
          'SELECT url FROM Urls WHERE short = ?', 
          [short]
        );

        if(rows.length !== 0) {
          return res.status(200).json({
            key: short,
            url: rows[0].url
          })
        } else {
          return(res.status(200).json({
            key: short,
            url: undefined
          }))
        }

      } catch (err) { // Return error on internal server error
          return res.status(500).end();
      } finally { // Close connection
        if (connection) {
          connection.end();
        }
    }

    } else if(req.query.uuid && !req.query.short) {
      // Return user urls in the database
      const uuid = req.query.uuid // User UUID in Firebase

      try {
          var connection = await sqlCreateConnection();

          const [rows] = await connection.execute(
            'SELECT * FROM Urls WHERE uuid = ?', 
            [uuid]
          ); // Select all user's URLS
          return res.status(200).json(rows);

        } catch (err) { // Return error on internal server error
            console.log(err)
            return res.status(500).end();
        } finally { // Close connection
          if (connection) {
            connection.end();
          }
      }
    }

  } else if(req.method === "POST") {
    // Add short URL in database

    if(!req.body.uuid || !req.body.url) {
      return res.status(400).json({
          status: "Bad request",
          messge: "Missing UUID or URL in request body"
      })
    }

    const uuid = req.body.uuid; // User UUID in Firebase
    const url = req.body.url; // Long URL to generate short URL key for

    // Check if URL is valid
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        status: "Invalid URL",
        message: "Invalid URL. Note that a valid URL must include a scheme (eg. http(s)://...)"
      });
    }

    try {
      var connection = await sqlCreateConnection();

      const short = nanoid(10); // Generate short ID with length of 10 

      // Check if long url is already in db
      const [results] = await connection.execute(
        'SELECT * FROM Urls WHERE url = ? AND uuid = ?',
        [url, uuid]
      );

      if(results.length !== 0) {
        return res.status(409).json({ // Conflict status
          status: "Conflict",
          message: "A short URL has already been generated for this URL",
          key: results[0].short
        });
      }

      await connection.execute(
        'INSERT INTO Urls (uuid, short, url) VALUES (?, ? ,?)',
        [uuid, short, url]  
      ); // Select all user's URLS

      return res.status(200).json({
        message: "URL inserted into database",
        key: short,
        url: url,
        uuid: uuid
      });

    } catch (err) { // Return error: internal server error
        return res.status(500).end();
    } finally { // Close connection
      if (connection) {
        connection.end();
      }
  }
  
  } else if(req.method === "DELETE") {
    // Delete URL from db

    try {
      var connection = await sqlCreateConnection();

      if(!req.body.short || !req.body.uuid) {
        return res.status(400).json({
          status: "Bad request",
          messge: "Missing short key or UUID in request body"
        })
      };

      const short = req.body.short;
      const uuid = req.body.uuid;

      await connection.execute(
        'DELETE FROM Urls WHERE short = ? AND uuid = ?',
        [short, uuid]
      );

      return res.status(200).json({
        message: "URL deleted from database",
        key: short
      });

    } catch (err) { // Return error: internal server error
        console.log(err)
        return res.status(500).end()
    } finally { // Close connection
      if (connection) {
        connection.end();
      }
    }

  } else {
    // If its a different method, return 405 method not allowed
    res.status(405).end();
  }
}