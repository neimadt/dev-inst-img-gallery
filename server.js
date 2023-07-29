import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const publicPath = path.join(__dirname, 'public');

const app = express();
app.use(express.static(publicPath));

app.get('/', (req, res) => {

    res
        .status(200)
        .json({ msg: 'Welcome!' });
});


const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
