import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log request to console
app.use((req: Request, res: Response, next: any) => {
    console.log("-------------------------------------------------------------------------------------");
    const request = { url: req.url, method: req.method, query: req.query, params: req.params, body: req.body };
    console.log(JSON.stringify(request, null, 2));
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/post', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

