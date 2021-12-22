const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
module.exports = (app) => {
    
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use((req, res, next) => {
        if(!req.url.includes('favicon')){
            console.log('>>>', req.method, req.url);
        
            if(req.user){
                console.log('Known user', req.user.email);
            }
        }

        next();
    });

}