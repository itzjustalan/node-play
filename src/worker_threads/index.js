import express from "express";
import { Worker } from 'worker_threads'
import { expensive_fn } from "./utils.js";

const WORKER_FILE = './src/worker_threads/worker.js';
const ITER_COUNT = 4_000_000_000;
const THREAD_COUNT = 4;

const createWorker = (data) => new Promise((resolve, reject) => {
    const worker = new Worker(WORKER_FILE, { workerData: data });
    worker.once('message', resolve);
    worker.once('error', reject);
})

export const app_with_worker_threads = async () => {
    const app = express();

    app.get('/', (req, res) => res.send('<h1>Welcome!</h1>'));

    app.get('/non-blocking', (req, res) => res.send('<h1>Non Blocking Page</h1>'));

    app.get('/blocking-main-thread/:n', async (req, res) => {
        const n = await expensive_fn(req.params.n, ITER_COUNT);
        res.send(`<h1>Blocking Page: ${n ?? 0}</h1>`);
    });

    app.get('/blocking-sub-thread/:n', async (req, res) => {
        const worker = new Worker(WORKER_FILE, { workerData: { number: req.params.n, count: ITER_COUNT } });
        worker.once('message', (data) => res.send(`<h1>Blocking Page: ${data ?? 0}</h1>`));
        worker.once('error', (error) => res.send(`<h1>Blocking Page: ${error ?? 'error'}</h1>`));
    });

    app.get('/blocking-multiple-sub-threads/:n', async (req, res) => {
        const promises = [];
        for (let i = 0; i < THREAD_COUNT; i++)
            promises.push(createWorker({ number: 0, count: ITER_COUNT / THREAD_COUNT }));
        const result = await Promise.allSettled(promises);
        const total = result.reduce((p, c) => p + c.value, +req.params.n);
        res.send(`<h1>Blocking Page: ${total ?? 0}</h1>`);
    });

    app.listen(process.env.PORT || 3000, () => console.log('app listening on:', process.env.PORT || 3000));
}
