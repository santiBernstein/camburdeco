const db = require('../../database/models');


module.exports = {

    users : (req, res) => {
                
     db.User.findAll({
            include: ["profiles","tiposUsuarios"]
        })      

       
        .then((usersData) => {            

            for (let i = 0; i < usersData.length; i++){
                usersData[i].setDataValue("endpoint", "http://localhost:3000/api/users/" + usersData[i].id)
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
                include: ["profiles","tiposUsuarios"]
            })
            .then((data) => {
                res.render('users/users', { data, ids })
            }
        )   
        .then((usersData) =>{
                        
            usersData.setDataValue("endpointImg", "http://localhost:3000/images/" + usersData.img);
            let resultado = usersData;
            res.json(resultado)
        })
        
    } 

}