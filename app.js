const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  return res.json({
    hello: "World",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
