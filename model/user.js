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

    async login(req, res){
        try {
            await db.sync()
            const user = await this.User.findAll({where: {email: req.body.email}})
            
            return true


        } catch (error) {
            console.log(error)
            return false
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

    async getUsers(req, res){
        try {
            await db.sync()
            let users = await this.User.findAll()
            return res.send(JSON.stringify(users, null, 2))
        } catch (error) {            
            return res.send({erro: "erro inesperado!"})
        }
        
        
    }
 
    

}
