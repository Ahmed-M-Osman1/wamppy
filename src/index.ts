import express from "express";
import client from "./database";

const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  const connection = await client.connect(); // Create a new connection to the database
  const query = "SELECT * FROM users"; // Create a query to select all students
  const results = await connection.query(query); // Execute the query
  connection.release(); // Release the connection
  res.send(results.rows); // Send the results
});

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
