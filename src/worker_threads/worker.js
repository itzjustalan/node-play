import { parentPort, workerData } from 'worker_threads'
import { expensive_fn } from './utils.js'

expensive_fn(workerData.number, workerData.count)
    .then(v => parentPort.postMessage(v))
    .catch(e => parentPort.postMessage(e));

// (async () => {
//     try {
//         const result = await expensive_fn(workerData.number, workerData.count);
//         parentPort.postMessage(result);
//     } catch (error) {
//         parentPort.postMessage(error);
//     }
// })()
