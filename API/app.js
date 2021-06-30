"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");

const { sequelize } = require("./models");
const playerRouter = require("./routes/players");
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(playerRouter);

// setup morgan which gives us http request logging
app.use(morgan("dev"));

sequelize
  .authenticate()
  .then(() => {
    console.info("Datebase connected");
  })
  .catch((err) => {
    console.error("Error - Unable to connect to the database:", err);
  });

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: 'Time to "Make it Rain"',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found Sport",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})


// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
