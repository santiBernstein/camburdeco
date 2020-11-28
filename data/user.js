const file = './users.json'
let users = require(file)
let fs = require('fs')

function create (user){

        user.id = users.length+1
        users.push(user)

        fs.writeFileSync(file, JSON.stringify(users))
}


function findById (id){

    return users.find(function(user){

                return user.id == id

        })  }

function findByEmail (email){

    return users.find(function(user){

            return user.email == email

    })  }

function latest (){

        return users.reverse()[0]    
                   
        }



module.exports = {

    findByEmail,
    findById,
    create,
    latest
}