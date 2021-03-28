const express = require("express");
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Application running on http://localhost:${PORT}`)
);
