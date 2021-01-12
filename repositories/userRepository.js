let fs = require('fs')
let path = require('path')
//const userJsonFilePath = path.join(__dirname, '../data/users.json');
const db = require('../database/models');
let bcryptjs = require('bcryptjs');

function create (req){
        //let content =JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}))
        let salt = bcryptjs.genSaltSync(10);
        db.User.create({
                include: [{association:"profile"}],
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password,salt),
                user_name: req.body.name,
                tipo_usuario_id: "2"
        })
        return (this.lastest().id)
}

function findByName(name){
        //let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        db.User.findOne({
                where: {
                        name: user.name
                }
        })
        .then((usersData) => {
                return users.find(function(user){
                        return name == user.name;
                })                
            })
        .catch((error) => {
                console.log(error);
                return error;
            })          
}

function findById (id){
        //let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        return users.find(function(user){

                return user.id == id

        })  }

function findByEmail (imeil){
        
        

}

function lastest (){
        //let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        return users.reverse()[0]    
                   
        }

function compare(value1,value2){
        return value1 == value2;
}



module.exports = {
    findByName,
    findByEmail,
    findById,
    create,
    lastest,
    compare
}