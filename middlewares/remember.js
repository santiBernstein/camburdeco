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
            req.session.ides = userData.id                    
            req.session.tipoUsuario = userData.tiposUsuarios.tipo
            next()
        })
        .catch((error) => {
            return error;
        })		
    }  
    else{
        next()
    }
}