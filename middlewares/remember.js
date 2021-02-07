const db = require('../database/models');

module.exports = function(req,res,next){
    if(req.cookies.recordame && !req.session.user){
        db.User.findOne({
            include: [{association:"tiposUsuarios"}],
            where: {
                email: req.cookies.recordame
            }
        })
        .then((userData) => {
            req.session.user = userData.user_name
        })
        .catch((error) => {
            return error;
        })		
    }  next()
}