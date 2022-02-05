const express = require("express");

const Pizza = require("./models/pizzaModel");

const app = express();
const db = require("./db.js");
app.use(express.json());

const pizzaRoute = require("./routes/pizzaRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/pizzas", pizzaRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", ordersRoute);
app.get("/", (req, res) => {
  res.send("Server Working");
});

const port = process.env.PORT || 2200;

app.listen(port, () => `Server running on port ${port}`);
