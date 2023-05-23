import os from 'os';
import cluster from 'cluster';
import express from "express";
import { expensive_fn } from "./utils.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const ITER_COUNT = 8_000_000_000;

export const app_with_clusters = async () => {
    const _dirname = dirname(fileURLToPath(import.meta.url));
    const numCPUs = os.cpus().length;

    console.log('primary pid:', process.pid);
    console.log('max possible parallels:', numCPUs);

    // cluster.setupPrimary({ exec: './src/clusters/server.js' });
    cluster.setupPrimary({ exec: _dirname + '/server.js' });

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
}

export const app_with_clusters_2 = async () => {

    if (cluster.isPrimary) {
        const numCPUs = os.availableParallelism();
        console.log('primary pid:', process.pid);
        console.log('max possible parallels:', numCPUs);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        });

    } else {
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
    }
}