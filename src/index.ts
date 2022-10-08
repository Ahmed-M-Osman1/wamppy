import express from "express";
import users_routes from "./handlers/users";
import products_routes from "./handlers/products"

const bp = require('body-parser')

const app = express();
const port = 3001;0

// use bodyparser to send req in urlencoded form.
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', async (_req, res) => {
	res.send('Welcome to Wammpy. An Online storeFront using Node.js.');
});

users_routes(app);
products_routes(app);

app.listen(port, () => {
	console.log(`app listen on ${port}`);
});
