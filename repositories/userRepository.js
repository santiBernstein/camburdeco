let fs = require('fs')
let path = require('path')
const userJsonFilePath = path.join(__dirname, '../data/users.json');
let bcryptjs = require('bcryptjs');

function create (req){
        let content =JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}))
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
        let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        return users.find(function(user){
                return name == user.name;
        })        
}

function findById (id){
        let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        return users.find(function(user){

                return user.id == id

        })  }

function findByEmail (email){
        let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        return users.find(function(user){

            return user.email == email

    })  }

function lastest (){
        let users = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
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