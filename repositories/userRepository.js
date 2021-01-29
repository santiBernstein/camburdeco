let fs = require('fs')
let path = require('path')
const db = require('../database/models');
let bcryptjs = require('bcryptjs');

function create (req){
        
        return 
}

function findByName(name){
        db.User.findOne({
                include: [{association:"tiposUsuarios"}],
                where: {
                        name: user.name
                }
        })
        .then((usersData) => {
                if (usersData == null) {
                        return 
                }                
            })
        .catch((error) => {
                console.log(error);
                return error;
            })          
}

async function findById (id){
        await db.Profile.findByPk(id)
                .then((result) => {
                        return result
                }
        )
}

function findByEmail (imeil){
        
}

function lastest (dataBase){
        let userData = db.dataBase.findAll();
        return usersData.reverse()[0]    
                   
}

function compare(value1,value2){
        return value1 == value2;
}

function contar(dataBase){
        db.Profile.count().then(resultado => { 
                console.log('count', resultado) 
                return resultado
        })
}

module.exports = {
        contar,
        findByName,
        findByEmail,
        findById,
        create,
        lastest,
        compare
}