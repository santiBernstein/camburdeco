const db = require('../../database/models');


module.exports = {

    users : (req, res) => {
                
     db.User.findAll()     

       
        .then((usersData) => {            

            for (let i = 0; i < usersData.length; i++){
                usersData[i].setDataValue("endpoint", "http://localhost:3000/api/users/" + usersData[i].id)
                delete usersData[i].dataValues.password;
                delete usersData[i].dataValues.tipo_usuario_id;
            }
            

            let resultado = {
                meta: {
                    status: 200,
                    total: usersData.length,
                    url: "/api/users/"
                },
                data: usersData
            };

            res.json(resultado);
             
         })
         .catch((error) => {
             console.log(error);
             return error;
         })   
       
    }, 
    one : (req, res) => {
        ids = req.params.id
        db.User.findByPk(ids,
            {
                include: ["profiles"]
            })           
          
        .then((usersData) =>{
            console.log(usersData)
            
            delete usersData.dataValues.password;
            delete usersData.dataValues.tipo_usuario_id;
                        
            usersData.setDataValue("endpointImg", "http://localhost:3000/images/users/" + usersData.profiles.avatar);
            let resultado = {
                meta: {
                    status: 200,
                    total: usersData.length,
                    url: "/api/users/"
                },
                data: usersData
            };

                        
            res.json(resultado)
        })
        
    } 

}