require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const { mockData: initialExperiments } = require('./utils/mock');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const clients = new Set();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/api/experiments/live", asyncHandler(async (req, res) => {
    res.json(experiments);
}));

app.get("/api/experiments/:id/metrics", asyncHandler(async (req, res) => {
    const experiment = experiments.find(exp => exp.experimentId === req.params.id);
    if (!experiment) {
        return res.status(404).json({ error: "Experiment not found" });
    }
    res.json(experiment);
}));

app.post("/api/experiments/:id/logs", asyncHandler(async (req, res) => {
    if (!req.body || !req.body.data) {
        return res.status(400).json({ error: "Invalid log data" });
    }
    console.log(`Received log for experiment ${req.params.id}:`, req.body);
    res.status(200).json({ message: 'Log received' });
}));

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

let experiments = [...initialExperiments];

function broadcastExperiments() {
    const message = JSON.stringify({ type: "update", data: experiments });
    for (const client of clients) {
        if (client.readyState === 1) {
            client.send(message);
        }
    }
}

const UPDATE_INTERVAL = 5000;
setInterval(() => {
    experiments = experiments.map((exp) => {
        return {
            ...exp,
            liveUpdates: [...exp.liveUpdates, {
                timestamp: new Date().toISOString(),
                control: {
                    visitors: Math.floor(Math.random() * 50),
                    conversions: Math.floor(Math.random() * 5),
                    revenue: Math.floor(Math.random() * 20)
                },
                variantB: {
                    visitors: Math.floor(Math.random() * 50),
                    conversions: Math.floor(Math.random() * 5),
                    revenue: Math.floor(Math.random() * 20)
                }
            }]
        };
    });
    broadcastExperiments();
}, UPDATE_INTERVAL);

wss.on('connection', (ws) => {
    console.log('Client connected');
    clients.add(ws);

    ws.send(JSON.stringify({ type: 'init', data: experiments }));

    ws.on("close", () => {
        clients.delete(ws);
        console.log("Client disconnected from WebSocket");
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        clients.delete(ws);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
