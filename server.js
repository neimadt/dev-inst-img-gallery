import fs from 'fs/promises';
import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenvConfig();

const __dirname = dirname(fileURLToPath(import.meta.url));

const publicPath = path.join(__dirname, 'public');

const app = express();
app.use(express.static(publicPath));

app.get('/', (req, res) => {

    res
        .status(200)
        .json({ msg: 'Welcome!' });
});

app.get('/img-details/:name', async (req, res) => {

    try {

        const { params: { name } } = req

        const filePath = path.join(publicPath, 'images', name);

        const stat = await fs.stat(filePath)

        res
            .status(200)
            .json(stat);
    }
    catch (err) {

        res
            .status(400)
            .json({ error: err.msg });
    }
});


const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
