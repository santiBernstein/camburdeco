let fs = require('fs')
let path = require('path')
//const userJsonFilePath = path.join(__dirname, '../data/users.json');
const db = require('../database/models');
let bcryptjs = require('bcryptjs');
const User = require('../database/models/User');

function create (req){
        //let content =JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}))
        let salt = bcryptjs.genSaltSync(10);
        content.push ({
                id: (this.lastest().id)+1,
                name: req.body.name,
                apellido: "",
                dni: "",
                email : req.body.email,
                domicilio: "",
                localidad: "",
                pais: "",
                password : bcryptjs.hashSync(req.body.password,salt),
                metodo_pago:"",
                nroTarjeta: "",
                avatar: req.files[0].filename,
                tipoUsuario: "Normal"
        }) 
        fs.writeFileSync(userJsonFilePath,JSON.stringify(content))
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
        //let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        db.User.findOne({
                where: {
                        email: imeil
                }
        })
        .then((userData) => {
                console.log('validation pass ok')
                //console.log('1.', email);
                console.log('2.', userData);
                console.log('3.', imeil);
                console.log('4.', userData.email);
                return (userData.email, userData.password)            
            })
        .catch((error) => {
                console.log('validation pass not ok')
                console.log(error);
                return error;
            })

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