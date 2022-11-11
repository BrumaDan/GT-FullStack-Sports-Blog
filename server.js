const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {res.send("Home Page")}),
app.get("/*", (req, res) => {    
    res.send("Page not found")
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});