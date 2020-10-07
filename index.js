const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbURL = require("./configs/database");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(routes);
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to '${db.name}' db`));

app.listen(PORT, () => console.log(`On port ${PORT}`));
