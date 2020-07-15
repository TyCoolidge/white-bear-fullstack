const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));
// use above URL to access javascript file
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 3045;
app.listen(port, () =>
   console.log(`Serving running at http://localhost:${port}`)
);
