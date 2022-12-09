import {Worker} from 'worker_threads';
import {cpus} from 'os';
import {fileURLToPath} from 'url';
import {createCorrectPath} from "../helper.js";

const _filename = fileURLToPath(import.meta.url)
const workerPath = createCorrectPath(_filename, 'worker.js');

const performCalculations = async () => {
    try {
        const cpusArr = cpus();
        const workersPromises = cpusArr.map((cpu, index) => {
            return new Promise((resolve) => {
                const worker = new Worker(workerPath, {
                    workerData: 10 + index
                })
                worker.on('message', (message) => {
                    resolve({
                        status: 'resolved',
                        data: message
                    })
                })
                worker.on('error', () => {
                    resolve(
                        {
                            status: 'error',
                            data: null
                        }
                    )
                })
            })
        })
        const allSettledArr = await Promise.allSettled(workersPromises);
        const workerPromisesResultArr = allSettledArr.map(item => item.value);
        console.log(workerPromisesResultArr);

    } catch (error) {}
};

await performCalculations();