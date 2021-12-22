const express = require('express');

const { PORT } = require('./config');
const dbCfg = require('./config/db');
const expressCfg = require('./config/express');
const routesCfg = require('./config/routes');
start();


async function start() {
    const app = express();

    await dbCfg();
    expressCfg(app);
    routesCfg(app);

    app.get('*', (req, res) => {
        res.json({
            message: 'Ok!'
        })
    })

    app.listen(PORT, () => {
        console.log(`Listening on port http://localhost:${PORT}...`);
    });
}