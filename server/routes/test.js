const User = require('../models/user');

// app.put('/user/:id', verifyToken, 
module.exports = { updateUser: function (req, res) {
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
}
}