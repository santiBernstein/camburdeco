var userData = require('../repositories/userRepository')

module.exports = function(req,res,next){

    if(req.cookies.recordame && !req.session.user){
        let user = userData.findByEmail(req.cookies.recordame)
        req.session.user = user.name
        
    }  next()
}