const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();

module.exports = app;

app.post('/login', (req, res) => {
    let body = req.body;
    User.findOne({ email: body.email }, (err, UserDB) => {
        if(err){
            return res.status(500).json({
                  ok: false,
                  err
            })
          }
        if(!UserDB){
            return res.status(400).json({
                  ok: false,
                  err: {
                      message: "(User) or password are not correct"
                  }
            })
          }
        if(!bcrypt.compareSync(body.password, UserDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User or (password) are not correct"
                }
          })
        }

        let token = jwt.sign({
            user: UserDB
        }, process.env.SEED, { expiresIn: process.env.tokenExp })

        res.json({
            ok: true,
            user: UserDB,
            token
        })
    })
});