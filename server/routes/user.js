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

// Second parameter on find method will allow us to return only the fields typed there

      User.find({state: true}, "name email rol state google image")
          .skip(pages)
          .limit(limit)
          .exec((err, usuarios) => {
            if(err){
              return res.status(400).json({
                  ok: false,
                  err
              })
          }
      User.countDocuments({state: true}, (err, counting) => {
        res.json({
          ok: true,
          usuarios,
          counting
          })
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

// Delete User based on Id. User is based on schema
  
app.delete('/user/:id', function (req, res) {
      let id = req.params.id;
      let statusChanged = {
        state: false
      }

      // Updates user status to false when deleted

      User.findByIdAndUpdate(id, statusChanged, { new: true }, (err, deletedUser) => {
        if(err){
          return res.status(400).json({
                ok: false,
                err
          })
        }
        if(!deletedUser){
          return res.status(400).json({
            ok: false,
            err: {
              message: 'User not found'
            }
          })
        }
        res.json({
          ok: true,
          user: deletedUser
        });
      });
  })

module.exports = app;