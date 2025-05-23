// app.js or app.ts
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require("./routes");

const app = express();

// Middleware Setup
app.use(cors()); // Allow Cross-Origin Requests

app.use(morgan('dev')); // Logging HTTP requests

// Parse incoming request bodies
app.use(bodyParser.json()); // Parse JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data

// Routes
app.use('/api', routes);

// Export app
module.exports = app;