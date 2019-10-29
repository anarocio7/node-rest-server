const jwt = require('jsonwebtoken');

// Token verification

let verifyToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            })
        }
     req.user = decoded.user;
    next();
    })

}

// Verify Admin role

let verifyAdminRole = (req, res, next) => {
    let user = req.user;
    if(user.role === 'ADMIN_ROLE'){
        next();
    } else {
        res.json({
            ok: false,
            err: 'Forbidden action for this type of user'
        })
    }
}

module.exports = {
    verifyToken,
    verifyAdminRole
}