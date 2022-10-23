import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create IO Redis connection
const connection = new Redis();
const options = { connection };

const queue = new Queue('test-queue', options);
const worker = new Worker('test-queue', async (job) => {
    console.log("worker job ---------------");
    console.log(job);
}, options);

// Log request to console
app.use((req: Request, res: Response, next: any) => {
    console.log("Request log from Express ------------------");
    const request = { url: req.url, method: req.method, query: req.query, params: req.params, body: req.body };
    console.log(JSON.stringify(request, null, 2));
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/post', async (req: Request, res: Response) => {
    // Send a message to the queue
    await queue.add('test-job', { data: req.body });
    res.sendFile('index.html', { root: __dirname });
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

