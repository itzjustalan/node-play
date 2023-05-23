import express from "express";
import { expensive_fn } from "./utils.js";

const ITER_COUNT = 4_000_000_000;

const app = express();

app.get('/', (req, res) => res.send('<h1>Welcome!</h1>'));

app.get('/heavy/:n', async (req, res) => {
    const n = await expensive_fn(req.params.n, ITER_COUNT);
    res.send(`<h1>Heavy Page: ${n ?? 0}</h1>`);
});

app.listen(
    process.env.PORT || 3000,
    () => console.log('app listening on:', process.env.PORT || 3000, '\nworker pid:', process.pid)
);
