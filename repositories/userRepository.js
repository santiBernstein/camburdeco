let fs = require('fs')
let path = require('path')
const db = require('../database/models');
let bcryptjs = require('bcryptjs');
const imgFilePath = path.join(__dirname,"../data/imagenes.json")

function findByName(name){
        db.User.findOne({
                include: [{association:"tiposUsuarios"}],
                where: {
                        user_name: name
                }
        })
        .then((dataResult) => {
                if (dataResult == null) {
                        dataResult = 'no match'
                }
                return dataResult              
            })
        .catch((error) => {
                console.log(error);
                return error;
            })          
}

function findById (id){
        db.User.findByPk(id)
                .then((dataResult) => {
                        if (dataResult == null) {
                                dataResult = 'no match'
                        }
                        return dataResult              
                })
                .catch((error) => {
                        console.log(error);
                        return error;
                }) 
}

function findByEmail (imeil){
        db.User.findOne({
                include: [{association:"tiposUsuarios"}],
                where: {
                        email: imail
                }
        })
        .then((dataResult) => {
                if (dataResult == null) {
                        dataResult = 'no match'
                }
                return dataResult              
            })
        .catch((error) => {
                console.log(error);
                return error;
            })    
}

function lastest (dataBase){
        let userData = db.dataBase.findAll();
        return usersData.reverse()[0]                    
}

function compare(value1,value2){
        return value1 == value2;
}

function contar(dataBase){
        db.Profile.count()
        .then((dataResul) => { 
                return dataResult
        })
        .catch((error) => {
                console.log(error);
                return error;
        })
}

function selectImg() {
        let content = JSON.parse(fs.readFileSync(imgFilePath, {encoding: 'utf-8'}))
        let namber = content.length
        while (namber > (content.length - 1)) {
                namber = Math.trunc(Math.random() * 10)
        };
        return (content[namber])
}
function sumaSubTotal (products){
        
        let subTotal = 0

        products.forEach(element => {
                        
                subTotal = subTotal + element.price
        });
        return subTotal
}

module.exports = {
        contar,
        findByName,
        findByEmail,
        findById,
        lastest,
        compare,
        selectImg,
        sumaSubTotal
}