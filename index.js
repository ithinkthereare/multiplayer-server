const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const clients = new Set();

app.get('/events', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.flushHeaders(); // отправить заголовки сразу

    res.write('data: Connected\n\n');
    clients.add(res);

    req.on('close', () => {
        clients.delete(res);
    });
});

app.post('/send', (req, res) => {
    const message = req.body.message || 'no message';
    for (const client of clients) {
        client.write(`data: ${message}\n\n`);
    }
    res.json({ status: 'sent', message });
});

app.listen(PORT, () => {
    console.log(`SSE server running on port ${PORT}`);
});
