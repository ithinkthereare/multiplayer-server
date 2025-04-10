let players = {};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, x, y, col, closed } = req.body;
        if (closed) {
            players[id] = "closed";
        } else {
            players[id] = { x, y, col };
        }
        res.status(200).send("OK");
    } else if (req.method === 'GET') {
        res.status(200).json(players);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}

