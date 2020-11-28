var userData = require('../data/user')

module.exports = function(req,res,next){

    if(req.cookies.recordame && !req.session.user){
        let user = userData.findByEmail(req.cookies.recordame)
        req.session.user = user.email
        
    }  next()
}