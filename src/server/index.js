const express = require('express');
const os = require('os');
const bodyParser = require("body-parser");

// require routes
const routes = require("./routes/index");

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(routes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));



