const mongoose = require('mongoose');
const { DBSTR } = require('./index');

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DBSTR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.on('error', (error) => {
            console.error(console, 'db conn error: ', error);
            reject(error);
        });
        db.once('open', function () {
            console.log('DB Connected');
            resolve();
        });
    })
};