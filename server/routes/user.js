const express = require('express');
const User = require('../models/user');
const app = express();

app.get('/user', function (req, res) {
    res.json('Get Usuario')
  })
  
app.post('/user', function (req, res) {
      let body = req.body;
      let user = new User({
          name: body.nombre,
          email: body.email,
          password: body.password,
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
      res.json({
          id
      })
  })
  
app.delete('/user', function (req, res) {
      res.json('Delete Usuario')
  })

module.exports = app;