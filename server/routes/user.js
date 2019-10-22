const express = require('express');
const User = require('../models/user');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

// This method allows us to get certain amount of users for page

app.get('/user', function (req, res) {
  let pages = req.query.pages || 0;
    pages = Number(pages)
  let limit = req.query.limite || 5;
    limit = Number(limit);

      User.find({})
          .skip(pages)
          .limit(limit)
          .exec((err, usuarios) => {
            if(err){
              return res.status(400).json({
                  ok: false,
                  err
              })
          }
          res.json({
            ok: true,
            usuarios
          })
        })
  })
  
app.post('/user', function (req, res) {
      let body = _.pick(req.body, ['name', 'email', 'password', 'image', 'rol', 'state']);
      let user = new User({
          name: body.name,
          email: body.email,
          password: bcrypt.hashSync(body.password, 10),
          image: body.image,
          rol: body.rol
      });

      user.save((err, UserDB) => {
          if(err){
            return res.status(400).json({
                  ok: false,
                  err
              })
          }

          res.json({
            ok: true,
            user: UserDB
         }) 
      })

  })
  
app.put('/user/:id', function (req, res) {
      let id = req.params.id;
      let body = req.body;
      User.findByIdAndUpdate(id, body, {new: true, runValidators: true }, (err, UserDB) => {
        if(err){
          return res.status(400).json({
                ok: false,
                err
          })
        }
        res.json({
          ok: true,
          user: UserDB
          })
      })
  })
  
app.delete('/user', function (req, res) {
      res.json('Delete Usuario')
  })

module.exports = app;