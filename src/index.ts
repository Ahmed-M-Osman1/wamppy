import express from "express";
import users_routes from "./handlers/users";
import products_routes from "./handlers/products";
import orders_routes from "./handlers/orders";

const app = express();
const port = 3001;

// use bodyparser to send req in urlencoded form.
app.use(express.json());

app.get("/", async (_req, res) => {
  res.send("Welcome to Wammpy. An Online storeFront using Node.js.");
});

users_routes(app);
products_routes(app);
orders_routes(app);
app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
export default app;