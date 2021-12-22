const express = require('express');

const { PORT } = require('./config');
const dbCfg = require('./config/db');
const expressCfg = require('./config/express');
const routesCfg = require('./config/routes');
start();

const listenPort = process.env.PORT || PORT
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

    // if(process.env.NODE_ENV === 'production'){
    //     app.use(express.static('client/build'))
    // }

    app.listen(listenPort, () => {
        console.log(`Listening on port http://localhost:${listenPort}...`);
    });
}