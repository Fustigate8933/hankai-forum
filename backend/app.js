const express = require('express');
const cors = require('cors');

// require("dotenv").config()
// const mongoClient = require("mongodb").MongoClient
// const connectionString = process.env.DB_STRING
//
// mongoClient.connect(connectionString)
//     .then(client => {
//       console.log("Connected to Database in app.js")
//       const db = client.db("forum-posts")
//       const titleCollection = db.collection("post-title")
//     })
//     .catch(error => {
//       console.log(error)
//     })

const bodyParser = require('body-parser');



const app = express();
const port = 3000;

app.use(cors()); // Enable CORS before defining routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
