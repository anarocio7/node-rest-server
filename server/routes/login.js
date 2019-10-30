const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

// Google Configuration that returns a google object

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
  }


// Post method for Google Sign in 

app.post('/google', async (req, res) => {
    let token = req.body.idtoken
    let googleUser =  await verify(token)
                            .catch(e => {
                                res.status(403).json({
                                    ok: false,
                                    e: err
                                })
                            })
    User.findOne({ email: googleUser.email }, (err, UserDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if(UserDB){
            if(user.google === false){
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'You must use normal authentication'
                    }
                })
            } else {
                
                    let token = jwt.sign({ user: UserDB }, process.env.SEED, 
                                { expiresIn: process.env.tokenExp })
                    return res.json ({
                        ok: true,
                        user: UserDB,
                        token
                    })
            } 

        } else {
            // If user does not exist in database
            let user = new User();
            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.img;
            user.google = true;
            user.password = ':)';

            user.save((err, UserDB) =>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                let token = jwt.sign({ user: UserDB }, process.env.SEED, 
                    { expiresIn: process.env.tokenExp })
                        return res.json ({
                        ok: true,
                        user: UserDB,
                        token
        })

            })
        }

    })
});

module.exports = app;