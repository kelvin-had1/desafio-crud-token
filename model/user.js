const {DataTypes} = require('sequelize')
const db = require('./db.js')
const bcrypt = require('bcryptjs')
const { json } = require('body-parser');

module.exports = class User{
    
    constructor(email = '', password = ''){
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)

        
        this.email = email
        this.password = hash
        

        this.User = db.define('usuarios',{
            email:{
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false

            },
            pwsd:{
                type: DataTypes.TEXT,
                allowNull: false
            }
        })
    }


    async getUsers(req, res){
        try {
            let users = await this.User.findAll()
            return res.send(JSON.stringify(users, null, 2))
        } catch (error) {            
            return res.send({erro: "erro inesperado!"})
        }
        
        
    }
 
    async insertUser(req, res){
        try {
            await db.sync()        
            const user = this.User.create({ email: this.email, pwsd: this.password})        
            return res.send({message: "OK"})    
        } catch (error) {             
            console.log(error)
            return res.status(401).send({erro: "Unexpected error"})                                
                                     
        }   
                 
    }

}
